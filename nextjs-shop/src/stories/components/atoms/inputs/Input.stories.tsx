import { Meta, StoryObj } from '@storybook/react'
import Input from '@/components/atoms/Inputs/Input'

const meta: Meta<typeof Input> = {
  title: 'Atoms/Inputs/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    $hasBorder: {
      control: { type: 'boolean' },
      description: 'ボーダーラインの表示フラグ',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
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

type Story = StoryObj<typeof Input>

// デフォルトの入力フィールド
export const Default: Story = {
  args: {
    $hasBorder: true,
    $hasError: false,
    placeholder: 'Enter text...',
  },
}

// エラー状態の入力フィールド
export const Error: Story = {
  args: {
    $hasBorder: true,
    $hasError: true,
    placeholder: 'Error state',
  },
}

// ボーダーなしの入力フィールド
export const NoBorder: Story = {
  args: {
    $hasBorder: false,
    $hasError: false,
    placeholder: 'No border',
  },
}
