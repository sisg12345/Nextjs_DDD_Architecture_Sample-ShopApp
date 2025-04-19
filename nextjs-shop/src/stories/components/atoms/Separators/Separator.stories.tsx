import { Meta, StoryObj } from '@storybook/react'
import Separator from '@/components/atoms/Separators/Separator'

const meta: Meta<typeof Separator> = {
  title: 'Atoms/Separators/Separator',
  component: Separator,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Separator>

export const Default: Story = {}
