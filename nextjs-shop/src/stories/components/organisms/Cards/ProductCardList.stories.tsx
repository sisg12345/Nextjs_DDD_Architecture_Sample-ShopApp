import { Meta, StoryObj } from '@storybook/react'
import ProductCard from '@/components/organisms/Cards/ProductCard'
import ProductCardList from '@/components/organisms/Cards/ProductCardList'

const meta: Meta<typeof ProductCardList> = {
  title: 'Organisms/Cards/ProductCardList',
  component: ProductCardList,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    numberPerRow: {
      control: { type: 'number' },
      description: '1行に表示する商品数',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
      },
    },
    numberPerRowForMobile: {
      control: { type: 'number' },
      description: 'モバイルで1行に表示する商品数',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '2' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof ProductCardList>

// デフォルトのカードリスト
export const Default: Story = {
  args: {
    numberPerRow: 4,
    numberPerRowForMobile: 2,
    children: (
      <>
        <ProductCard
          title="商品1"
          price={1000}
          imageUrl="/placeholder-125.png"
          $variant="listing"
        />
        <ProductCard
          title="商品2"
          price={2000}
          imageUrl="/placeholder-125.png"
          $variant="listing"
        />
        <ProductCard
          title="商品3"
          price={3000}
          imageUrl="/placeholder-125.png"
          $variant="listing"
        />
        <ProductCard
          title="商品4"
          price={4000}
          imageUrl="/placeholder-125.png"
          $variant="listing"
        />
      </>
    ),
  },
}

// カスタム列数のカードリスト
export const CustomColumns: Story = {
  args: {
    numberPerRow: 3,
    numberPerRowForMobile: 1,
    children: (
      <>
        <ProductCard
          title="商品1"
          price={1000}
          imageUrl="/placeholder-125.png"
          $variant="listing"
        />
        <ProductCard
          title="商品2"
          price={2000}
          imageUrl="/placeholder-125.png"
          $variant="listing"
        />
        <ProductCard
          title="商品3"
          price={3000}
          imageUrl="/placeholder-125.png"
          $variant="listing"
        />
      </>
    ),
  },
}
