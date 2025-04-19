/**
 * fetchをラップした関数
 * 指定されたリソースに対してHTTPリクエストを行い、レスポンスをJSONとして返す
 * レスポンスが失敗した場合は、エラーメッセージを含む例外を投げる
 *
 * @param resource リクエストするリソースのURLまたはRequestオブジェクト
 * @param init リクエストの初期化オプション
 * @returns レスポンスのJSONデータ
 * @throws レスポンスが(ステータスコード: 500)失敗した場合にエラーメッセージを含む例外を投げる
 */

import { notFound, redirect } from 'next/navigation'
import { MESSAGE } from '@/constants'

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const fetcher = async <T>(resource: RequestInfo, init?: RequestInit): Promise<T> => {
  // リソースに対してHTTPリクエストを行う
  const response = await fetch(resource, init)

  // レスポンスが失敗の場合
  if (!response.ok) {
    const statusText = response.statusText
    // エラーメッセージ
    let message = MESSAGE.error.api

    try {
      // レスポンスのJSONデータを取得
      const errorResponse = await response.json()
      message = errorResponse?.message ?? message
    } catch {
      // エラーメッセージ
      message = statusText || message
    }

    switch (response.status) {
      case 400:
        console.warn(`400 ${statusText}`)
        break
      case 401:
        console.warn(`401 ${statusText}`)
        // ホーム画面へ遷移
        redirect('/')
        break
      case 403:
        console.warn(`403 ${statusText}`)
        // ホーム画面へ遷移
        redirect('/')
        break
      case 404:
        console.warn(`404 ${statusText}`)
        // 404 Not Found ページへ遷移
        notFound()
        break
      case 500:
        console.error(`500 ${statusText}`)
        throw new Error(`[${response.status}] ${message}`)
    }
  }

  // レスポンスのJSONデータを返す
  return await response.json()
}
