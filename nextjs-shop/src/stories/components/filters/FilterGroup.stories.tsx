import { Meta, StoryObj } from '@storybook/react'
import FilterGroup from '@/components/molecules/Filters/FilterGroup'

const meta: Meta<typeof FilterGroup> = {
  title: 'Molecules/Filters/FilterGroup',
  component: FilterGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'フィルターグループのタイトル',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Filter Group' },
      },
    },
    items: {
      control: { type: 'object' },
      description: 'フィルター項目のリスト',
      table: {
        type: { summary: 'Item[]' },
        defaultValue: { summary: '[]' },
      },
    },
    value: {
      control: { type: 'object' },
      description: '選択済みの値',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    defaultValue: {
      control: { type: 'object' },
      description: 'デフォルトで選択される値',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    onChange: {
      action: 'changed',
      description: '選択値が変更されたときのイベントハンドラー',
      table: {
        type: { summary: '(value: string[]) => void' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof FilterGroup>

// デフォルトのフィルターグループ
export const Default: Story = {
  args: {
    title: 'Category',
    items: [
      { label: 'Electronics', name: 'electronics' },
      { label: 'Books', name: 'books' },
      { label: 'Clothing', name: 'clothing' },
    ],
    value: [],
    defaultValue: [],
  },
}

// デフォルト値が設定されたフィルターグループ
export const WithDefaultValue: Story = {
  args: {
    title: 'Category',
    items: [
      { label: 'Electronics', name: 'electronics' },
      { label: 'Books', name: 'books' },
      { label: 'Clothing', name: 'clothing' },
    ],
    defaultValue: ['electronics'],
  },
}

// 複数選択されたフィルターグループ
export const MultipleSelected: Story = {
  args: {
    title: 'Category',
    items: [
      { label: 'Electronics', name: 'electronics' },
      { label: 'Books', name: 'books' },
      { label: 'Clothing', name: 'clothing' },
    ],
    value: ['electronics', 'books'],
  },
}
