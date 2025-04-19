import { render, screen } from '@testing-library/react'
import Badge from '@/components/atoms/Badges/Badge'
import { theme } from '@/styles/themes'

describe('Badge Component', () => {
  it('renders the badge with the correct content', () => {
    render(<Badge content={5} $backgroundColor="primary" />)
    const badgeText = screen.getByText('5')
    expect(badgeText).toBeInTheDocument()
  })

  it('applies the correct background color from the theme', () => {
    render(<Badge content={10} $backgroundColor="primary" />)
    const badgeWrapper = screen.getByText('10').parentElement
    expect(badgeWrapper).toHaveStyle(`background-color: ${theme.colors.primary}`)
  })

  it('applies a custom background color', () => {
    render(<Badge content={15} $backgroundColor="#ff0000" />)
    const badgeWrapper = screen.getByText('15').parentElement
    expect(badgeWrapper).toHaveStyle('background-color: #ff0000')
  })

  it('renders the badge with a minimum width and height of 20px', () => {
    render(<Badge content={20} $backgroundColor="secondary" />)
    const badgeWrapper = screen.getByText('20').parentElement
    expect(badgeWrapper).toHaveStyle('min-width: 20px')
    expect(badgeWrapper).toHaveStyle('height: 20px')
  })
})
