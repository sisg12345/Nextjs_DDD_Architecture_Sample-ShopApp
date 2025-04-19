import { Meta, StoryObj } from '@storybook/react'
import InputImages from '@/components/molecules/Images/InputImages'

const meta: Meta<typeof InputImages> = {
  title: 'Molecules/Images/InputImages',
  component: InputImages,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    images: {
      control: { type: 'object' },
      description: 'アップロードされた画像のリスト',
      table: {
        type: { summary: 'FileData[]' },
        defaultValue: { summary: '[]' },
      },
    },
    maximumNumber: {
      control: { type: 'number' },
      description: '保持するファイルの最大数',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' },
      },
    },
    $width: {
      control: { type: 'number' },
      description: 'ドロップゾーンの横幅',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '300' },
      },
    },
    $height: {
      control: { type: 'number' },
      description: 'ドロップゾーンの縦幅',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '200' },
      },
    },
    $hasError: {
      control: { type: 'boolean' },
      description: 'バリデーションエラーフラグ',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onChange: {
      action: 'changed',
      description: '画像が変更されたときのイベントハンドラー',
      table: {
        type: { summary: '(images: FileData[]) => void' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof InputImages>

// デフォルトの画像入力
export const Default: Story = {
  args: {
    images: [],
    maximumNumber: 5,
    $width: 300,
    $height: 200,
    $hasError: false,
  },
}

// 画像が追加された状態
export const WithImages: Story = {
  args: {
    images: [
      { src: '/placeholder-125.png', file: undefined },
      { src: '/placeholder-125.png', file: undefined },
    ],
    maximumNumber: 2,
    $width: 300,
    $height: 200,
    $hasError: false,
  },
}

// エラー状態の画像入力
export const ErrorState: Story = {
  args: {
    images: [],
    maximumNumber: 5,
    $width: 300,
    $height: 200,
    $hasError: true,
  },
}
