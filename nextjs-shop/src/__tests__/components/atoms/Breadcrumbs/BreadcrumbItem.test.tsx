import { userEvent } from '@storybook/test'
import { act, render, screen, waitFor } from '@testing-library/react'
import Link from 'next/link'
import { ThemeProvider } from 'styled-components'
import BreadcrumbItem from '@/components/atoms/Breadcrumbs/BreadcrumbItem'
import { theme } from '@/styles/themes'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('BreadcrumbItem Component', () => {
  it('renders the breadcrumb item with the correct text', () => {
    renderWithTheme(
      <BreadcrumbItem>
        <Link href="/home">Home</Link>
      </BreadcrumbItem>,
    )
    const link = screen.getByText('Home')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/home')
  })

  it('applies hover styles to the link', async () => {
    renderWithTheme(
      <BreadcrumbItem>
        <Link href="/home">Home</Link>
      </BreadcrumbItem>,
    )
    const link = screen.getByText('Home')
    // NOTE: テストは通るがエラーメッセージが出るため、回避策としてuserEventをactで囲んでいる
    act(() => {
      userEvent.hover(link)
    })
    await waitFor(() => {
      expect(link).toHaveStyle(`color: ${theme.colors.gray}`)
      expect(link).toHaveStyle('text-decoration: underline')
    })
  })
})
