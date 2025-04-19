import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import Footer from '@/components/organisms/Footers/Footer'
import { theme } from '@/styles/themes'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Footer Component', () => {
  it('renders all navigation links correctly', () => {
    renderWithTheme(<Footer />)

    const links = ['トップ', '採用', 'お知らせ', '利用規約', 'プライバシーポリシー', '配送と返品']

    links.forEach((linkText) => {
      const link = screen.getByRole('link', { name: linkText })
      expect(link).toBeInTheDocument()
    })
  })

  it('renders the GitHub icon with the correct link', () => {
    renderWithTheme(<Footer />)

    const githubLink = screen.getByTestId('github-link')
    expect(githubLink).toBeInTheDocument()
    expect(githubLink).toHaveAttribute('href', 'https://github.com/sisg12345')
    expect(githubLink).toHaveAttribute('target', '_blank')
  })

  it('renders the copyright text', () => {
    renderWithTheme(<Footer />)

    const copyrightText = screen.getByText('© 2025 S.S. All rights reserved.')
    expect(copyrightText).toBeInTheDocument()
  })
})
