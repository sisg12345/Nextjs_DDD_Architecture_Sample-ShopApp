import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import Button from '@/components/atoms/Buttons/Button'
import { theme } from '@/styles/themes'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Button Component', () => {
  it('renders the button with the correct text', () => {
    renderWithTheme(<Button $variant="primary">Click Me</Button>)
    const button = screen.getByText('Click Me')
    expect(button).toBeInTheDocument()
  })

  it('applies the correct styles for the primary variant', () => {
    renderWithTheme(<Button $variant="primary">Primary</Button>)
    const button = screen.getByText('Primary')
    expect(button).toHaveStyleRule('background-color', theme.colors.primary)
    expect(button).toHaveStyleRule('color', '#ffffff')
  })

  it('applies the correct styles for the secondary variant', () => {
    renderWithTheme(<Button $variant="secondary">Secondary</Button>)
    const button = screen.getByText('Secondary')
    expect(button).toHaveStyle(`background-color: ${theme.colors.secondary}`)
    expect(button).toHaveStyle('color: #ffffff')
  })

  it('applies the correct styles for the danger variant', () => {
    renderWithTheme(<Button $variant="danger">Danger</Button>)
    const button = screen.getByText('Danger')
    expect(button).toHaveStyle(`background-color: ${theme.colors.danger}`)
    expect(button).toHaveStyle('color: #ffffff')
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    renderWithTheme(<Button onClick={handleClick}>Click Me</Button>)
    const button = screen.getByText('Click Me')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies the disabled styles when the button is disabled', () => {
    renderWithTheme(<Button disabled>Disabled</Button>)
    const button = screen.getByText('Disabled')
    expect(button).toHaveStyle('opacity: 0.5')
    expect(button).toHaveAttribute('disabled')
  })

  it('applies custom styles', () => {
    renderWithTheme(
      <Button $backgroundColor="#ff0000" $color="#ffffff">
        Custom
      </Button>,
    )
    const button = screen.getByText('Custom')
    expect(button).toHaveStyle('background-color: #ff0000')
    expect(button).toHaveStyle('color: #ffffff')
  })
})
