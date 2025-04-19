import { Meta, StoryObj } from '@storybook/react'
import Dropdown from '@/components/molecules/Dropdowns/Dropdown'

const meta: Meta<typeof Dropdown> = {
  title: 'Molecules/Dropdowns/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: { type: 'object' },
      description: 'ドロップダウンの選択肢',
      table: {
        type: { summary: 'DropdownItem[]' },
        defaultValue: { summary: '[]' },
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'プレースホルダーのテキスト',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Select an option' },
      },
    },
    value: {
      control: { type: 'text' },
      description: '選択された値',
      table: {
        type: { summary: 'string | number' },
      },
    },
    $hasError: {
      control: { type: 'boolean' },
      description: 'エラーフラグ',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onChange: {
      action: 'changed',
      description: '選択値が変更されたときのイベントハンドラー',
      table: {
        type: { summary: '(selected?: DropdownItem) => void' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Dropdown>

// デフォルトのドロップダウン
export const Default: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    placeholder: 'Select an option',
    $hasError: false,
  },
}

// 値が選択された状態のドロップダウン
export const SelectedValue: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    value: 'option2',
    placeholder: 'Select an option',
    $hasError: false,
  },
}

// エラー状態のドロップダウン
export const ErrorState: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    placeholder: 'Select an option',
    $hasError: true,
  },
}
