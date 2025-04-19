import { Meta, StoryObj } from '@storybook/react'
import type { SigninFormData } from '@/app/api/signin/action'
import SigninForm from '@/components/organisms/Forms/SigninForm'

const meta: Meta<typeof SigninForm> = {
  title: 'Organisms/Forms/SigninForm',
  component: SigninForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSignin: {
      action: 'onSignin',
      description: 'サインインボタンがクリックされたときのイベントハンドラー',
      table: {
        type: {
          summary: '(prevState: unknown, formData: SigninFormData) => Promise<string | void>',
        },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof SigninForm>

// デフォルトのサインインフォーム
export const Default: Story = {
  args: {
    onSignin: async (prevState: unknown, formData: SigninFormData) => {
      console.log('サインインデータ:', formData)
      return 'サインイン成功'
    },
  },
}
