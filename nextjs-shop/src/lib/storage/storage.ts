// ストレージのアプリの識別キー
export type AppKeys = 'nextjs-shop'
// ストレージのキー
export type StorageKeys = 'cart'
// ストレージタイプ
type StorageType = 'local' | 'session'

export class AppStorage<T> {
  // アプリ名
  #app: AppKeys
  // ストレージタイプ
  #storage: Storage
  // ストレージでアクセスするデータ
  #data: Record<StorageKeys, T | undefined>

  /**
   *
   * @param app アプリ名
   * @param storageType ストレージタイプ
   */
  constructor(app: AppKeys, storageType: StorageType = 'local') {
    // ストレージタイプ
    let storage: Storage = emptyStorage
    // クライアントサイドの場合、ストレージタイプをセット
    if (typeof window !== 'undefined') {
      storage = storageType === 'local' ? localStorage : sessionStorage
    }
    // アクセスアプリ
    this.#app = app
    // ストレージタイプ
    this.#storage = storage
    // ストレージの初期化, データがない場合は空オブジェクトを生成
    this.#data = JSON.parse(this.#storage.getItem(app) || '{}')
  }

  /**
   * ストレージに保存するデータをセット
   *
   * @param key アプリの識別キー
   * @param value ストレージに保存するデータ
   */
  setItem(key: StorageKeys, value: T): void {
    this.#data[key] = value
  }

  /**
   * ストレージからデータを取得
   *
   * @param key アプリの識別キー
   * @returns ストレージから取得したデータ
   */
  getItem(key: StorageKeys): T | undefined {
    return this.#data[key]
  }

  /**
   * ストレージからデータを削除
   *
   * @param key アプリの識別キー
   */
  removeItem(key: StorageKeys): void {
    // ストレージからデータを削除
    delete this.#data[key]
  }

  /**
   * データをストレージに保存
   */
  save(): void {
    for (const key in this.#data) {
      const storageKey = key as StorageKeys
      if (this.#data[storageKey] == null) {
        delete this.#data[storageKey]
      }
    }

    this.#storage[this.#app] = JSON.stringify(this.#data)
  }

  /**
   * ストレージをクリア
   */
  clear(): void {
    this.#storage.clear()
  }
}

/**
 * 空のストレージ
 *  NOTE: SSRレンダリングでのエラー回避用
 */
const emptyStorage: Storage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
  clear: () => undefined,
  key: () => null,
  length: 0,
}
