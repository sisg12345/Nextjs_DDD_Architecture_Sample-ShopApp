import 'server-only'

import { MESSAGE } from '@/constants'

/**
 * DB全般のエラー
 */
export class DatabaseError extends Error {
  // ステータスコード
  public readonly status = 500
  // エラー名
  public readonly name = 'DatabaseError'

  constructor(message = MESSAGE.error.database) {
    super(message)
  }
}
