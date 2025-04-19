import { Meta, StoryObj } from '@storybook/react'
import Error from '@/app/error'

const meta: Meta<typeof Error> = {
  title: 'Pages/ErrorPage',
  component: Error,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: { type: 'object' },
      description: 'エラーオブジェクト',
      table: {
        type: { summary: 'Error & { digest?: string }' },
        defaultValue: { summary: '{ message: "Something went wrong" }' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Error>

// デフォルトのエラーページ
export const Default: Story = {}
