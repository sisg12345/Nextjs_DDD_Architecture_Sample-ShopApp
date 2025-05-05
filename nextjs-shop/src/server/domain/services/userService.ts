import 'server-only'

import bcrypt from 'bcryptjs'
import { injectable } from 'inversify'
import { IUserService } from '../interfaces/services/IUserService'
import { log } from '@/server/shared/decorators/log'
import { FileUploadError } from '@/server/shared/errors/fIleUpLoadError'

/**
 * ユーザーサービスクラス
 */
@injectable()
export class UserService implements IUserService {
  /**
   * パスワードを暗号化
   *
   * @param password パスワード
   * @returns 暗号化されたパスワード
   */
  @log
  public async encryptPassword(password: string): Promise<string> {
    // ラウンド数
    const saltRounds = 10
    // パスワードハッシュ化
    const encryptedPassword = bcrypt.hash(password, saltRounds)

    return encryptedPassword
  }

  /**
   * ファイルをアップロード
   * WARNING: 本来クラウドストレージに保存すべき処理なので、ダミー処理を実装している
   *
   * @param file ファイルオブジェクト
   * @returns 画像URL
   */
  @log
  public async fileUpload(file?: File): Promise<string> {
    // デフォルトのユーザープロフィール画像URL
    let imageUrl = '/placeholder-125.png'
    try {
      // ダミー処理: ファイルが存在する場合、ファイルを保存
      if (file && file.size > 0) {
        // ファイル名を生成...
        // ファイル転送処理...
        // ファイルURLを生成...
        imageUrl = '/placeholder-125.png'
      }

      return imageUrl
    } catch (error) {
      if (error instanceof Error) {
        // ファイルアップロード例外をスロー
        throw new FileUploadError()
      }
    }

    return imageUrl
  }
}
