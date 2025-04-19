import 'server-only'

import { MESSAGE } from '@/constants'

/**
 * Not Found エラー
 */
export class NotFoundError extends Error {
  // ステータスコード
  public readonly status = 404
  // エラー名
  public readonly name = 'NotFoundError'

  constructor(message = MESSAGE.error.notFound) {
    super(message)
  }
}
