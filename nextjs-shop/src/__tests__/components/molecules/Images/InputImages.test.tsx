import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import InputImages, { FileData } from '@/components/molecules/Images/InputImages'
import { theme } from '@/styles/themes'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('InputImages Component', () => {
  const mockOnChange = jest.fn()
  const mockImages: FileData[] = [
    { id: '1', src: '/image1.jpg', file: new File([''], 'image1.jpg') },
    { id: '2', src: '/image2.jpg', file: new File([''], 'image2.jpg') },
  ]

  beforeAll(() => {
    // `URL.revokeObjectURL`をモック
    global.URL.revokeObjectURL = jest.fn()
  })

  it('renders the dropzone when the maximum number of images is not reached', () => {
    renderWithTheme(
      <InputImages
        images={mockImages}
        maximumNumber={5}
        $width={300}
        $height={200}
        onChange={mockOnChange}
      />,
    )
    const dropzone = screen.getByTestId('dropzone')
    expect(dropzone).toBeInTheDocument()
  })

  it('does not render the dropzone when the maximum number of images is reached', () => {
    renderWithTheme(
      <InputImages
        images={mockImages}
        maximumNumber={2}
        $width={300}
        $height={200}
        onChange={mockOnChange}
      />,
    )
    const dropzone = screen.queryByTestId('dropzone')
    expect(dropzone?.parentElement).toHaveStyle('display: none')
  })

  it('renders image previews for each image', () => {
    renderWithTheme(
      <InputImages images={mockImages} $width={300} $height={200} onChange={mockOnChange} />,
    )
    const images = screen.getAllByRole('img', { name: 'Preview Image' })
    expect(images).toHaveLength(mockImages.length)
    expect(images[0]).toHaveAttribute(
      'src',
      expect.stringContaining(`/_next/image?url=%2F${mockImages[0].file?.name}`),
    )
    expect(images[1]).toHaveAttribute(
      'src',
      expect.stringContaining(`/_next/image?url=%2F${mockImages[1].file?.name}`),
    )
  })

  it('calls onChange when an image is removed', () => {
    renderWithTheme(
      <InputImages images={mockImages} $width={300} $height={200} onChange={mockOnChange} />,
    )
    const removeButtons = screen.getAllByRole('button')
    fireEvent.click(removeButtons[0])
    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(mockOnChange).toHaveBeenCalledWith([mockImages[1]])
  })

  it('calls onChange when files are dropped', () => {
    // `URL.createObjectURL`をモック
    global.URL.createObjectURL = jest.fn(() => 'mocked-url')
    global.URL.revokeObjectURL = jest.fn()

    const newFile = new File([''], 'newImage.jpg', { type: 'image/jpeg' })
    renderWithTheme(<InputImages images={[]} $width={300} $height={200} onChange={mockOnChange} />)
    const dropzone = screen.getByTestId('dropzone')
    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [newFile],
      },
    })
    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(mockOnChange).toHaveBeenCalledWith([{ file: newFile, src: expect.any(String) }])
  })
})
