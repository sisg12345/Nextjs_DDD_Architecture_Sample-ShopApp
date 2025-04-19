import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from 'styled-components'
import ScaleImage from '@/components/atoms/Images/ScaleImage'
import { theme } from '@/styles/themes'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('ScaleImage Component', () => {
  it('renders the image with the correct alt text', async () => {
    renderWithTheme(<ScaleImage alt="Placeholder Image" src="/placeholder-200.png" />)
    const image = screen.getByAltText('Placeholder Image')
    await waitFor(() => {
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute(
        'src',
        expect.stringContaining('/_next/image?url=%2Fplaceholder-200.png'),
      )
    })
  })

  it('applies the correct container dimensions', () => {
    renderWithTheme(
      <ScaleImage
        $containerWidth={200}
        $containerHeight={200}
        alt="Placeholder Image"
        src="/placeholder-200.png"
      />,
    )
    const container = screen.getByAltText('Placeholder Image').parentElement
    expect(container).toHaveStyle('width: 200px')
    expect(container).toHaveStyle('height: 200px')
  })

  it('applies hover scale effect', async () => {
    renderWithTheme(<ScaleImage alt="Hover Effect" src="/placeholder-200.png" />)
    const image = screen.getByAltText('Hover Effect')
    await userEvent.hover(image)
    await waitFor(() => {
      expect(image).toHaveStyleRule('transform', 'scale(1.1)', {
        modifier: ':hover',
      })
    })
  })

  it('renders the image with the correct width and height', async () => {
    renderWithTheme(
      <ScaleImage $width={200} $height={200} alt="Sized Image" src="/placeholder-200.png" />,
    )
    const image = screen.getByAltText('Sized Image')
    await waitFor(() => {
      expect(image).toHaveAttribute('width', '200')
      expect(image).toHaveAttribute('height', '200')
    })
  })
})
