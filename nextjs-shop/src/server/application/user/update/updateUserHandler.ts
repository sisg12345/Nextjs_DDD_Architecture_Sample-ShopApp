import 'server-only'

import { Command } from './command'
import { MESSAGE } from '@/constants'
import { userProfileFormSchema } from '@/lib/services/users/validations'
import yup from '@/lib/yup'
import { UpdateUserDto } from '@/server/domain/dtos/updateUserDto'
import { UserService } from '@/server/domain/services/userService'
import { UserRepository } from '@/server/infrastructure/repositories/user/userRepository'
import { log } from '@/server/shared/decorators/log'
import { FileUploadError } from '@/server/shared/errors/fIleUpLoadError'
import type { ResponseResult } from '@/types'
import { generateErrors, type ErrorMessages } from '@/utils/yupUtil'

export class UpdateUserHandler {
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

      // ユーザープロフィール画像アップロード
      const profileImageUrl = await this.userService.fileUpload(this.command.images[0]?.file)
      // ユーザー更新DTO
      const updateUserDto = new UpdateUserDto(
        this.command.userId,
        this.command.email,
        this.command.username ?? '',
        this.command.displayName ?? '',
        this.command.description ?? '',
        profileImageUrl,
      )
      // ユーザー情報更新
      this.userRepository.update(updateUserDto)
      // パスワードが変更された場合
      if (this.command.newPassword) {
        // パスワードハッシュ化
        const newPassword = await this.userService.encryptPassword(this.command.newPassword)
        // パスワード更新
        this.userRepository.updatePassword(this.command.userId, newPassword)
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
