import { Meta, StoryObj } from '@storybook/react'
import TextArea from '@/components/atoms/Inputs/TextArea'

const meta: Meta<typeof TextArea> = {
  title: 'Atoms/Inputs/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    minRows: {
      control: { type: 'number' },
      description: '最小行数',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' },
      },
    },
    maxRows: {
      control: { type: 'number' },
      description: '最大行数',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '10' },
      },
    },
    $hasError: {
      control: { type: 'boolean' },
      description: 'バリデーションエラーフラグ',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'プレースホルダー',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Enter text...' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof TextArea>

// デフォルトのテキストエリア
export const Default: Story = {
  args: {
    minRows: 5,
    maxRows: 10,
    $hasError: false,
    placeholder: 'Enter text...',
  },
}

// エラー状態のテキストエリア
export const Error: Story = {
  args: {
    minRows: 5,
    maxRows: 10,
    $hasError: true,
    placeholder: 'Error state',
  },
}

// カスタム行数のテキストエリア
export const CustomRows: Story = {
  args: {
    minRows: 3,
    maxRows: 6,
    $hasError: false,
    placeholder: 'Custom rows',
  },
}
