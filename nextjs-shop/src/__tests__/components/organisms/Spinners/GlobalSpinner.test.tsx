import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import GlobalSpinner from '@/components/organisms/Spinners/GlobalSpinner'
import { GlobalSpinnerContext } from '@/contexts/GlobalSpinnerActionsContext'
import { theme } from '@/styles/themes'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('GlobalSpinner Component', () => {
  it('renders the spinner when isGlobalSpinnerOn is true', () => {
    renderWithTheme(
      <GlobalSpinnerContext value={true}>
        <GlobalSpinner />,
      </GlobalSpinnerContext>,
    )

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  it('does not render the spinner when isGlobalSpinnerOn is false', () => {
    renderWithTheme(<GlobalSpinner />)

    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
  })
})
