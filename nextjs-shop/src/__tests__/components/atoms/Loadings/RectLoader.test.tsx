import { render, screen } from '@testing-library/react'
import RectLoader from '@/components/atoms/Loadings/RectLoader'

describe('RectLoader Component', () => {
  it('renders the loader with the correct dimensions', () => {
    render(<RectLoader $width={200} $height={100} />)
    const svgElement = screen.getByTestId('rect-loader')
    expect(svgElement).toBeInTheDocument()
    expect(svgElement).toHaveAttribute('width', '200')
    expect(svgElement).toHaveAttribute('height', '100')
  })
})
