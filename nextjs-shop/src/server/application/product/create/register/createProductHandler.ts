import 'server-only'

import { inject, injectable } from 'inversify'
import { ICreateProductHandler } from './ICreateProductHandler'
import { Command } from './command'
import { MESSAGE } from '@/constants'
import { productFormSchema } from '@/lib/services/products/validations'
import yup from '@/lib/yup'
import { ProductEntity } from '@/server/domain/entities/productEntity'
import { IProductRepository } from '@/server/domain/interfaces/repositories/IProductRepository'
import { IProductService } from '@/server/domain/interfaces/services/IProductService'
import { log } from '@/server/shared/decorators/log'
import { FileUploadError } from '@/server/shared/errors/fIleUpLoadError'
import type { ResponseResult } from '@/types'
import TYPES from '@/types/symbol'
import { generateErrors } from '@/utils/yupUtil'
import type { ErrorMessages } from '@/utils/yupUtil'

@injectable()
export class CreateProductHandler implements ICreateProductHandler {
  readonly #productService: IProductService
  readonly #productRepository: IProductRepository

  constructor(
    @inject(TYPES.IProductService) productService: IProductService,
    @inject(TYPES.IProductRepository) productRepository: IProductRepository,
  ) {
    this.#productService = productService
    this.#productRepository = productRepository
  }

  @log
  public async handle(command: Command): Promise<ResponseResult> {
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
      await this.validate(command)

      // 商品画像アップロード
      const imageUrl = await this.#productService.fileUpload(command.images[0].file)
      // 商品DTO
      const productEntity = ProductEntity.create(
        null, // 保存処理で自動裁判なので値はnullでOK
        command.title,
        command.description,
        command.price,
        command.category,
        command.condition,
        imageUrl,
        command.userId,
      )

      // 保存
      await this.#productRepository.save(productEntity)
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
