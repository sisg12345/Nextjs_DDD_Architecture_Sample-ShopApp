import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import SigninForm from '@/components/organisms/Forms/SigninForm'
import { theme } from '@/styles/themes'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('SigninForm Component', () => {
  const mockOnSignin = jest.fn()

  it('renders all form fields correctly', () => {
    renderWithTheme(<SigninForm onSignin={mockOnSignin} />)

    expect(screen.getByPlaceholderText('メールアドレス')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('パスワード')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'サインイン' })).toBeInTheDocument()
  })

  it('shows validation errors when required fields are empty', async () => {
    renderWithTheme(<SigninForm onSignin={mockOnSignin} />)

    const submitButton = screen.getByRole('button', { name: 'サインイン' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('メールアドレスは必須です')).toBeInTheDocument()
      expect(screen.getByText('パスワードは6文字以上のみ入力できます')).toBeInTheDocument()
    })
  })

  it('calls onSignin with correct data when the form is submitted', async () => {
    renderWithTheme(<SigninForm onSignin={mockOnSignin} />)

    fireEvent.change(screen.getByPlaceholderText('メールアドレス'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('パスワード'), {
      target: { value: 'password123' },
    })

    const submitButton = screen.getByRole('button', { name: 'サインイン' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockOnSignin).toHaveBeenCalledTimes(1)
      expect(mockOnSignin).toHaveBeenCalledWith(undefined, {
        email: 'test@example.com',
        password: 'password123',
      })
    })
  })

  it('displays an error message when onSignin fails', async () => {
    const mockOnSigninWithError = jest.fn(() => Promise.resolve('サインインに失敗しました'))
    renderWithTheme(<SigninForm onSignin={mockOnSigninWithError} />)

    fireEvent.change(screen.getByPlaceholderText('メールアドレス'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('パスワード'), {
      target: { value: 'password123' },
    })

    const submitButton = screen.getByRole('button', { name: 'サインイン' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('サインインに失敗しました')).toBeInTheDocument()
    })
  })
})
