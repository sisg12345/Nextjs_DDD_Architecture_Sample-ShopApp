import { Meta, StoryObj } from '@storybook/react'
import NotFoundPage from '@/components/pages/NotFoundPage'

const meta: Meta<typeof NotFoundPage> = {
  title: 'Pages/NotFoundPage',
  component: NotFoundPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof NotFoundPage>

// デフォルトの404ページ
export const Default: Story = {}
