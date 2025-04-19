import 'server-only'

import { MESSAGE } from '@/constants'

/**
 * 既に存在するエラー
 */
export class ExistError extends Error {
  // ステータスコード
  public readonly status = 400
  // エラー名
  public readonly name = 'ExistError'

  constructor(message = MESSAGE.error.exist) {
    super(message)
  }
}
