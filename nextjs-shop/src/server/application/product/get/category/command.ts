import 'server-only'

import { BaseCommand } from '@/server/application/common/command/baseCommand'
import type { ProductCategory, ProductCondition } from '@/types'
import type { OrderBy } from '@/types/database'

export class Command extends BaseCommand {
  constructor(
    /** 商品カテゴリー */
    public readonly category: ProductCategory | null,
    /** 商品の状態 */
    public readonly condition: ProductCondition[],
    /** ページ */
    page: string | null,
    /** 件数 */
    limit: string | null,
    /** ソート */
    sort: string[] | null,
    /** 順序 */
    order: OrderBy[],
  ) {
    const _page = page != null ? Number(page) : null
    const _limit = limit != null ? Number(limit) : null

    super(_page, _limit, sort, order)
  }
}
