import type { ProductCategory, ProductCondition } from '@/types'

// 画面名
export const PAGE_NAME = {
  signin: 'サインイン',
  signup: '会員登録',
  top: 'トップ',
  search: '検索',
  info: 'お知らせ',
  recruit: '採用',
  termsOfService: '利用規約',
  privacyPolicy: 'プライバシーポリシー',
  shippingAndReturns: '配送と返品',
} as const

// 商品カテゴリー
export const PRODUCT_CATEGORY_NAME: Record<ProductCategory | 'all', string> = {
  all: 'すべて',
  clothes: 'トップス',
  book: '本',
  shoes: 'シューズ',
} as const

// 商品の状態
export const PRODUCT_CONDITION: Record<ProductCondition, string> = {
  /** 新本 */
  new: '新品',
  /** 中古 */
  used: '中古',
} as const

// メッセージ
export const MESSAGE = {
  // 成功
  success: '処理が完了しました',
  // 失敗
  failure: '処理に失敗しました',
  // 完了
  complete: {
    // 注文
    order: '注文が確定しました',
  },
  // エラー
  error: {
    api: 'APIリクエスト中にエラーが発生しました。',
    // ファイルアップロード
    fileUpLoad: 'ファイルアップロード中にエラーが発生しました',
    // データベース
    database: 'データベースエラーが発生しました',
    // 認証
    credentialsSignin: 'サインイン認証に失敗しました',
    // サインアップ
    signup: 'サインアップに失敗しました',
    // 存在済み
    exist: 'データが既に存在しています',
    // メールアドレス存在済み
    emailIsExist: 'メールアドレスは既に登録されています',
    // バリデーション
    validation: 'リクエストの値が不正です',
    // Not Found
    notFound: '対象データが存在しません',
    // 無効なユーザーデータ
    invalidUser: '無効なユーザーデータです',
    // 無効な商品データ
    invalidProduct: '無効な商品データです',
    // パスワード必須
    passwordRequired: 'パスワードは必須です',
    // メールアドレス必須
    emailRequired: 'メールアドレスは必須です',
    // タイトル必須
    titleRequired: 'タイトルは必須です',
    // 価格がxxx以上
    PriceGreaterThanEqual: (price: number) => `価格は${price}以上である必要があります`,
  },
}
