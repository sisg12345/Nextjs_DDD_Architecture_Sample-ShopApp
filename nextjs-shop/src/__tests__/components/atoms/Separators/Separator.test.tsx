import { render, screen } from '@testing-library/react'
import Separator from '@/components/atoms/Separators/Separator'

describe('Separator Component', () => {
  it('renders the separator element', () => {
    render(<Separator />)
    const separator = screen.getByRole('separator', { hidden: true })
    expect(separator).toBeInTheDocument()
  })

  it('applies the correct styles to the separator', () => {
    render(<Separator />)
    const separator = screen.getByRole('separator', { hidden: true })

    // セパレーターのスタイルを確認
    expect(separator).toHaveStyle('height: 22px')
    expect(separator).toHaveStyle('color: #e5e7eb')
    expect(separator).toHaveStyle('display: flex')
    expect(separator).toHaveStyle('align-items: center')

    // ::beforeと::afterのスタイルを確認
    expect(separator).toHaveStyleRule('content', "''", {
      modifier: '::before',
    })
    expect(separator).toHaveStyleRule('content', "''", {
      modifier: '::after',
    })
    expect(separator).toHaveStyleRule('flex', '1', {
      modifier: '::before',
    })
    expect(separator).toHaveStyleRule('flex', '1', {
      modifier: '::after',
    })
    expect(separator).toHaveStyleRule('border-bottom', '1px solid #e5e7eb', {
      modifier: '::before',
    })
    expect(separator).toHaveStyleRule('border-bottom', '1px solid #e5e7eb', {
      modifier: '::after',
    })
  })
})
