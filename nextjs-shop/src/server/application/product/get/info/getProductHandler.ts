import 'server-only'

import { Command } from './command'
import { ValidateInteger } from '@/server/application/common/validations/validationUtils'
import { ProductInfoEntity } from '@/server/domain/entities/productInfoEntity'
import { ProductRepository } from '@/server/infrastructure/repositories/product/productRepository'
import { log } from '@/server/shared/decorators/log'
import { NotFoundError } from '@/server/shared/errors/notFoundError'
import { ValidationError } from '@/server/shared/errors/validationError'
import type { ResponseResult } from '@/types'

export class GetProductHandler {
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
    let data: ReturnType<ProductInfoEntity['toPrimitives']> | null = null

    try {
      // バリデーション実行
      await this.validate(this.command)

      // 商品を取得
      const result = await this.productRepository.findInfoById(this.command.id)
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
