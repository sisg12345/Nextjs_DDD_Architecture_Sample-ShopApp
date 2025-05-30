import type { PropsWithChildren } from 'react'
import Grid, { GridProps } from '@/components/layouts/Gird'

type ProductCardListProps = GridProps & {
  /** 1行に表示する商品数 */
  numberPerRow?: number
  /** モバイルで1行に表示する商品数 */
  numberPerRowForMobile?: number
}

/**
 * 商品カードリスト
 */
export default function ProductCardList({
  numberPerRow = 4,
  numberPerRowForMobile = 2,
  children,
  ...props
}: PropsWithChildren<ProductCardListProps>) {
  return (
    <Grid
      $gridGap="16px"
      $gridTemplateColumns={{
        base: `repeat(${numberPerRowForMobile}, 1fr)`,
        md: `repeat(${numberPerRow}, 1fr)`,
      }}
      {...props}
    >
      {children}
    </Grid>
  )
}
