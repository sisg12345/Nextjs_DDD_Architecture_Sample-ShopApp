import 'server-only'

import { MESSAGE } from '@/constants'
import type { ProductCategory, ProductCondition } from '@/types'

/**
 * 商品エンティティ
 */
export class ProductEntity {
  /** 商品ID */
  readonly #id: number | null
  /** タイトル */
  #title: string
  /** 説明 */
  #description: string
  /** 値段 */
  #price: number
  /** カテゴリー */
  #category: ProductCategory
  /** 状態 */
  #condition: ProductCondition
  /** 画像URL */
  #imageUrl: string
  /** 所有者ID */
  #ownerId: number

  private constructor(
    id: number | null,
    title: string,
    description: string,
    price: number,
    category: ProductCategory,
    condition: ProductCondition,
    imageUrl: string,
    ownerId: number,
  ) {
    this.#id = id
    this.#title = title
    this.#description = description
    this.#price = price
    this.#category = category
    this.#condition = condition
    this.#imageUrl = imageUrl
    this.#ownerId = ownerId
  }

  /**
   * ファクトリメソッド: 新規作成用
   */
  static create(
    id: number | null,
    title: string,
    description: string,
    price: number,
    category: ProductCategory,
    condition: ProductCondition,
    imageUrl: string,
    ownerId: number,
  ) {
    if (!title.trim() || price < 0) {
      throw new Error(MESSAGE.error.invalidProduct)
    }

    return new ProductEntity(id, title, description, price, category, condition, imageUrl, ownerId)
  }

  /**
   * ファクトリメソッド: 復元用
   */
  static reconstruct(
    id: number,
    title: string,
    description: string,
    price: number,
    category: ProductCategory,
    condition: ProductCondition,
    imageUrl: string,
    ownerId: number,
  ) {
    return new ProductEntity(id, title, description, price, category, condition, imageUrl, ownerId)
  }

  get id() {
    return this.#id
  }

  get title() {
    return this.#title
  }

  get description() {
    return this.#description
  }

  get price() {
    return this.#price
  }

  get category() {
    return this.#category
  }

  get condition() {
    return this.#condition
  }

  get imageUrl() {
    return this.#imageUrl
  }

  get ownerId() {
    return this.#ownerId
  }

  set title(newTitle: string) {
    if (!newTitle.trim()) {
      throw new Error(MESSAGE.error.titleRequired)
    }
    this.title = newTitle
  }

  set price(newPrice: number) {
    if (newPrice < 0) {
      throw new Error(MESSAGE.error.PriceGreaterThanEqual(0))
    }
    this.#price = newPrice
  }

  /**
   * DTO/プリミティブ型へ変換
   */
  toPrimitives() {
    return {
      id: this.#id,
      title: this.#title,
      description: this.#description,
      price: this.#price,
      category: this.#category,
      condition: this.#condition,
      imageUrl: this.#imageUrl,
      ownerId: this.#ownerId,
    }
  }
}
