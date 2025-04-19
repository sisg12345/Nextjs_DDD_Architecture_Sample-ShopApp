import { Meta, StoryObj } from '@storybook/react'
import Footer from '@/components/organisms/Footers/Footer'

const meta: Meta<typeof Footer> = {
  title: 'Organisms/Footers/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Footer>

// デフォルトのフッター
export const Default: Story = {}
