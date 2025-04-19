import { Meta, StoryObj } from '@storybook/react'
import ShapeImage from '@/components/atoms/Images/ShapeImage'

const meta: Meta<typeof ShapeImage> = {
  title: 'Atoms/Images/ShapeImage',
  component: ShapeImage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    $variant: {
      control: { type: 'radio' },
      options: ['circle', 'square'],
      description: '画像の形状（円形または正方形）',
      table: {
        type: { summary: "'circle' | 'square'" },
        defaultValue: { summary: 'square' },
      },
    },
    $width: {
      control: { type: 'number' },
      description: '画像の横幅',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    $height: {
      control: { type: 'number' },
      description: '画像の縦幅',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    alt: {
      control: { type: 'text' },
      description: '代替テキスト',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Shape Image' },
      },
    },
    src: {
      control: { type: 'text' },
      description: '画像のソースパス',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '/placeholder-200.png' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof ShapeImage>

// 円形の画像
export const Circle: Story = {
  args: {
    $variant: 'circle',
    $width: 100,
    $height: 100,
    alt: 'Circle Image',
    src: '/placeholder-200.png', // ローカルのプレースホルダー画像
  },
}

// 正方形の画像
export const Square: Story = {
  args: {
    $variant: 'square',
    $width: 100,
    $height: 100,
    alt: 'Square Image',
    src: '/placeholder-200.png', // ローカルのプレースホルダー画像
  },
}
