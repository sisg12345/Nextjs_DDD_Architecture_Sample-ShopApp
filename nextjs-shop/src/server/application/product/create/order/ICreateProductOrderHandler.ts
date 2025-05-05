import 'server-only'

import { Command } from './command'
import type { ResponseResult } from '@/types'

export interface ICreateProductOrderHandler {
  handler(command: Command): Promise<ResponseResult>
}
