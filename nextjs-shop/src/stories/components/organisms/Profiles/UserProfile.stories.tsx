import { Meta, StoryObj } from '@storybook/react'
import UserProfile from '@/components/organisms/Profiles/UserProfile'

const meta: Meta<typeof UserProfile> = {
  title: 'Organisms/Profiles/UserProfile',
  component: UserProfile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    $variant: {
      control: { type: 'select' },
      options: ['normal', 'small'],
      description: 'プロファイルの表示バリアント',
      table: {
        type: { summary: "'normal' | 'small'" },
        defaultValue: { summary: 'normal' },
      },
    },
    username: {
      control: { type: 'text' },
      description: 'ユーザー名',
      table: {
        type: { summary: 'string' },
      },
    },
    profileImageUrl: {
      control: { type: 'text' },
      description: 'ユーザー画像URL',
      table: {
        type: { summary: 'string' },
      },
    },
    numberOfProducts: {
      control: { type: 'number' },
      description: 'ユーザーが所有する商品数',
      table: {
        type: { summary: 'number' },
      },
    },
    description: {
      control: { type: 'text' },
      description: 'ユーザーの説明',
      table: {
        type: { summary: 'string' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof UserProfile>

// デフォルトのユーザープロファイル
export const Default: Story = {
  args: {
    $variant: 'normal',
    username: 'John Doe',
    profileImageUrl: '/placeholder-125.png',
    numberOfProducts: 10,
    description: 'This is a sample user profile description.',
  },
}

// 小さいサイズのユーザープロファイル
export const Small: Story = {
  args: {
    $variant: 'small',
    username: 'Jane Doe',
    profileImageUrl: '/placeholder-125.png',
    numberOfProducts: 5,
    description: '',
  },
}
