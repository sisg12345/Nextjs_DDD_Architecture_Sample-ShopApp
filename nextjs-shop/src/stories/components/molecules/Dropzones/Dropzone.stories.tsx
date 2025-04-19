import { Meta, StoryObj } from '@storybook/react'
import Dropzone from '@/components/molecules/Dropzones/Dropzone'

const meta: Meta<typeof Dropzone> = {
  title: 'Molecules/Dropzones/Dropzone',
  component: Dropzone,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    $width: {
      control: { type: 'number' },
      description: 'ドロップゾーンの横幅',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: '300' },
      },
    },
    $height: {
      control: { type: 'number' },
      description: 'ドロップゾーンの縦幅',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: '150' },
      },
    },
    $hasError: {
      control: { type: 'boolean' },
      description: 'エラーフラグ',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    acceptedFileTypes: {
      control: { type: 'object' },
      description: '許可されるファイルタイプ',
      table: {
        type: { summary: 'FileType[]' },
        defaultValue: { summary: "['image/png', 'image/jpeg', 'image/jpg']" },
      },
    },
    onChange: {
      action: 'changed',
      description: 'ファイルが変更されたときのイベントハンドラー',
      table: {
        type: { summary: '(files: File[]) => void' },
      },
    },
    onDrop: {
      action: 'dropped',
      description: 'ファイルがドロップされたときのイベントハンドラー',
      table: {
        type: { summary: '(files: File[]) => void' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Dropzone>

// デフォルトのドロップゾーン
export const Default: Story = {
  args: {
    $width: 300,
    $height: 150,
    $hasError: false,
    acceptedFileTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
  },
}

// エラー状態のドロップゾーン
export const ErrorState: Story = {
  args: {
    $width: 300,
    $height: 150,
    $hasError: true,
    acceptedFileTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
  },
}

// カスタムサイズのドロップゾーン
export const CustomSize: Story = {
  args: {
    $width: 400,
    $height: 200,
    $hasError: false,
    acceptedFileTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
  },
}

// カスタムファイルタイプのドロップゾーン
export const CustomFileTypes: Story = {
  args: {
    $width: 300,
    $height: 150,
    $hasError: false,
    acceptedFileTypes: ['application/pdf', 'video/mp4'],
  },
}
