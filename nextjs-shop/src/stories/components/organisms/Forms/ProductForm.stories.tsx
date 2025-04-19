import { Meta, StoryObj } from '@storybook/react'
import type { ProductFormData } from '@/app/api/sell/action'
import ProductForm from '@/components/organisms/Forms/ProductForm'

const meta: Meta<typeof ProductForm> = {
  title: 'Organisms/Forms/ProductForm',
  component: ProductForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSave: {
      action: 'onSave',
      description: '出品ボタンがクリックされたときのイベントハンドラー',
      table: {
        type: {
          summary: '(prevState: unknown, data: ProductFormData) => Promise<ResponseResult | void>',
        },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof ProductForm>

// デフォルトのフォーム
export const Default: Story = {
  args: {
    onSave: async (prevState: unknown, data: ProductFormData) => {
      console.log('フォームデータ:', data)
      return { success: true }
    },
  },
}
