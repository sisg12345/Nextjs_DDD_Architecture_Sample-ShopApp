import { Meta, StoryObj } from '@storybook/react'
import ProductCard from '@/components/organisms/Cards/ProductCard'

const meta: Meta<typeof ProductCard> = {
  title: 'Organisms/Cards/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
      description: '商品のタイトル',
      table: {
        type: { summary: 'string' },
      },
    },
    price: {
      control: { type: 'number' },
      description: '商品の価格',
      table: {
        type: { summary: 'number' },
      },
    },
    imageUrl: {
      control: { type: 'text' },
      description: '商品の画像URL',
      table: {
        type: { summary: 'string' },
      },
    },
    blurDataUrl: {
      control: { type: 'text' },
      description: 'ぼかし画像のデータURIスキーム',
      table: {
        type: { summary: 'string' },
      },
    },
    $variant: {
      control: { type: 'select' },
      options: ['small', 'listing', 'detail'],
      description: '表示スタイルのバリアント',
      table: {
        type: { summary: "'small' | 'listing' | 'detail'" },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof ProductCard>

// デフォルトのプロダクトカード
export const Default: Story = {
  args: {
    title: 'サンプル商品',
    price: 1000,
    imageUrl: '/placeholder-125.png',
    blurDataUrl: '/placeholder-125.png',
    $variant: 'listing',
  },
}

// 小さいサイズのプロダクトカード
export const Small: Story = {
  args: {
    title: '小さい商品',
    price: 500,
    imageUrl: '/placeholder-125.png',
    $variant: 'small',
  },
}

// 詳細表示のプロダクトカード
export const Detail: Story = {
  args: {
    title: '詳細商品',
    price: 2000,
    imageUrl: '/placeholder-125.png',
    blurDataUrl: '/placeholder-125.png',
    $variant: 'detail',
  },
}
