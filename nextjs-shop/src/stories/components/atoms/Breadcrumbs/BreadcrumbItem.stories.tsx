import { Meta, StoryObj } from '@storybook/react'
import Link from 'next/link'
import BreadcrumbItem from '@/components/atoms/Breadcrumbs/BreadcrumbItem'

const meta: Meta<typeof BreadcrumbItem> = {
  title: 'Atoms/Breadcrumbs/BreadcrumbItem',
  component: BreadcrumbItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'パンくずリスト項目の内容',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'Home' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof BreadcrumbItem>

// デフォルトのパンくずリスト項目
export const Default: Story = {
  args: {
    children: 'Home',
  },
  render: (args) => (
    <BreadcrumbItem>
      <Link href="/">{args.children}</Link>
    </BreadcrumbItem>
  ),
}

// カスタムパンくずリスト項目
export const Custom: Story = {
  args: {
    children: 'About',
  },
  render: (args) => (
    <BreadcrumbItem>
      <Link href="/about">{args.children}</Link>
    </BreadcrumbItem>
  ),
}
