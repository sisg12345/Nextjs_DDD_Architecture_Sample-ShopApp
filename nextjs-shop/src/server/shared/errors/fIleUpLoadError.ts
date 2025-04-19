import 'server-only'

import { MESSAGE } from '@/constants'

/**
 * ファイルアップロードエラー
 */
export class FileUploadError extends Error {
  // ステータスコード
  public readonly status = 400
  // エラー名
  public readonly name = 'FileUploadError'

  constructor(message = MESSAGE.error.fileUpLoad) {
    super(message)
  }
}
