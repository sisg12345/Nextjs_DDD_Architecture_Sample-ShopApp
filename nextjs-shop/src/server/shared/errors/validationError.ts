import 'server-only'

import { MESSAGE } from '@/constants'

/**
 * 既に存在するエラー
 */
export class ValidationError extends Error {
  // ステータスコード
  public readonly status = 500
  // エラー名
  public readonly name = 'ValidationError'

  constructor(message = MESSAGE.error.validation) {
    super(message)
  }
}
