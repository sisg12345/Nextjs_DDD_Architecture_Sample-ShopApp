import 'server-only'

import { ValidationError } from '@/server/shared/errors/validationError'

/**
 * 整数かどうかをチェック
 *
 * @param value 数値
 */
export function ValidateInteger(value: number) {
  if (!Number.isInteger(value)) {
    throw new ValidationError()
  }
}
