import { Meta, StoryObj } from '@storybook/react'
import CartProduct from '@/components/organisms/Carts/CartProduct'

const meta: Meta<typeof CartProduct> = {
  title: 'Organisms/Carts/CartProduct',
  component: CartProduct,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: { type: 'number' },
      description: '商品ID',
      table: {
        type: { summary: 'number' },
      },
    },
    title: {
      control: { type: 'text' },
      description: '商品タイトル',
      table: {
        type: { summary: 'string' },
      },
    },
    price: {
      control: { type: 'number' },
      description: '商品価格',
      table: {
        type: { summary: 'number' },
      },
    },
    imageUlr: {
      control: { type: 'text' },
      description: '商品画像URL',
      table: {
        type: { summary: 'string' },
      },
    },
    onBuyButtonClick: {
      action: 'buyButtonClicked',
      description: '購入ボタンがクリックされたときのイベントハンドラー',
      table: {
        type: { summary: '(id: number) => void' },
      },
    },
    onRemoveButtonClick: {
      action: 'removeButtonClicked',
      description: '削除ボタンがクリックされたときのイベントハンドラー',
      table: {
        type: { summary: '(id: number) => void' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof CartProduct>

// デフォルトのカート商品
export const Default: Story = {
  args: {
    id: 1,
    title: 'サンプル商品',
    price: 1000,
    imageUlr: '/placeholder-125.png',
  },
}

// 購入ボタンと削除ボタンの動作確認
export const WithActions: Story = {
  args: {
    id: 2,
    title: 'アクション付き商品',
    price: 2000,
    imageUlr: '/placeholder-125.png',
    onBuyButtonClick: (id) => alert(`購入ボタンがクリックされました: 商品ID ${id}`),
    onRemoveButtonClick: (id) => alert(`削除ボタンがクリックされました: 商品ID ${id}`),
  },
}
