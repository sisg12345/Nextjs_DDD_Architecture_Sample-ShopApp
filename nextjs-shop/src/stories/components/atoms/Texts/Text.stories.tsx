import { Meta, StoryObj } from '@storybook/react'
import Text from '@/components/atoms/Texts/Text'

const meta: Meta<typeof Text> = {
  title: 'Atoms/Texts/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    $variant: {
      control: { type: 'select' },
      options: ['extraSmall', 'small', 'medium', 'mediumLarge', 'large', 'extraLarge'],
      description: 'テキストのバリアント（スタイル）',
      table: {
        type: {
          summary: "'extraSmall' | 'small' | 'medium' | 'mediumLarge' | 'large' | 'extraLarge'",
        },
        defaultValue: { summary: 'medium' },
      },
    },
    $color: {
      control: { type: 'color' },
      description: 'テキストの色',
      table: {
        type: { summary: 'Color' },
        defaultValue: { summary: 'text' },
      },
    },
    $fontSize: {
      control: { type: 'text' },
      description: 'フォントサイズ',
      table: {
        type: { summary: 'Responsive<FontSize>' },
        defaultValue: { summary: 'medium' },
      },
    },
    $fontWeight: {
      control: { type: 'text' },
      description: 'フォントの太さ',
      table: {
        type: { summary: 'Responsive<string>' },
        defaultValue: { summary: 'normal' },
      },
    },
    children: {
      control: { type: 'text' },
      description: 'テキストの内容',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'Sample Text' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Text>

// デフォルトのテキスト
export const Default: Story = {
  args: {
    $variant: 'medium',
    $color: 'black',
    children: 'Sample Text',
  },
}

// 小さいテキスト
export const Small: Story = {
  args: {
    $variant: 'small',
    $color: 'gray',
    children: 'Small Text',
  },
}

// 大きいテキスト
export const Large: Story = {
  args: {
    $variant: 'large',
    $color: 'blue',
    children: 'Large Text',
  },
}

// カスタムフォントサイズ
export const CustomFontSize: Story = {
  args: {
    $fontSize: '24px',
    $fontWeight: 'bold',
    $color: 'red',
    children: 'Custom Font Size',
  },
}
