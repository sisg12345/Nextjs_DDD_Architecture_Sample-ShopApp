/**
 * 商品カテゴリー
 */
export type ProductCategory =
  | 'shoes' // 靴
  | 'clothes' // 服
  | 'book' // 本

/**
 * 商品の状態
 */
export type ProductCondition =
  | 'new' // 新本
  | 'used' // 中古

/** 商品 */
export type Product = {
  /** 商品ID */
  id: number
  /** カテゴリー */
  category: ProductCategory
  /** タイトル */
  title: string
  /** 説明 */
  description: string
  /** 値段 */
  price: number
  /** 状態 */
  condition: ProductCondition
  /** 画像URL */
  imageUrl: string
  /** 商品のぼかし画像のデータURIスキーム */
  blurDataUrl: string
}

/**
 * 商品詳細
 */
export type ProductDetail = Product & {
  /** オーナー情報 */
  owner: User
}

/**
 * カート商品
 */
export type CartProduct = {
  /** 商品ID */
  id: number
  /** 商品タイトル */
  title: string
  /** 商品の値段 */
  price: number
  /** 画像URL */
  imageUrl: string
}

/**
 * ユーザー
 */
export type User = {
  /** ユーザーID */
  id: number
  /** メールアドレス */
  email: string
  /** ユーザー名 */
  username: string
  /** ユーザー表示名 */
  displayName: string
  /** プロフィール画像のURL */
  profileImageUrl: string
  /** 説明 */
  description: string
}

/**
 * API Context
 */
export type ApiContext = {
  /** APIのルートURL */
  apiRootUrl: string
}
