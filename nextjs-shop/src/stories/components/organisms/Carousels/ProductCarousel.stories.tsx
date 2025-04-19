import { Meta, StoryObj } from '@storybook/react'
import Box from '@/components/layouts/Box'
import ProductCard from '@/components/organisms/Cards/ProductCard'
import ProductCarousel from '@/components/organisms/Carousels/ProductCarousel'

const meta: Meta<typeof ProductCarousel> = {
  title: 'Organisms/Carousels/ProductCarousel',
  component: ProductCarousel,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ProductCarousel>

// デフォルトのカルーセル
export const Default: Story = {
  args: {
    children: (
      <>
        <Box $padding={1}>
          <ProductCard
            title="商品1"
            price={1000}
            imageUrl="/placeholder-125.png"
            $variant="small"
          />
        </Box>
        <Box $padding={1}>
          <ProductCard
            title="商品2"
            price={2000}
            imageUrl="/placeholder-125.png"
            $variant="small"
          />
        </Box>
        <Box $padding={1}>
          <ProductCard
            title="商品3"
            price={3000}
            imageUrl="/placeholder-125.png"
            $variant="small"
          />
        </Box>
        <Box $padding={1}>
          <ProductCard
            title="商品4"
            price={4000}
            imageUrl="/placeholder-125.png"
            $variant="small"
          />
        </Box>
        <Box $padding={1}>
          <ProductCard
            title="商品5"
            price={5000}
            imageUrl="/placeholder-125.png"
            $variant="small"
          />
        </Box>
      </>
    ),
  },
}

// カスタムサイズのカルーセル
export const CustomSize: Story = {
  args: {
    children: (
      <>
        <Box $padding={1}>
          <ProductCard
            title="商品A"
            price={1500}
            imageUrl="/placeholder-125.png"
            $variant="small"
          />
        </Box>
        <Box $padding={1}>
          <ProductCard
            title="商品B"
            price={2500}
            imageUrl="/placeholder-125.png"
            $variant="small"
          />
        </Box>
        <Box $padding={1}>
          <ProductCard
            title="商品C"
            price={3500}
            imageUrl="/placeholder-125.png"
            $variant="small"
          />
        </Box>
      </>
    ),
  },
}
