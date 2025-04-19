import { Meta, StoryObj } from '@storybook/react'
import GlobalSpinner from '@/components/organisms/Spinners/GlobalSpinner'
import { GlobalSpinnerContext } from '@/contexts/GlobalSpinnerActionsContext'

const meta: Meta<typeof GlobalSpinner> = {
  title: 'Organisms/Spinners/GlobalSpinner',
  component: GlobalSpinner,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof GlobalSpinner>

// スピナーが表示されている状態
export const Active: Story = {
  decorators: [
    (Story) => (
      <GlobalSpinnerContext value={true}>
        <Story />
      </GlobalSpinnerContext>
    ),
  ],
}

// スピナーが非表示の状態
export const Inactive: Story = {
  decorators: [
    (Story) => (
      <GlobalSpinnerContext value={false}>
        <Story />
      </GlobalSpinnerContext>
    ),
  ],
}
