import 'server-only'

import { IProductService } from '@/server/domain/interfaces/services/IProductService'
import { log } from '@/server/shared/decorators/log'
import { FileUploadError } from '@/server/shared/errors/fIleUpLoadError'

/**
 * 商品サービスクラス
 */
export class ProductService implements IProductService {
  /**
   * 商品注文を確定
   * WARNING: 詳細処理については割愛
   *
   * @param productId 商品ID
   */
  @log
  public async orderProduct(productId: number): Promise<void> {
    console.log(`order product dummy process args: ${productId} ...`)
  }

  /**
   * ファイルをアップロード
   * WARNING: 本来クラウドストレージに保存すべき処理なので、ダミー処理を実装している
   *
   * @param file ファイルオブジェクト
   * @returns 画像URL
   */
  @log
  public async fileUpload(file?: File): Promise<string> {
    // 画像URL
    let imageUrl = ''
    try {
      // ファイルが存在する場合、ファイルを保存
      if (file && file.size > 0) {
        // ファイル名を生成...
        // ファイル転送処理...
        // ファイルURLを生成...
        imageUrl = '/placeholder-200.png'
      } else {
        // ファイルアップロード例外をスロー
        throw new FileUploadError()
      }

      return imageUrl
    } catch (error) {
      if (error instanceof Error) {
        // ファイルアップロード例外をスロー
        throw new FileUploadError()
      }
    }

    return imageUrl
  }
}
