import { render, screen } from '@testing-library/react'
import AppLogo from '@/components/atoms/Logos/AppLogo'

describe('AppLogo Component', () => {
  it('renders the logo element', () => {
    render(<AppLogo />)
    const svgElement = screen.getByTestId('app-logo')
    expect(svgElement).toBeInTheDocument()
  })
})
