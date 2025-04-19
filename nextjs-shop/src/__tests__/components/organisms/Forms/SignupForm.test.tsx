import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import SignupForm from '@/components/organisms/Forms/SignupForm'
import { theme } from '@/styles/themes'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('SignupForm Component', () => {
  const mockOnSignup = jest.fn()

  it('renders all form fields correctly', () => {
    renderWithTheme(<SignupForm onSignup={mockOnSignup} />)

    expect(screen.getByPlaceholderText('メールアドレス')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('パスワード')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('確認パスワード')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'サインアップ' })).toBeInTheDocument()
  })

  it('shows validation errors when required fields are empty', async () => {
    renderWithTheme(<SignupForm onSignup={mockOnSignup} />)

    const submitButton = screen.getByRole('button', { name: 'サインアップ' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('メールアドレスは必須です')).toBeInTheDocument()
      expect(screen.getByText('パスワードは6文字以上のみ入力できます')).toBeInTheDocument()
      expect(screen.getByText('確認パスワードは6文字以上のみ入力できます')).toBeInTheDocument()
    })
  })

  it('shows validation errors when passwords do not match', async () => {
    renderWithTheme(<SignupForm onSignup={mockOnSignup} />)

    fireEvent.change(screen.getByPlaceholderText('メールアドレス'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('パスワード'), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByPlaceholderText('確認パスワード'), {
      target: { value: 'password456' },
    })

    const submitButton = screen.getByRole('button', { name: 'サインアップ' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('パスワードと同じ文字の入力が必要です')).toBeInTheDocument()
    })
  })

  it('calls onSignup with correct data when the form is submitted', async () => {
    renderWithTheme(<SignupForm onSignup={mockOnSignup} />)

    fireEvent.change(screen.getByPlaceholderText('メールアドレス'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('パスワード'), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByPlaceholderText('確認パスワード'), {
      target: { value: 'password123' },
    })

    const submitButton = screen.getByRole('button', { name: 'サインアップ' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockOnSignup).toHaveBeenCalledTimes(1)
      expect(mockOnSignup).toHaveBeenCalledWith(undefined, {
        email: 'test@example.com',
        password: 'password123',
        passwordConfirm: 'password123',
      })
    })
  })

  it('displays an error message when onSignup fails', async () => {
    const mockOnSignupWithError = jest.fn(() =>
      Promise.resolve({ success: false, message: 'サインアップに失敗しました' }),
    )
    renderWithTheme(<SignupForm onSignup={mockOnSignupWithError} />)

    fireEvent.change(screen.getByPlaceholderText('メールアドレス'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('パスワード'), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByPlaceholderText('確認パスワード'), {
      target: { value: 'password123' },
    })

    const submitButton = screen.getByRole('button', { name: 'サインアップ' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('サインアップに失敗しました')).toBeInTheDocument()
    })
  })
})
