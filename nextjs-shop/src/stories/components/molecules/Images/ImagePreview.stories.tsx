import { Meta, StoryObj } from '@storybook/react'
import ImagePreview from '@/components/molecules/Images/ImagePreview'

const meta: Meta<typeof ImagePreview> = {
  title: 'Molecules/Images/ImagePreview',
  component: ImagePreview,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: { type: 'text' },
      description: '画像のソースURL',
      table: {
        type: { summary: 'string' },
      },
    },
    alt: {
      control: { type: 'text' },
      description: '画像の代替テキスト',
      table: {
        type: { summary: 'string' },
      },
    },
    $width: {
      control: { type: 'number' },
      description: '画像の横幅',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '150' },
      },
    },
    $height: {
      control: { type: 'number' },
      description: '画像の縦幅',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '150' },
      },
    },
    onRemove: {
      action: 'removed',
      description: '削除ボタンがクリックされたときのイベントハンドラー',
      table: {
        type: { summary: '(src: string) => void' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof ImagePreview>

// デフォルトのイメージプレビュー
export const Default: Story = {
  args: {
    src: '/placeholder-125.png', // ローカルのプレースホルダー画像
    alt: 'Placeholder Image',
    $width: 150,
    $height: 150,
  },
}

// カスタムサイズのイメージプレビュー
export const CustomSize: Story = {
  args: {
    src: '/placeholder-125.png', // ローカルのプレースホルダー画像
    alt: 'Custom Size Image',
    $width: 300,
    $height: 200,
  },
}

// 削除ボタンの動作確認
export const WithRemoveAction: Story = {
  args: {
    src: '/placeholder-125.png', // ローカルのプレースホルダー画像
    alt: 'Removable Image',
    $width: 150,
    $height: 150,
    onRemove: (src) => alert(`Removed image: ${src}`),
  },
}
