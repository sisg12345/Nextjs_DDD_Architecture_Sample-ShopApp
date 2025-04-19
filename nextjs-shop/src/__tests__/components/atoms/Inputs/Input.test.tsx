import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import Input from '@/components/atoms/Inputs/Input'
import { theme } from '@/styles/themes'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Input Component', () => {
  it('renders the input element', () => {
    renderWithTheme(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
  })

  it('applies the correct styles when $hasError is true', () => {
    renderWithTheme(<Input $hasError={true} placeholder="Error Input" />)
    const input = screen.getByPlaceholderText('Error Input')
    expect(input).toHaveStyle(`border: 1px solid ${theme.colors.danger}`)
  })

  it('applies the correct styles when $hasBorder is false', () => {
    renderWithTheme(<Input $hasBorder={false} placeholder="No Border Input" />)
    const input = screen.getByPlaceholderText('No Border Input')
    expect(input).toHaveStyle('border: none')
  })

  it('applies readonly styles when input is read-only', () => {
    renderWithTheme(<Input readOnly placeholder="Read Only Input" />)
    const input = screen.getByPlaceholderText('Read Only Input')
    expect(input).toHaveStyle(`background-color: ${theme.colors.readonly}`)
    expect(input).toHaveAttribute('readOnly')
  })

  it('updates value on change', () => {
    renderWithTheme(<Input placeholder="Change Input" />)
    const input = screen.getByPlaceholderText('Change Input') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'New Value' } })
    expect(input.value).toBe('New Value')
  })
})
