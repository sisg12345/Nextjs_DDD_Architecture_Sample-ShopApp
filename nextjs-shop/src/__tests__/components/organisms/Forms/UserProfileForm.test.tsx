import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import UserProfileForm from '@/components/organisms/Forms/UserProfileForm'
import { theme } from '@/styles/themes'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('UserProfileForm Component', () => {
  const mockOnSave = jest.fn()

  it('renders all form fields correctly', () => {
    renderWithTheme(<UserProfileForm userProfile={null} onSave={mockOnSave} />)

    expect(screen.getByText('ユーザープロフィール画像')).toBeInTheDocument()
    expect(screen.getByText('メールアドレス')).toBeInTheDocument()
    expect(screen.getByText('ユーザー名')).toBeInTheDocument()
    expect(screen.getByText('ユーザー表示名')).toBeInTheDocument()
    expect(screen.getByText('概要')).toBeInTheDocument()
    expect(screen.getByText('新パスワード')).toBeInTheDocument()
    expect(screen.getByText('新確認パスワード')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '更新' })).toBeInTheDocument()
  })

  it('shows validation errors when required fields are empty', async () => {
    renderWithTheme(<UserProfileForm userProfile={null} onSave={mockOnSave} />)

    const submitButton = screen.getByRole('button', { name: '更新' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('メールアドレスは必須です')).toBeInTheDocument()
    })
  })
})
