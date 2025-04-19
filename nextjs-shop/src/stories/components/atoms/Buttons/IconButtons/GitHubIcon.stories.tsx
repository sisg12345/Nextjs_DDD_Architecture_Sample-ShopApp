import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { GitHubIcon } from '@/components/atoms/Buttons/IconButton'

const meta: Meta<typeof GitHubIcon> = {
  title: 'Atoms/Buttons/IconButtons/GitHubIcon',
  component: GitHubIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    $size: {
      control: { type: 'number' },
      description: 'サイズ',
      table: {
        type: { summary: 'number' },
      },
    },
    $color: {
      options: [
        'text',
        'primary',
        'primaryDark',
        'primaryLight',
        'secondary',
        'secondaryDark',
        'secondaryLight',
        'border',
        'danger',
        'dangerDark',
        'gray',
        'black',
        'white',
        'placeholder',
        'disabled',
        'readonly',
      ],
      control: { type: 'radio' },
      description: '色',
    },
    $backgroundColor: {
      control: { type: 'color' },
      description: '背景色',
      table: { summary: 'color' },
    },
  },
  args: { onClick: fn() },
}

export default meta

type Story = StoryObj<typeof meta>

// ノーマル
export const Normal: Story = {
  args: { $size: 24 },
}

// Primary
export const Primary: Story = {
  args: { $size: 24, $color: 'primary' },
}

// Secondary
export const Secondary: Story = {
  args: { $size: 24, $color: 'secondary' },
}
