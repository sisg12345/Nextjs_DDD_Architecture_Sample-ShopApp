import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import MessageBar from '@/components/atoms/Bars/MessageBar'
import { theme } from '@/styles/themes'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('MessageBar Component', () => {
  it('renders the message with the correct text', () => {
    renderWithTheme(<MessageBar>Success Message</MessageBar>)
    const message = screen.getByText('Success Message')
    expect(message).toBeInTheDocument()
  })

  it('applies the primary color when $success is true', () => {
    renderWithTheme(<MessageBar $success={true}>Success Message</MessageBar>)
    const message = screen.getByText('Success Message')
    expect(message).toHaveStyle(`color: ${theme.colors.primary}`)
  })

  it('applies the danger color when $success is false', () => {
    renderWithTheme(<MessageBar $success={false}>Error Message</MessageBar>)
    const message = screen.getByText('Error Message')
    expect(message).toHaveStyle(`color: ${theme.colors.danger}`)
  })

  it('renders with default success color when $success is not provided', () => {
    renderWithTheme(<MessageBar>Default Success Message</MessageBar>)
    const message = screen.getByText('Default Success Message')
    expect(message).toHaveStyle(`color: ${theme.colors.primary}`)
  })
})
