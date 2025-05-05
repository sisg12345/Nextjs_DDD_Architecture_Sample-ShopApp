'use server'

import { redirect } from 'next/navigation'
import { diContainer } from '@/inversify.config'
import { ICreateUserHandler } from '@/server/application/user/create/ICreateUserHandler'
import { Command } from '@/server/application/user/create/command'
import type { ResponseResult } from '@/types'
import TYPES from '@/types/symbol'

/**
 * サインアップフォーム
 */
export type SignupFormData = {
  /** メールアドレス */
  email: string
  /** パスワード */
  password: string
  /** 確認パスワード */
  passwordConfirm: string
}

/**
 * サインアップ
 *
 * @param prevState 状態
 * @param formData  フォームデータ
 * @returns
 */
export default async function signup(
  prevState: unknown,
  formData: SignupFormData,
): Promise<ResponseResult | void> {
  // ユースケースのインプットデータ
  const inputData = new Command(formData.email, formData.password, formData.passwordConfirm)

  // DI
  const createUserHandler = diContainer.get<ICreateUserHandler>(TYPES.ICreateUserHandler)
  // ユースケース実行
  const { status, success, message, errors }: ResponseResult =
    await createUserHandler.handle(inputData)

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
