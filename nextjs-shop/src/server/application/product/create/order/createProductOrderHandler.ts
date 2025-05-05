import 'server-only'

import { inject, injectable } from 'inversify'
import { ICreateProductOrderHandler } from './ICreateProductOrderHandler'
import { Command } from './command'
import { MESSAGE } from '@/constants'
import { ValidateInteger } from '@/server/application/common/validations/validationUtils'
import { IProductService } from '@/server/domain/interfaces/services/IProductService'
import { ProductService } from '@/server/domain/services/productService'
import { log } from '@/server/shared/decorators/log'
import { ValidationError } from '@/server/shared/errors/validationError'
import type { ResponseResult } from '@/types'
import TYPES from '@/types/symbol'

@injectable()
export class CreateProductOrderHandler implements ICreateProductOrderHandler {
  readonly #productService: ProductService

  constructor(@inject(TYPES.IProductService) productService: IProductService) {
    this.#productService = productService
  }

  @log
  public async handler(command: Command): Promise<ResponseResult> {
    // ステータスコード
    let status = 200
    // 処理結果
    let success = true
    // メッセージ
    let message: string | undefined

    try {
      // バリデーション実行
      await this.validate(command)

      // 商品注文を確定
      await this.#productService.orderProduct(command.productId)
      // 完了メッセージ
      message = MESSAGE.complete.order
    } catch (error: unknown) {
      // エラーステータスコード
      status = 500
      // 処理失敗
      success = false

      // バリデーションエラー
      if (error instanceof ValidationError) {
        // エラースターすコード
        status = error.status
      }
    }

    return {
      status,
      success,
      message,
    }
  }

  /**
   * バリデーション
   *
   * @param command インプットデータ
   */
  @log
  private async validate(command: Command): Promise<void> {
    // 整数チェック
    ValidateInteger(command.productId)
  }
}
