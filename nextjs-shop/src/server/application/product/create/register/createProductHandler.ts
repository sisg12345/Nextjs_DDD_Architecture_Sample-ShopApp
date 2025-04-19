import 'server-only'

import { Command } from './command'
import { MESSAGE } from '@/constants'
import { productFormSchema } from '@/lib/services/products/validations'
import yup from '@/lib/yup'
import { ProductEntity } from '@/server/domain/entities/productEntity'
import { ProductService } from '@/server/domain/services/productService'
import { ProductRepository } from '@/server/infrastructure/repositories/product/productRepository'
import { log } from '@/server/shared/decorators/log'
import { FileUploadError } from '@/server/shared/errors/fIleUpLoadError'
import type { ResponseResult } from '@/types'
import { generateErrors } from '@/utils/yupUtil'
import type { ErrorMessages } from '@/utils/yupUtil'

export class CreateProductHandler {
  constructor(
    private readonly command: Command,
    private readonly productService: ProductService,
    private readonly productRepository: ProductRepository,
  ) {}

  @log
  public async handle(): Promise<ResponseResult> {
    // ステータスコード
    let status = 200 // 成功
    // 処理結果
    let success = true
    // メッセージ
    let message
    // エラーメッセージオブジェクト
    let errors: ErrorMessages = {}

    try {
      // バリデーション実行
      await this.validate(this.command)

      // 商品画像アップロード
      const imageUrl = await this.productService.fileUpload(this.command.images[0].file)
      // 商品DTO
      const productEntity = ProductEntity.create(
        null, // 保存処理で自動裁判なので値はnullでOK
        this.command.title,
        this.command.description,
        this.command.price,
        this.command.category,
        this.command.condition,
        imageUrl,
        this.command.userId,
      )

      // 保存
      await this.productRepository.save(productEntity)
    } catch (error: unknown) {
      // 処理失敗
      success = false
      // メッセージ
      message = MESSAGE.failure

      // フォームバリデーション例外
      if (error instanceof yup.ValidationError) {
        // エラースターすコード
        status = 400
        // エラーオブジェクト生成
        errors = generateErrors(error)
      }
      // ファイルアップロード例外
      if (error instanceof FileUploadError) {
        // エラースターすコード
        status = error.status
        // メッセージ
        message = error.message
      }
    }

    return {
      status,
      success,
      message,
      errors,
    }
  }

  /**
   * バリデーション
   *
   * @param command インプットデータ
   */
  @log
  private async validate(command: Command): Promise<void> {
    // フォームデータのバリデーション
    await productFormSchema.validate(command, { abortEarly: false })
  }
}
