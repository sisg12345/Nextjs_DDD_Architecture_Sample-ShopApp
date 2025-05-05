import 'server-only'

import { inject, injectable } from 'inversify'
import { ICreateUserHandler } from './ICreateUserHandler'
import { Command } from './command'
import { MESSAGE } from '@/constants'
import { signupFormSchema } from '@/lib/services/auth/validations'
import yup from '@/lib/yup'
import { UserEntity } from '@/server/domain/entities/userEntity'
import { IUserRepository } from '@/server/domain/interfaces/repositories/IUserRepository'
import { IUserService } from '@/server/domain/interfaces/services/IUserService'
import { log } from '@/server/shared/decorators/log'
import { ExistError } from '@/server/shared/errors/existError'
import type { ResponseResult } from '@/types'
import TYPES from '@/types/symbol'
import type { ErrorMessages } from '@/utils/yupUtil'
import { generateErrors } from '@/utils/yupUtil'

@injectable()
export class CreateUserHandler implements ICreateUserHandler {
  readonly #userService: IUserService
  readonly #userRepository: IUserRepository

  constructor(
    @inject(TYPES.IUserService) userService: IUserService,
    @inject(TYPES.IUserRepository) userRepository: IUserRepository,
  ) {
    this.#userService = userService
    this.#userRepository = userRepository
  }

  @log
  public async handle(command: Command): Promise<ResponseResult> {
    // ステータスコード
    let status = 200
    // 処理結果
    let success = true
    // メッセージ
    let message
    // エラーメッセージオブジェクト
    let errors: ErrorMessages = {}

    try {
      // バリデーション実行
      await this.validate(command)

      // ユーザー情報取得
      const user = await this.#userRepository.findByEmail(command.email)
      if (user) {
        throw new ExistError(MESSAGE.error.emailIsExist)
      }

      // パスワードハッシュ化
      const password = await this.#userService.encryptPassword(command.password)
      // ユーザー保存DTO
      const saveUserEntity = UserEntity.create(
        null,
        password,
        command.email,
        '',
        '',
        '',
        '/placeholder-125.png',
      )
      // 保存
      await this.#userRepository.save(saveUserEntity)
    } catch (error: unknown) {
      // エラーステータスコード
      status = 500
      // 処理失敗
      success = false
      // メッセージ
      message = MESSAGE.failure

      if (error instanceof ExistError) {
        // エラーステータスコード
        status = 400
        // メッセージ
        message = error.message
      }

      // フォームバリデーション例外
      if (error instanceof yup.ValidationError) {
        // エラーステータスコード
        status = 400
        // エラーオブジェクト生成
        errors = generateErrors(error)
      }
    }

    return {
      status,
      success,
      message,
      errors,
    }
  }

  /**
   * バリデーション
   *
   * @param command インプットデータ
   */
  @log
  private async validate(command: Command): Promise<void> {
    // ファームのバリデーション
    await signupFormSchema.validate(command, { abortEarly: false })
  }
}
