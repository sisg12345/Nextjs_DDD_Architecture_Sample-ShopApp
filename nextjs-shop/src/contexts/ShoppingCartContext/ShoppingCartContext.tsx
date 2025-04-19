'use client'

import type { PropsWithChildren } from 'react'
import { createContext, useContext, useEffect, useReducer } from 'react'
import shopReducer, { ADD_PRODUCT, INIT_PRODUCT, REMOVE_PRODUCT } from './reducer'
import { AppStorage } from '@/lib/storage/storage'
import type { CartProduct } from '@/types'

type ShoppingCartContextType = {
  /** カート */
  cart: CartProduct[]
  /** 表品をカートに追加 */
  addProductToCart: (product: CartProduct) => void
  /** 商品をカートから削除 */
  removeProductFromCart: (productId: number) => void
}

/**
 * ショッピングカートコンテキスト
 */
export const ShoppingCartContext = createContext<ShoppingCartContextType>({
  cart: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {},
})

/**
 * ショッピングカートコンテキストプロバイダー
 */
export function ShoppingCarContextProvider({ children }: PropsWithChildren) {
  // カートのリデューサー
  const [cartState, dispatch] = useReducer(shopReducer, [])

  useEffect(() => {
    // ストレージの初期化
    const localStorage = new AppStorage<CartProduct[]>('nextjs-shop')
    // ストレージからカートのデータを取得
    // 商品一覧
    const products: CartProduct[] = localStorage.getItem('cart') ?? []
    // 商品をセット
    dispatch({ type: INIT_PRODUCT, payload: products })
  }, [])

  /**
   * 商品をカートに追加
   * @param product 商品
   */
  const addProductToCart = (product: CartProduct) => {
    dispatch({ type: ADD_PRODUCT, payload: product })
  }

  /**
   * 商品をカートから削除
   * @param productId 商品ID
   */
  const removeProductFromCart = (productId: number) => {
    dispatch({ type: REMOVE_PRODUCT, payload: productId })
  }

  return (
    <ShoppingCartContext
      value={{
        cart: cartState,
        addProductToCart,
        removeProductFromCart,
      }}
    >
      {children}
    </ShoppingCartContext>
  )
}

/**
 * ショッピングカートコンテキストのフック
 */
export const useShoppingCartContext = (): ShoppingCartContextType =>
  useContext<ShoppingCartContextType>(ShoppingCartContext)
