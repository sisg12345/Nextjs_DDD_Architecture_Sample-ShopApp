import { Meta, StoryObj } from '@storybook/react'
import Badge from '@/components/atoms/Badges/Badge'

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badges/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: { type: 'number' },
      description: 'バッジに表示する内容',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    $backgroundColor: {
      options: [
        'text',
        'primary',
        'primaryDark',
        'primaryLight',
        'secondary',
        'secondaryDark',
        'secondaryLight',
        'border',
        'danger',
        'dangerDark',
        'gray',
        'black',
        'white',
        'placeholder',
        'disabled',
        'readonly',
      ],
      control: { type: 'radio' },
      description: 'バッジの背景色',
      table: {
        type: { summary: 'ColorThemeKeys | string' },
        defaultValue: { summary: 'primary' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Badge>

// デフォルトのバッジ
export const Default: Story = {
  args: {
    content: 1,
    $backgroundColor: 'primary',
  },
}

// テキスト背景色のバッジ
export const TextBackground: Story = {
  args: {
    content: 1,
    $backgroundColor: 'text',
  },
}

// エラーカラーのバッジ
export const Danger: Story = {
  args: {
    content: 1,
    $backgroundColor: 'danger',
  },
}

// カスタム背景色のバッジ
export const CustomBackground: Story = {
  args: {
    content: 1,
    $backgroundColor: '#ffcc00', // カスタムカラー
  },
}
