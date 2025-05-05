import 'server-only'

import { inject, injectable } from 'inversify'
import { Command } from './command'
import TYPES from '@/lib/inversify/symbol'
import { ValidateInteger } from '@/server/application/common/validations/validationUtils'
import { IGetProductHandler } from '@/server/application/product/get/info/IGetProductHandler'
import { ProductInfoEntity } from '@/server/domain/entities/productInfoEntity'
import { IProductRepository } from '@/server/domain/interfaces/repositories/IProductRepository'
import { log } from '@/server/shared/decorators/log'
import { NotFoundError } from '@/server/shared/errors/notFoundError'
import { ValidationError } from '@/server/shared/errors/validationError'
import type { ResponseResult } from '@/types'

@injectable()
export class GetProductHandler implements IGetProductHandler {
  readonly #productRepository: IProductRepository

  constructor(@inject(TYPES.IProductRepository) productRepository: IProductRepository) {
    this.#productRepository = productRepository
  }

  @log
  public async handle(command: Command): Promise<ResponseResult> {
    // ステータスコード
    let status = 200
    // 処理結果
    let success = true
    // 取得データ
    let data: ReturnType<ProductInfoEntity['toPrimitives']> | null = null

    try {
      // バリデーション実行
      await this.validate(command)

      // 商品を取得
      const result = await this.#productRepository.findInfoById(command.id)
      // データが存在しない場合
      if (!result) {
        // Not Found エラー
        throw new NotFoundError()
      }
      data = result.toPrimitives()
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
      // Not Found エラー
      if (error instanceof NotFoundError) {
        // エラースターすコード
        status = error.status
      }
    }

    return {
      status,
      success,
      data,
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
    ValidateInteger(command.id)
  }
}
