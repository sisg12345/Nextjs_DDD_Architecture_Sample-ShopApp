import { Meta, StoryObj } from '@storybook/react'
import RectLoader from '@/components/atoms/Loadings/RectLoader'

const meta: Meta<typeof RectLoader> = {
  title: 'Atoms/Loadings/RectLoader',
  component: RectLoader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    $width: {
      control: { type: 'number' },
      description: 'ローダーの横幅',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    $height: {
      control: { type: 'number' },
      description: 'ローダーの縦幅',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    backgroundColor: {
      control: { type: 'color' },
      description: 'ローダーの背景色',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#f3f3f3' },
      },
    },
    foregroundColor: {
      control: { type: 'color' },
      description: 'ローダーの前景色',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#ecebeb' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof RectLoader>

// デフォルトのローダー
export const Default: Story = {
  args: {
    $width: 100,
    $height: 100,
    backgroundColor: '#f3f3f3',
    foregroundColor: '#ecebeb',
  },
}

// カスタムサイズのローダー
export const CustomSize: Story = {
  args: {
    $width: 200,
    $height: 50,
    backgroundColor: '#d3d3d3',
    foregroundColor: '#c0c0c0',
  },
}

// 大きなローダー
export const Large: Story = {
  args: {
    $width: 300,
    $height: 150,
    backgroundColor: '#e0e0e0',
    foregroundColor: '#d0d0d0',
  },
}
