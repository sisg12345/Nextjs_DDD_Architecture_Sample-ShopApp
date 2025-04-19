import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import ProductCardList from '@/components/organisms/Cards/ProductCardList'
import { theme } from '@/styles/themes'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('ProductCardList Component', () => {
  it('renders children correctly', () => {
    renderWithTheme(
      <ProductCardList>
        <div data-testid="product-card">Product 1</div>
        <div data-testid="product-card">Product 2</div>
      </ProductCardList>,
    )
    const productCards = screen.getAllByTestId('product-card')
    expect(productCards).toHaveLength(2)
    expect(productCards[0]).toHaveTextContent('Product 1')
    expect(productCards[1]).toHaveTextContent('Product 2')
  })
})
