import 'server-only'

import { ProductEntity } from '@/server/domain/entities/productEntity'
import { ProductInfoEntity } from '@/server/domain/entities/productInfoEntity'
import type { ProductCategory, ProductCondition } from '@/types'
import type { OrderBy } from '@/types/database'

/**
 * 商品レポジトリインターフェース
 */
export interface IProductRepository {
  /**
   * 商品を保存
   *
   * @param product 商品DTO
   */
  save(product: ProductEntity): Promise<void>

  /**
   * 商品をIDから取得
   *
   * @param id 商品ID
   */
  findById(id: number): Promise<ProductEntity | null>

  /**
   *  商品情報をIDから取得
   *
   * @param id 商品ID
   */
  findInfoById(id: number): Promise<ProductInfoEntity | null>

  /**
   * カテゴリーから商品を取得
   *
   * @param category  カテゴリー
   * @param condition 商品の状態
   * @param page  ページ
   * @param limit 件数
   * @param sort  ソート
   * @param order 順序
   */
  findByCategory(
    category: ProductCategory | null,
    condition: ProductCondition[] | [],
    page: number | null,
    limit: number | null,
    sort: string[] | null,
    order: OrderBy[] | null,
  ): Promise<ProductEntity[] | []>
}
