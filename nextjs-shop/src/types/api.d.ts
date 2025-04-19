/**
 * 通信レスポンス
 */
/* eslint-disable @typescript-eslint/no-empty-object-type */
export type ResponseResult<T = {}> = {
  /** 成功フラグ */
  success: boolean
  /** メッセージ */
  message?: string
  /** バリデーションエラー */
  errors?: {
    [name: string]: {
      message: string
    }
  }
  /** ステータスコード */
  status?: number
  /** 取得データ */
  data?: T | null
}

/**
 * HTTPメソッド
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS'
