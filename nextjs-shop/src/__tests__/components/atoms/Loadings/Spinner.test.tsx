import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import Spinner from '@/components/atoms/Loadings/Spinner'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={{}}>{ui}</ThemeProvider>)
}

describe('Spinner Component', () => {
  it('renders the spinner with the correct size', () => {
    renderWithTheme(<Spinner $size={100} />)
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveAttribute('viewBox', '0 0 100 100')
    expect(spinner).toHaveStyle('width: 100px')
    expect(spinner).toHaveStyle('height: 100px')
  })

  it('applies auto-centering styles when $isAutoCentering is true', () => {
    renderWithTheme(<Spinner $size={50} $isAutoCentering={true} />)
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveStyle('margin: -25px 0 0 -25px') // $size / 2
  })

  it('renders the spinner with the correct stroke width', () => {
    renderWithTheme(<Spinner $strokeWidth={8} $size={50} />)
    const circle = screen.getByTestId('spinner').querySelector('circle')
    expect(circle).toHaveAttribute('stroke-width', '8')
  })

  it('applies rotation animation', () => {
    renderWithTheme(<Spinner $size={50} />)
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveStyleRule('animation', 'rotate 2s linear infinite')
  })
})
