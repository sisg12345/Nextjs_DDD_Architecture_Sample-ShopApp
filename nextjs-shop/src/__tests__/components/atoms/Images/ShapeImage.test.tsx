import { render, screen, waitFor } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import ShapeImage from '@/components/atoms/Images/ShapeImage'
import { theme } from '@/styles/themes'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('ShapeImage Component', () => {
  it('renders the image with the correct alt text', () => {
    renderWithTheme(
      <ShapeImage alt="Test Image" src="/placeholder-200.png" $width={200} $height={200} />,
    )
    const image = screen.getByAltText('Test Image')
    waitFor(() => {
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', '/placeholder-200.png')
    })
  })

  it('applies the circle shape when $variant is "circle"', () => {
    renderWithTheme(
      <ShapeImage
        $variant="circle"
        alt="Circle Image"
        src="/placeholder-200.png"
        $width={200}
        $height={200}
      />,
    )
    const image = screen.getByAltText('Circle Image')
    expect(image).toHaveStyle('border-radius: 50%')
  })

  it('applies the square shape when $variant is "square"', () => {
    renderWithTheme(
      <ShapeImage
        $variant="square"
        alt="Square Image"
        src="/placeholder-200.png"
        $width={200}
        $height={200}
      />,
    )
    const image = screen.getByAltText('Square Image')
    expect(image).toHaveStyle('border-radius: 0')
  })

  it('renders the image with the correct width and height', () => {
    renderWithTheme(
      <ShapeImage alt="Sized Image" src="/placeholder-200.png" $width={200} $height={200} />,
    )
    const image = screen.getByAltText('Sized Image')
    expect(image).toHaveAttribute('width', '200')
    expect(image).toHaveAttribute('height', '200')
  })
})
