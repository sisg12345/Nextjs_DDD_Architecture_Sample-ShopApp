import { Meta, StoryObj } from '@storybook/react'
import Loading from '@/app/loading'

const meta: Meta<typeof Loading> = {
  title: 'Pages/LoadingPage',
  component: Loading,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Loading>

// デフォルトのローディングページ
export const Default: Story = {}
