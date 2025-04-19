import { Meta, StoryObj } from '@storybook/react'
import Spinner from '@/components/atoms/Loadings/Spinner'

const meta: Meta<typeof Spinner> = {
  title: 'Atoms/Loadings/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    $size: {
      control: { type: 'number' },
      description: 'スピナーのサイズ（直径）',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '50' },
      },
    },
    $strokeWidth: {
      control: { type: 'number' },
      description: 'スピナーの線の太さ',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
      },
    },
    $isAutoCentering: {
      control: { type: 'boolean' },
      description: 'スピナーを中央寄せするかどうか',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Spinner>

// デフォルトのスピナー
export const Default: Story = {
  args: {
    $size: 50,
    $strokeWidth: 4,
    $isAutoCentering: false,
  },
}

// 小さいスピナー
export const Small: Story = {
  args: {
    $size: 30,
    $strokeWidth: 3,
    $isAutoCentering: false,
  },
}

// 大きいスピナー
export const Large: Story = {
  args: {
    $size: 100,
    $strokeWidth: 6,
    $isAutoCentering: false,
  },
}

// 中央寄せスピナー
export const Centered: Story = {
  args: {
    $size: 50,
    $strokeWidth: 4,
    $isAutoCentering: true,
  },
}
