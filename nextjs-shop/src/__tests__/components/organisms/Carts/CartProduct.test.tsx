import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import CartProduct from '@/components/organisms/Carts/CartProduct'
import { theme } from '@/styles/themes'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('CartProduct Component', () => {
  const mockProps = {
    id: 1,
    title: 'Test Product',
    price: 1000,
    imageUlr: '/test-image.jpg',
    onBuyButtonClick: jest.fn(),
    onRemoveButtonClick: jest.fn(),
  }

  it('renders product information correctly', () => {
    renderWithTheme(<CartProduct {...mockProps} />)

    const title = screen.getByText(mockProps.title)
    const price = screen.getByText(`${mockProps.price}円`)
    const image = screen.getByRole('img', { name: mockProps.title })

    expect(title).toBeInTheDocument()
    expect(price).toBeInTheDocument()
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining(`/_next/image?url=%2F${mockProps.imageUlr.replace('/', '')}`),
    )
  })

  it('calls onBuyButtonClick when the "購入" button is clicked', () => {
    renderWithTheme(<CartProduct {...mockProps} />)

    const buyButton = screen.getByRole('button', { name: '購入' })
    fireEvent.click(buyButton)

    expect(mockProps.onBuyButtonClick).toHaveBeenCalledTimes(1)
    expect(mockProps.onBuyButtonClick).toHaveBeenCalledWith(mockProps.id)
  })

  it('calls onRemoveButtonClick when the "削除" button is clicked', () => {
    renderWithTheme(<CartProduct {...mockProps} />)

    const removeButton = screen.getByRole('button', { name: '削除' })
    fireEvent.click(removeButton)

    expect(mockProps.onRemoveButtonClick).toHaveBeenCalledTimes(1)
    expect(mockProps.onRemoveButtonClick).toHaveBeenCalledWith(mockProps.id)
  })

  it('renders a link to the product detail page', () => {
    renderWithTheme(<CartProduct {...mockProps} />)

    const link = screen.getByRole('link', { name: mockProps.title })
    expect(link).toHaveAttribute('href', `/products/${mockProps.id}`)
  })
})
