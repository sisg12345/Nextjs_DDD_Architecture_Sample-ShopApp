import 'server-only'

import { Command } from './command'
import { MESSAGE } from '@/constants'
import { signupFormSchema } from '@/lib/services/auth/validations'
import yup from '@/lib/yup'
import { UserEntity } from '@/server/domain/entities/userEntity'
import { UserService } from '@/server/domain/services/userService'
import { UserRepository } from '@/server/infrastructure/repositories/user/userRepository'
import { log } from '@/server/shared/decorators/log'
import { ExistError } from '@/server/shared/errors/existError'
import type { ResponseResult } from '@/types'
import type { ErrorMessages } from '@/utils/yupUtil'
import { generateErrors } from '@/utils/yupUtil'

export class CreateUserHandler {
  constructor(
    private readonly command: Command,
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
  ) {}

  @log
  public async handle(): Promise<ResponseResult> {
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
      await this.validate(this.command)

      // ユーザー情報取得
      const user = await this.userRepository.findByEmail(this.command.email)
      if (user) {
        throw new ExistError(MESSAGE.error.emailIsExist)
      }

      // パスワードハッシュ化
      const password = await this.userService.encryptPassword(this.command.password)
      // ユーザー保存DTO
      const saveUserEntity = UserEntity.create(
        this.command.userId,
        password,
        this.command.email,
        '',
        '',
        '',
        '/placeholder-125.png',
      )
      // 保存
      await this.userRepository.save(saveUserEntity)
    } catch (error: unknown) {
      // エラーステータスコード
      status = 500
      // 処理失敗
      success = false
      // メッセージ
      message = MESSAGE.failure

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
