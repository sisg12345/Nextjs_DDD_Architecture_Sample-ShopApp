import { Meta, StoryObj } from '@storybook/react'
import type { UserProfileFormData } from '@/app/api/userProfile/action'
import UserProfileForm from '@/components/organisms/Forms/UserProfileForm'
import type { User } from '@/types'

const meta: Meta<typeof UserProfileForm> = {
  title: 'Organisms/Forms/UserProfileForm',
  component: UserProfileForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    userProfile: {
      control: { type: 'object' },
      description: 'ユーザーのプロフィール情報',
      table: {
        type: { summary: 'User | null' },
      },
    },
    onSave: {
      action: 'onSave',
      description: '保存ボタンがクリックされたときのイベントハンドラー',
      table: {
        summary:
          '(prevState: unknown, data: UserProfileFormData) => Promise<ResponseResult | void>',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof UserProfileForm>

// デフォルトのユーザープロフィールフォーム
export const Default: Story = {
  args: {
    userProfile: {
      email: 'user@example.com',
      username: 'user123',
      displayName: 'User 123',
      description: 'This is a sample user profile.',
      profileImageUrl: '/placeholder-125.png',
    } as User,
    onSave: async (prevState: unknown, data: UserProfileFormData) => {
      console.log('保存データ:', data)
      return { success: true }
    },
  },
}

// 空のユーザープロフィールフォーム
export const EmptyProfile: Story = {
  args: {
    userProfile: null,
    onSave: async (prevState: unknown, data: UserProfileFormData) => {
      console.log('保存データ:', data)
      return { success: true }
    },
  },
}
