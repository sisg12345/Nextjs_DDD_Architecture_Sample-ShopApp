import { Meta, StoryObj } from '@storybook/react'
import AppLogo from '@/components/atoms/Logos/AppLogo'

const meta: Meta<typeof AppLogo> = {
  title: 'Atoms/Logos/AppLogo',
  component: AppLogo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof AppLogo>

// デフォルトのロゴ
export const Default: Story = {}
