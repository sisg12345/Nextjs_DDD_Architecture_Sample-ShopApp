import 'server-only'

/**
 * 商品サービスインターフェース
 */
export interface IProductService {
  /**
   * 商品注文を確定
   *
   * @param productId 商品ID
   */
  orderProduct(productId: number): Promise<void>

  /**
   * ファイルアップロード
   *
   * @param file ファイルオブジェクト
   * @returns 画像URL
   */
  fileUpload(file?: File): Promise<string>
}
