import { Meta, StoryObj } from '@storybook/react'
import MessageBar from '@/components/atoms/Bars/MessageBar'

const meta: Meta<typeof MessageBar> = {
  title: 'Atoms/Bars/MessageBar',
  component: MessageBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    $success: {
      control: { type: 'boolean' },
      description: '成功メッセージかどうかを指定',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    children: {
      control: { type: 'text' },
      description: 'メッセージバーに表示する内容',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof MessageBar>

// 成功メッセージ
export const Success: Story = {
  args: {
    $success: true,
    children: 'This is a success message!',
  },
}

// エラーメッセージ
export const Error: Story = {
  args: {
    $success: false,
    children: 'This is an error message!',
  },
}
