import { Meta, StoryObj } from '@storybook/react'
import CheckBox from '@/components/molecules/CheckBoxes/CheckBox'

const meta: Meta<typeof CheckBox> = {
  title: 'Molecules/CheckBoxes/CheckBox',
  component: CheckBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'チェックボックスの選択状態',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'チェックボックスのラベル',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Label' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'チェックボックスを無効化するかどうか',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'チェックボックスの状態が変更されたときのイベントハンドラー',
      table: {
        type: { summary: '(event: ChangeEvent<HTMLInputElement>) => void' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof CheckBox>

// デフォルトのチェックボックス
export const Default: Story = {
  args: {
    checked: false,
    label: 'Default CheckBox',
    disabled: false,
  },
}

// チェック済みのチェックボックス
export const Checked: Story = {
  args: {
    checked: true,
    label: 'Checked CheckBox',
    disabled: false,
  },
}

// 無効化されたチェックボックス
export const Disabled: Story = {
  args: {
    checked: false,
    label: 'Disabled CheckBox',
    disabled: true,
  },
}

// チェック済みかつ無効化されたチェックボックス
export const CheckedDisabled: Story = {
  args: {
    checked: true,
    label: 'Checked & Disabled CheckBox',
    disabled: true,
  },
}
