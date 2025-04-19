import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import Breadcrumb from '@/components/molecules/Breadcrumbs/Breadcrumb'
import { theme } from '@/styles/themes'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Breadcrumb Component', () => {
  const breadcrumbsInfo = [
    { href: '/home', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  it('renders the breadcrumb list', () => {
    renderWithTheme(<Breadcrumb breadcrumbsInfo={breadcrumbsInfo} />)
    const breadcrumbList = screen.getByRole('navigation')
    expect(breadcrumbList).toBeInTheDocument()
  })

  it('renders all breadcrumb items', () => {
    renderWithTheme(<Breadcrumb breadcrumbsInfo={breadcrumbsInfo} />)
    const breadcrumbItems = screen.getAllByRole('listitem')
    expect(breadcrumbItems).toHaveLength(breadcrumbsInfo.length)
  })

  it('renders breadcrumb links with correct href and text', () => {
    renderWithTheme(<Breadcrumb breadcrumbsInfo={breadcrumbsInfo} />)
    breadcrumbsInfo.forEach(({ href, label }) => {
      const link = screen.getByRole('link', { name: label })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', href)
    })
  })
})
