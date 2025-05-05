import 'server-only'

import { inject, injectable } from 'inversify'
import { IUpdateUserHandler } from './IUpdateUserHandler'
import { Command } from './command'
import { MESSAGE } from '@/constants'
import TYPES from '@/lib/inversify/symbol'
import { userProfileFormSchema } from '@/lib/services/users/validations'
import yup from '@/lib/yup'
import { UpdateUserDto } from '@/server/domain/dtos/updateUserDto'
import { IUserRepository } from '@/server/domain/interfaces/repositories/IUserRepository'
import { IUserService } from '@/server/domain/interfaces/services/IUserService'
import { log } from '@/server/shared/decorators/log'
import { FileUploadError } from '@/server/shared/errors/fIleUpLoadError'
import type { ResponseResult } from '@/types'
import { generateErrors, type ErrorMessages } from '@/utils/yupUtil'

@injectable()
export class UpdateUserHandler implements IUpdateUserHandler {
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

      // ユーザープロフィール画像アップロード
      const profileImageUrl = await this.#userService.fileUpload(command.images[0]?.file)
      // ユーザー更新DTO
      const updateUserDto = new UpdateUserDto(
        command.userId,
        command.email,
        command.username ?? '',
        command.displayName ?? '',
        command.description ?? '',
        profileImageUrl,
      )
      // ユーザー情報更新
      this.#userRepository.update(updateUserDto)
      // パスワードが変更された場合
      if (command.newPassword) {
        // パスワードハッシュ化
        const newPassword = await this.#userService.encryptPassword(command.newPassword)
        // パスワード更新
        this.#userRepository.updatePassword(command.userId, newPassword)
      }
      // ユーザー登録DTO
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
      // ファイルアップロード例外
      if (error instanceof FileUploadError) {
        // エラーステータスコード
        status = error.status
        // メッセージ
        message = error.message
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
    await userProfileFormSchema.validate(command, { abortEarly: false })
  }
}
