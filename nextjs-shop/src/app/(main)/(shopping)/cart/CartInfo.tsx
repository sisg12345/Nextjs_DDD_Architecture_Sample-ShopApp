'use client'

import { usePathname } from 'next/dist/client/components/navigation'
import Text from '@/components/atoms/Texts/Text'
import Box from '@/components/layouts/Box'
import CartProduct from '@/components/organisms/Carts/CartProduct'
import { useGlobalSpinnerActionsContext } from '@/contexts/GlobalSpinnerActionsContext'
import type { AuthGuard, UseAuthGuard } from '@/hooks/useAuthGuard'
import type { CartProduct as OrderProduct } from '@/types'

interface CartInfoProps {
  /** カートの商品 */
  cart: OrderProduct[]
  /** 認証ガード */
  useAuthGuard: (path: UseAuthGuard['path'], queryParams: UseAuthGuard['queryParams']) => AuthGuard
  /** 商品購入 */
  onOrderProduct: (productId: number) => Promise<void>
  /** 商品をカートから削除 */
  onRemoveProduct: (productId: number) => void
}

/**
 * カート情報
 */
export default function CartInfo({
  cart,
  useAuthGuard,
  onOrderProduct,
  onRemoveProduct,
}: CartInfoProps) {
  // ローディングスピナーアクションコンテキストのフック
  const setGlobalSpinner = useGlobalSpinnerActionsContext()
  // pathNameのフック
  const pathname = usePathname()
  // 認証ガード
  const { session, redirect } = useAuthGuard('/signin', { redirect_to: pathname.toString() })

  /**
   * 購入ボタンをクリックした時のハンドラー
   *
   * @param id 商品ID
   */
  const handleByButtonClick = async (id: number) => {
    // 認証されていなければサインイン画面に遷移
    if (!session) {
      redirect()

      return
    }

    // ローディングスピナー表示
    setGlobalSpinner(true)
    // 商品購入
    onOrderProduct(id)
    // ローディングスピナー非表示
    setGlobalSpinner(false)
  }

  return (
    <>
      <Box $padding={2} $paddingBottom={2}>
        <Text as="h1" $variant="large" $display="block" $paddingBottom={2}>
          カート
        </Text>
        {cart.map(({ id, title, price, imageUrl }) => (
          <CartProduct
            id={id}
            title={title}
            price={price}
            imageUlr={imageUrl}
            onBuyButtonClick={handleByButtonClick}
            onRemoveButtonClick={() => {
              onRemoveProduct(id)
            }}
            key={id}
          />
        ))}
      </Box>
    </>
  )
}
