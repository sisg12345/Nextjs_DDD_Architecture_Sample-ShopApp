'use client'

import { useState } from 'react'
import CartInfo from './CartInfo'
import MessageBar from '@/components/atoms/Bars/MessageBar'
import Box from '@/components/layouts/Box'
import Breadcrumb from '@/components/molecules/Breadcrumbs/Breadcrumb'
import { PAGE_NAME } from '@/constants'
import { useShoppingCartContext } from '@/contexts/ShoppingCartContext/ShoppingCartContext'
import useAuthGuard from '@/hooks/useAuthGuard'
import type { ResponseResult } from '@/types'
import { fetcher } from '@/utils/fetch/fetcher'

const purchaseProduct = async (params: { productId: number }): Promise<ResponseResult> => {
  return await fetcher('http://localhost:3000/api/purchase', {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

/**
 * カートページ
 */
export default function CartPage() {
  // ショッピングカートコンテキストのフック
  const { cart, removeProductFromCart } = useShoppingCartContext()
  // 処理結果の状態
  const [success, setSuccess] = useState<boolean>(false)
  // メッセージ
  const [message, setMessage] = useState<string>('')

  /**
   * 商品を注文
   *
   * @param productId 商品ID
   */
  const onOrderProduct = async (productId: number): Promise<void> => {
    const result: ResponseResult = await purchaseProduct({ productId })
    // 処理完了の場合
    if (result.success) {
      // 処理成功
      setSuccess(true)
      // 処理成功メッセージ
      setMessage(result.message ?? '')
      // 商品購入後はカートから商品を削除
      removeProductFromCart(productId)
    }
  }

  return (
    <Box>
      {/* パンくずリスト */}
      <Breadcrumb
        breadcrumbsInfo={[
          { href: '/', label: PAGE_NAME.top },
          { href: '', label: 'カート' },
        ]}
      />
      <Box as="main" $width={'100vw'}>
        {success && (
          // 処理結果のメッセージバー
          <MessageBar $success={true} $variant="large" $textAlign="center" $padding={1}>
            {message}
          </MessageBar>
        )}
        {/* カート情報 */}
        <CartInfo
          cart={cart}
          onOrderProduct={onOrderProduct}
          onRemoveProduct={removeProductFromCart}
          useAuthGuard={useAuthGuard}
        />
      </Box>
    </Box>
  )
}
