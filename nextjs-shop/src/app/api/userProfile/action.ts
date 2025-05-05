'use server'

import { redirect } from 'next/navigation'
import type { FileData } from '@/components/molecules/Images/InputImages'
import { diContainer } from '@/inversify.config'
import authGuard from '@/lib/auth/authGuard'
import { Command } from '@/server/application/user/update/command'
import { UpdateUserHandler } from '@/server/application/user/update/updateUserHandler'
import type { ResponseResult } from '@/types'
import TYPES from '@/types/symbol'

/**
 * ユーザープロフィールフォーム
 */
export type UserProfileFormData = {
  /** メールアドレス */
  email: string
  /** 新パスワード */
  newPassword?: string
  /** 新確認パスワード */
  newPasswordConfirm?: string
  // /** ユーザー名 */
  username?: string
  // /** ユーザー表示名 */
  displayName?: string
  // /** プロフィール画像 */
  images: FileData[]
  // /** 説明 */
  description?: string
}

/**
 * ユーザープロフィール更新
 *
 * @param prevState 状態
 * @param formData フォームデータ
 */
export async function updateUserProfile(
  prevState: unknown,
  formData: UserProfileFormData,
): Promise<ResponseResult | void> {
  // 認証ガード
  const session = await authGuard()

  // ユースケースのインプットデータ
  const inputData = new Command(
    Number(session?.user?.id),
    formData.email,
    formData.images,
    formData.newPassword,
    formData.newPasswordConfirm,
    formData.username,
    formData.displayName,
    formData.description,
  )

  // DI
  const updateUserHandler = diContainer.get<UpdateUserHandler>(TYPES.IUpdateUserHandler)
  // ユースケース実行
  const { status, success, message, errors }: ResponseResult =
    await updateUserHandler.handle(inputData)

  // エラーが存在する場合
  if (!success) {
    return {
      status,
      success,
      message,
      errors,
    }
  }

  redirect('/')
}
