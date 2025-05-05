import 'server-only'

import { Command } from './command'
import type { ResponseResult } from '@/types'

export interface IGetProductHandler {
  handle(command: Command): Promise<ResponseResult>
}
