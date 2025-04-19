import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { ShoppingCartIcon, SearchIcon } from '@/components/atoms/Buttons/IconButton'
import { theme } from '@/styles/themes'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('IconButton Component', () => {
  it('renders the ShoppingCartIcon with the correct size and color', () => {
    renderWithTheme(<ShoppingCartIcon $size={32} $color="primary" />)
    const icon = screen.getByTestId('ShoppingCartIcon')
    expect(icon.parentElement).toHaveStyle(`font-size: 32px`)
    expect(icon.parentElement).toHaveStyle(`color: ${theme.colors.primary}`)
  })

  it('renders the SearchIcon with a custom background color', () => {
    renderWithTheme(<SearchIcon $backgroundColor="#ff0000" />)
    const icon = screen.getByTestId('SearchIcon')
    expect(icon.parentElement).toHaveStyle('background-color: #ff0000')
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    renderWithTheme(<ShoppingCartIcon onClick={handleClick} />)
    const icon = screen.getByTestId('ShoppingCartIcon')
    fireEvent.click(icon)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies default cursor when no onClick handler is provided', () => {
    renderWithTheme(<SearchIcon />)
    const icon = screen.getByTestId('SearchIcon')
    expect(icon.parentElement).toHaveStyle('cursor: pointer')
  })

  it('applies custom size and color', () => {
    renderWithTheme(<ShoppingCartIcon $size={48} $color="secondary" />)
    const icon = screen.getByTestId('ShoppingCartIcon')
    expect(icon.parentElement).toHaveStyle('font-size: 48px')
    expect(icon.parentElement).toHaveStyle(`color: ${theme.colors.secondary}`)
  })
})
