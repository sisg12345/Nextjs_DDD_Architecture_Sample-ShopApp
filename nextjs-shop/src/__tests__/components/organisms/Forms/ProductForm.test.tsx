import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import ProductForm from '@/components/organisms/Forms/ProductForm'
import { theme } from '@/styles/themes'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('ProductForm Component', () => {
  const mockOnSave = jest.fn()

  it('renders all form fields correctly', () => {
    renderWithTheme(<ProductForm onSave={mockOnSave} />)
    expect(screen.getByText('商品の写真')).toBeInTheDocument()
    expect(screen.getByText('タイトル')).toBeInTheDocument()
    expect(screen.getByText('概要')).toBeInTheDocument()
    expect(screen.getByText('カテゴリー')).toBeInTheDocument()
    expect(screen.getByText('商品の状態')).toBeInTheDocument()
    expect(screen.getByText('価格 (円)')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '出品' })).toBeInTheDocument()
  })

  it('shows validation errors when required fields are empty', async () => {
    renderWithTheme(<ProductForm onSave={mockOnSave} />)

    const submitButton = screen.getByRole('button', { name: '出品' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('写真のアップロードは必須です')).toBeInTheDocument()
      expect(screen.getByText('タイトルは必須です')).toBeInTheDocument()
      expect(screen.getByText('概要は必須です')).toBeInTheDocument()
      expect(screen.getByText('カテゴリーの選択は必須です')).toBeInTheDocument()
      expect(screen.getByText('商品状態の選択は必須です')).toBeInTheDocument()
      expect(screen.getByText('価格は必須です')).toBeInTheDocument()
    })
  })
})
