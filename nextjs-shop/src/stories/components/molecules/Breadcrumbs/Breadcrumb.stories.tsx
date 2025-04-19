import { Meta, StoryObj } from '@storybook/react'
import Breadcrumb from '@/components/molecules/Breadcrumbs/Breadcrumb'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Molecules/Breadcrumbs/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    breadcrumbsInfo: {
      control: { type: 'object' },
      description: 'パンくずリストの情報',
      table: {
        type: { summary: 'Breadcrumb[]' },
        defaultValue: { summary: '[]' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Breadcrumb>

// デフォルトのパンくずリスト
export const Default: Story = {
  args: {
    breadcrumbsInfo: [
      { href: '/', label: 'Home' },
      { href: '/category', label: 'Category' },
      { href: '/category/item', label: 'Item' },
    ],
  },
}

// シンプルなパンくずリスト
export const Simple: Story = {
  args: {
    breadcrumbsInfo: [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
    ],
  },
}

// カスタムパンくずリスト
export const Custom: Story = {
  args: {
    breadcrumbsInfo: [
      { href: '/', label: 'トップ' },
      { href: '/サービス', label: 'サービス' },
      { href: '/サービス/詳細', label: '詳細' },
    ],
  },
}
