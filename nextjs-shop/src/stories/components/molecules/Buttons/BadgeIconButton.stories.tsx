import { Meta, StoryObj } from '@storybook/react'
import { ShoppingCartIcon } from '@/components/atoms/Buttons/IconButton'
import BadgeIconButton from '@/components/molecules/Buttons/BadgeIconButton'

const meta: Meta<typeof BadgeIconButton> = {
  title: 'Molecules/Buttons/BadgeIconButton',
  component: BadgeIconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    badgeContent: {
      control: { type: 'number' },
      description: 'バッジに表示する内容',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    $size: {
      control: { type: 'number' },
      description: 'ボタンのサイズ（px）',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '24' },
      },
    },
    $badgeBackgroundColor: {
      control: { type: 'color' },
      description: 'バッジの背景色',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'red' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof BadgeIconButton>

// デフォルトのバッジ付きショッピングカートアイコンボタン
export const Default: Story = {
  args: {
    icon: <ShoppingCartIcon $size={24} $color="black" />,
    badgeContent: 5,
    $size: 24,
    $badgeBackgroundColor: 'red',
  },
}

// バッジなしのショッピングカートアイコンボタン
export const NoBadge: Story = {
  args: {
    icon: <ShoppingCartIcon $size={24} $color="black" />,
    badgeContent: 0,
    $size: 24,
    $badgeBackgroundColor: 'red',
  },
}

// カスタムサイズのバッジ付きショッピングカートアイコンボタン
export const CustomSize: Story = {
  args: {
    icon: <ShoppingCartIcon $size={32} $color="primary" />,
    badgeContent: 10,
    $size: 50,
    $badgeBackgroundColor: 'blue',
  },
}

// カスタムバッジカラーのショッピングカートアイコンボタン
export const CustomBadgeColor: Story = {
  args: {
    icon: <ShoppingCartIcon $size={24} $color="white" />,
    badgeContent: 99,
    $size: 24,
    $badgeBackgroundColor: 'green',
  },
}
