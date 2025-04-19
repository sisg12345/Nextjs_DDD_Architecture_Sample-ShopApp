'use client'

import { AppStorage } from '@/lib/storage/storage'
import type { CartProduct } from '@/types'

// 初期化
export const INIT_PRODUCT = 'INIT_PRODUCT'
// 商品追加
export const ADD_PRODUCT = 'ADD_PRODUCT'
// 商品削除
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
// ローカルストレージの初期化
const localStorage = new AppStorage<CartProduct[]>('nextjs-shop')

/**
 * 商品追加アクション
 *
 * @param product 商品ID
 * @param state 現在の状態
 * @returns 次の状態
 */
const addProductToCart = (product: CartProduct, state: CartProduct[]) => {
  const newState = [...state, product]
  // ストレージにデータを保存
  localStorage.setItem('cart', newState)
  // ストレージに保存
  localStorage.save()

  // データを追加した新しい状態を返却
  return newState
}

/**
 * 商品削除アクション
 *
 * @param productId 商品ID
 * @param state 現在の状態
 * @returns 次の状態
 */
const removeProductFromCart = (productId: number, state: CartProduct[]) => {
  // 削除対象データのインデックスを取得
  const removeItemIndex = state.findIndex((item) => item.id === productId)

  // 新しい状態
  const newState = [...state]
  // 新しい状態からデータを対象削除
  newState.splice(removeItemIndex, 1)
  // ストレージにデータを保存
  localStorage.setItem('cart', newState)
  // ストレージに保存
  localStorage.save()

  // 新しい状態を編曲
  return newState
}

type ShopReducerAction =
  | { type: typeof INIT_PRODUCT; payload: CartProduct[] }
  | { type: typeof ADD_PRODUCT; payload: CartProduct }
  | { type: typeof REMOVE_PRODUCT; payload: number }

export default function shopReducer(state: CartProduct[], action: ShopReducerAction) {
  switch (action.type) {
    // 初期化
    // NOTE: ブラウザのストレージに対応用、アクション経由で初期値をセットしないと永続化されない
    case INIT_PRODUCT:
      return action.payload
    // 商品追加
    case ADD_PRODUCT:
      return addProductToCart(action.payload, state)
    // 商品削除
    case REMOVE_PRODUCT:
      return removeProductFromCart(action.payload, state)
  }
}
