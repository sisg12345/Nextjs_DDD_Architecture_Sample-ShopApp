import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import Dropzone, { FileType } from '@/components/molecules/Dropzones/Dropzone'
import { theme } from '@/styles/themes'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Dropzone Component', () => {
  beforeEach(() => {
    // `window.alert`をモック
    window.alert = jest.fn()
  })

  it('renders the dropzone with the correct label', () => {
    renderWithTheme(<Dropzone $width={300} $height={200} />)
    const label = screen.getByText('デバイスからアップロード')
    expect(label).toBeInTheDocument()
  })

  it('applies the correct styles when focused', () => {
    renderWithTheme(<Dropzone $width={300} $height={200} />)
    const dropzone = screen.getByTestId('dropzone')

    // ドラッグエンターイベントを発火
    fireEvent.dragEnter(dropzone)
    expect(dropzone).toHaveStyle(`border: 1px dashed ${theme.colors.black}`)

    // ドラッグリーブイベントを発火
    fireEvent.dragLeave(dropzone)
    expect(dropzone).toHaveStyle(`border: 1px dashed ${theme.colors.border}`)
  })

  it('applies error styles when $hasError is true', () => {
    renderWithTheme(<Dropzone $width={300} $height={200} $hasError={true} />)
    const dropzone = screen.getByTestId('dropzone')
    expect(dropzone).toHaveStyle(`border: 1px dashed ${theme.colors.danger}`)
  })

  it('calls onDrop when files are dropped', () => {
    const handleDrop = jest.fn()
    renderWithTheme(<Dropzone $width={300} $height={200} onDrop={handleDrop} />)
    const dropzone = screen.getByTestId('dropzone')

    // ドロップイベントを発火
    const files = [new File(['file1'], 'file1.png', { type: 'image/png' })]
    fireEvent.drop(dropzone, {
      dataTransfer: {
        files,
      },
    })

    expect(handleDrop).toHaveBeenCalledTimes(1)
    expect(handleDrop).toHaveBeenCalledWith(files)
  })

  it('calls onChange when files are selected via file input', () => {
    const handleChange = jest.fn()
    renderWithTheme(<Dropzone $width={300} $height={200} onChange={handleChange} />)
    const input = screen.getByTestId('file-input')

    // チェンジイベントを発火
    const files = [new File(['file1'], 'file1.png', { type: 'image/png' })]
    fireEvent.change(input, {
      target: { files },
    })

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(files)
  })

  it('does not accept files with unsupported types', () => {
    const acceptedFileTypes: FileType[] = ['image/png', 'image/jpeg']
    const handleDrop = jest.fn()
    renderWithTheme(
      <Dropzone
        $width={300}
        $height={200}
        onDrop={handleDrop}
        acceptedFileTypes={acceptedFileTypes}
      />,
    )
    const dropzone = screen.getByTestId('dropzone')

    // ドロップイベントを発火
    const files = [new File(['file1'], 'file1.txt', { type: 'text/plain' })]
    fireEvent.drop(dropzone, {
      dataTransfer: {
        files,
      },
    })

    // `window.alert`が呼び出されることを確認
    expect(window.alert).toHaveBeenCalledWith(
      `次のファイルフォーマットは指定できません${acceptedFileTypes.join(' ,')})`,
    )
  })
})
