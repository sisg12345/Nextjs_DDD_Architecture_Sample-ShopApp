import 'server-only'

import { Command } from './command'
import { ValidateInteger } from '@/server/application/common/validations/validationUtils'
import { ProductEntity } from '@/server/domain/entities/productEntity'
import { ProductRepository } from '@/server/infrastructure/repositories/product/productRepository'
import { log } from '@/server/shared/decorators/log'
import { ValidationError } from '@/server/shared/errors/validationError'
import type { ResponseResult } from '@/types'

export class GetProductsHandler {
  constructor(
    private readonly command: Command,
    private readonly productRepository: ProductRepository,
  ) {}

  @log
  public async handle(): Promise<ResponseResult> {
    // ステータスコード
    let status = 200
    // 処理結果
    let success = true
    // 取得データ
    let data: ReturnType<ProductEntity['toPrimitives']>[] = []

    try {
      // バリデーション実行
      await this.validate(this.command)

      // カテゴリー商品を取得
      const result = await this.productRepository.findByCategory(
        this.command.category,
        this.command.condition,
        this.command.page,
        this.command.limit,
        this.command.sort,
        this.command.order,
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
