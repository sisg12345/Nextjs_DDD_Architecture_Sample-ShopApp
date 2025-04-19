import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import ProductCarousel from '@/components/organisms/Carousels/ProductCarousel'
import { theme } from '@/styles/themes'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('ProductCarousel Component', () => {
  it('renders children correctly', () => {
    renderWithTheme(
      <ProductCarousel>
        <div data-testid="carousel-item">Item 1</div>
        <div data-testid="carousel-item">Item 2</div>
      </ProductCarousel>,
    )
    const items = screen.getAllByTestId('carousel-item')
    expect(items).toHaveLength(2)
    expect(items[0]).toHaveTextContent('Item 1')
    expect(items[1]).toHaveTextContent('Item 2')
  })
})
