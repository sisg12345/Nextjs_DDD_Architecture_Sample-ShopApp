import { Meta, StoryObj } from '@storybook/react'
import Button from '@/components/atoms/Buttons/Button'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Buttons/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    $variant: {
      options: ['primary', 'secondary', 'danger'],
      control: { type: 'radio' },
      description: 'ボタンのバリアント',
      table: {
        type: { summary: 'primary | secondary | danger' },
        defaultValue: { summary: 'primary' },
      },
    },
    $width: {
      control: { type: 'text' },
      description: 'ボタンの横幅',
      table: {
        type: { summary: 'string' },
      },
    },
    $height: {
      control: { type: 'text' },
      description: 'ボタンの縦幅',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: { type: 'text' },
      defaultValue: 'Button',
      description: 'ボタンの表示内容',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
      description: 'ボタンを無効化するかどうか',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'クリックイベントハンドラー',
      table: {
        type: { summary: 'function' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

// プライマリーボタン
export const Primary: Story = {
  args: {
    $variant: 'primary',
    children: 'Primary Button',
    $width: '150px',
    $height: '40px',
  },
}

// セカンダリーボタン
export const Secondary: Story = {
  args: {
    $variant: 'secondary',
    children: 'Secondary Button',
    $width: '150px',
    $height: '40px',
  },
}

// デンジャーボタン
export const Danger: Story = {
  args: {
    $variant: 'danger',
    children: 'Danger Button',
    $width: '150px',
    $height: '40px',
  },
}

// 無効化されたボタン
export const Disabled: Story = {
  args: {
    $variant: 'primary',
    children: 'Disabled Button',
    disabled: true,
    $width: '150px',
    $height: '40px',
  },
}
