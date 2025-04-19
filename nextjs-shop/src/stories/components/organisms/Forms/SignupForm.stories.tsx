import { Meta, StoryObj } from '@storybook/react'
import type { SignupFormData } from '@/app/api/singup/action'
import SignupForm from '@/components/organisms/Forms/SignupForm'

const meta: Meta<typeof SignupForm> = {
  title: 'Organisms/Forms/SignupForm',
  component: SignupForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSignup: {
      action: 'onSignup',
      description: 'サインアップボタンがクリックされたときのイベントハンドラー',
      table: {
        type: {
          summary:
            '(prevState: unknown, formData: SignupFormData) => Promise<ResponseResult | void>',
        },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof SignupForm>

// デフォルトのサインアップフォーム
export const Default: Story = {
  args: {
    onSignup: async (prevState: unknown, formData: SignupFormData) => {
      console.log('サインアップデータ:', formData)
      return { success: true }
    },
  },
}
