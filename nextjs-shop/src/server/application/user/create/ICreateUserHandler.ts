import 'server-only'

import { Command } from './command'
import { ResponseResult } from '@/types'

export interface ICreateUserHandler {
  handle(command: Command): Promise<ResponseResult>
}
