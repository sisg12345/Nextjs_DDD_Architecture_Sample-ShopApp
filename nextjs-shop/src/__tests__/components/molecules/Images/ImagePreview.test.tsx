import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import ImagePreview from '@/components/molecules/Images/ImagePreview'
import { theme } from '@/styles/themes'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('ImagePreview Component', () => {
  const mockSrc = '/placeholder-200.png'
  const mockSrcName = 'placeholder-200.png'
  const mockAlt = 'Test Image'
  const mockOnRemove = jest.fn()

  it('renders the image with the correct src and alt attributes', () => {
    renderWithTheme(<ImagePreview src={mockSrc} alt={mockAlt} $width={100} $height={100} />)
    const image = screen.getByRole('img', { name: mockAlt })
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining(`/_next/image?url=%2F${mockSrcName}`),
    )
    expect(image).toHaveAttribute('alt', mockAlt)
  })

  it('renders the close button', () => {
    renderWithTheme(<ImagePreview src={mockSrc} alt={mockAlt} $width={100} $height={100} />)
    const closeButton = screen.getByRole('button')
    expect(closeButton).toBeInTheDocument()
  })

  it('calls the onRemove handler when the close button is clicked', () => {
    renderWithTheme(
      <ImagePreview
        src={mockSrc}
        alt={mockAlt}
        $width={100}
        $height={100}
        onRemove={mockOnRemove}
      />,
    )
    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)
    expect(mockOnRemove).toHaveBeenCalledTimes(1)
    expect(mockOnRemove).toHaveBeenCalledWith(mockSrc)
  })

  it('does not call onRemove if the close button is clicked but no handler is provided', () => {
    renderWithTheme(<ImagePreview src={mockSrc} alt={mockAlt} $width={100} $height={100} />)
    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)
    expect(mockOnRemove).not.toHaveBeenCalled()
  })
})
