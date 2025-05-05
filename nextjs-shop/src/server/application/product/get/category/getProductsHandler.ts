import 'server-only'

import { inject, injectable } from 'inversify'
import { IGetProductsHandler } from './IGetProductsHandler'
import { Command } from './command'
import TYPES from '@/lib/inversify/symbol'
import { ValidateInteger } from '@/server/application/common/validations/validationUtils'
import { ProductEntity } from '@/server/domain/entities/productEntity'
import { IProductRepository } from '@/server/domain/interfaces/repositories/IProductRepository'
import { log } from '@/server/shared/decorators/log'
import { ValidationError } from '@/server/shared/errors/validationError'
import type { ResponseResult } from '@/types'

@injectable()
export class GetProductsHandler implements IGetProductsHandler {
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
    let data: ReturnType<ProductEntity['toPrimitives']>[] = []

    try {
      // バリデーション実行
      await this.validate(command)

      // カテゴリー商品を取得
      const result = await this.#productRepository.findByCategory(
        command.category,
        command.condition,
        command.page,
        command.limit,
        command.sort,
        command.order,
      )
      data = result.map((entity) => entity.toPrimitives())
    } catch {
      // エラーステータスコード
      status = 500
      // 処理失敗
      success = false
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
    const { sort, order, page, limit } = command

    // ページが存在する場合
    if (page != null) {
      // 整数チェック
      ValidateInteger(page)
    }
    // 件数が存在する場合
    if (limit != null) {
      // 整数チェック
      ValidateInteger(limit)
    }
    // データの個数が異なる場合
    if (sort?.length !== order?.length) {
      throw new ValidationError()
    }
  }
}
