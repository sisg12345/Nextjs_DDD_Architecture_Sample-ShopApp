import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import ProductCard from '@/components/organisms/Cards/ProductCard'
import { theme } from '@/styles/themes'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('ProductCard Component', () => {
  const mockProps = {
    title: 'Test Product',
    price: 1000,
    imageUrl: '/test-image.jpg',
    blurDataUrl: 'data:image/png;base64,blur-placeholder',
  }

  it('renders correctly with the "small" variant', () => {
    renderWithTheme(<ProductCard {...mockProps} $variant="small" />)
    const title = screen.getByText(mockProps.title)
    const price = screen.getByText(`${mockProps.price}円`)
    const image = screen.getByRole('img', { name: mockProps.title })

    expect(title).toBeInTheDocument()
    expect(price).toBeInTheDocument()
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining(`/_next/image?url=%2F${mockProps.imageUrl.replace('/', '')}`),
    )
  })

  it('renders correctly with the "listing" variant', () => {
    renderWithTheme(<ProductCard {...mockProps} $variant="listing" />)
    const title = screen.getByText(mockProps.title)
    const price = screen.getByText(`${mockProps.price}円`)
    const image = screen.getByRole('img', { name: mockProps.title })

    expect(title).toBeInTheDocument()
    expect(price).toBeInTheDocument()
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining(`/_next/image?url=%2F${mockProps.imageUrl.replace('/', '')}`),
    )
  })

  it('renders correctly with the "detail" variant', () => {
    renderWithTheme(<ProductCard {...mockProps} $variant="detail" />)
    const title = screen.getByText(mockProps.title)
    const price = screen.getByText(`${mockProps.price}円`)
    const image = screen.getByRole('img', { name: mockProps.title })

    expect(title).toBeInTheDocument()
    expect(price).toBeInTheDocument()
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining(`/_next/image?url=%2F${mockProps.imageUrl.replace('/', '')}`),
    )
  })
})
