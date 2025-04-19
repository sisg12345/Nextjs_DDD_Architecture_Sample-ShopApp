import { Meta, StoryObj } from '@storybook/react'
import ScaleImage from '@/components/atoms/Images/ScaleImage'

const meta: Meta<typeof ScaleImage> = {
  title: 'Atoms/Images/ScaleImage',
  component: ScaleImage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    $containerWidth: {
      control: { type: 'number' },
      description: 'スケールイメージのコンテナーの横幅',
      table: {
        type: { summary: 'Responsive<number>' },
        defaultValue: { summary: '200' },
      },
    },
    $containerHeight: {
      control: { type: 'number' },
      description: 'スケールイメージのコンテナーの縦幅',
      table: {
        type: { summary: 'Responsive<number>' },
        defaultValue: { summary: '200' },
      },
    },
    $width: {
      control: { type: 'number' },
      description: 'イメージの横幅',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '200' },
      },
    },
    $height: {
      control: { type: 'number' },
      description: 'イメージの縦幅',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '200' },
      },
    },
    alt: {
      control: { type: 'text' },
      description: '代替テキスト',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof ScaleImage>

// デフォルトのスケールイメージ
export const Default: Story = {
  args: {
    $containerWidth: 200,
    $containerHeight: 200,
    $width: 200,
    $height: 200,
    alt: 'Default Image',
    src: '/placeholder-200.png', // 画像パスを直接指定
  },
}

// カスタムサイズのスケールイメージ
export const CustomSize: Story = {
  args: {
    $containerWidth: 125,
    $containerHeight: 125,
    $width: 125,
    $height: 125,
    alt: 'Custom Size Image',
    src: '/placeholder-200.png', // 同じ画像パスを使用
  },
}
