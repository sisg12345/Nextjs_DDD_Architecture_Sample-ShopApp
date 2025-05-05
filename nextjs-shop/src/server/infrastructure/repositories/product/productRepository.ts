import 'server-only'

import { injectable } from 'inversify'
import prisma from '@/lib/prisma'
import { ProductEntity } from '@/server/domain/entities/productEntity'
import { ProductInfoEntity } from '@/server/domain/entities/productInfoEntity'
import { IProductRepository } from '@/server/domain/interfaces/repositories/IProductRepository'
import { log } from '@/server/shared/decorators/log'
import type { ProductCategory, ProductCondition } from '@/types'
import type { OrderBy } from '@/types/database'

/**
 * 商品レポジトリクラス
 */
@injectable()
export class ProductRepository implements IProductRepository {
  /**
   *  商品を保存
   *
   * @param product 商品DTO
   */
  @log
  public async save(product: ProductEntity): Promise<void> {
    await prisma.product.create({
      data: {
        category: product.category,
        title: product.title,
        description: product.description,
        imageUrl: product.imageUrl,
        condition: product.condition,
        price: product.price,
        ownerId: product.ownerId,
        createUser: product.ownerId,
        updateUser: product.ownerId,
      },
    })
  }

  /**
   * 商品をIDから取得
   *
   * @param id 商品ID
   */
  @log
  public async findById(id: number): Promise<ProductEntity | null> {
    return (await prisma.product.findUnique({
      where: {
        id,
      },
    })) as ProductEntity | null
  }

  /**
   * 商品情報をIDから取得
   *
   * @param id 商品ID
   */
  @log
  public async findInfoById(id: number): Promise<ProductInfoEntity | null> {
    const result = await prisma.product.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        category: true,
        condition: true,
        imageUrl: true,
        ownerId: true,
        owner: {
          select: {
            id: true,
            username: true,
            displayName: true,
            email: true,
            profileImageUrl: true,
            description: true,
          },
        },
      },
    })

    if (!result) {
      return null
    }

    return ProductInfoEntity.reconstruct(
      result.id,
      result.title,
      result.description,
      result.price,
      result.category as ProductCategory,
      result.condition as ProductCondition,
      result.imageUrl,
      result.owner,
    )
  }

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
  @log
  public async findByCategory(
    category: ProductCategory | null,
    condition: ProductCondition[] | [],
    page: number | null,
    limit: number | null,
    sort: string[] | null,
    order: OrderBy[] | null,
  ): Promise<ProductEntity[]> {
    // 順序
    const orderBy = sort?.map((field, index) => ({
      [field]: order ? order[index] : 'asc',
    }))

    const result = await prisma.product.findMany({
      where: {
        category: category ?? undefined,
        condition: condition.length > 0 ? { in: condition } : undefined,
      },
      orderBy: orderBy,
      skip: page && limit ? (page - 1) * limit : undefined,
      take: limit ?? undefined,
    })

    return result.map((product) =>
      ProductEntity.reconstruct(
        product.id,
        product.title,
        product.description,
        product.price,
        product.category as ProductCategory,
        product.condition as ProductCondition,
        product.imageUrl,
        product.ownerId,
      ),
    )
  }
}
