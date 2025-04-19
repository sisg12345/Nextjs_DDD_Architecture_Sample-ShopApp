import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import Dropdown from '@/components/molecules/Dropdowns/Dropdown'
import { theme } from '@/styles/themes'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Dropdown Component', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]

  it('renders the placeholder when no value is selected', () => {
    renderWithTheme(<Dropdown options={options} placeholder="Select an option" />)
    const placeholder = screen.getByText('Select an option')
    expect(placeholder).toBeInTheDocument()
  })

  it('renders the selected value when a value is provided', () => {
    renderWithTheme(<Dropdown options={options} value="option2" />)
    const selectedValue = screen.getByText('Option 2')
    expect(selectedValue).toBeInTheDocument()
  })

  it('toggles the dropdown menu when clicked', () => {
    renderWithTheme(<Dropdown options={options} placeholder="Select an option" />)
    const control = screen.getByTestId('dropdown-control')

    // ドロップダウンメニューが閉じていることを確認
    expect(screen.queryByTestId('dropdown-option')).not.toBeInTheDocument()

    // ドロップダウンメニューを開く
    fireEvent.mouseDown(control)
    expect(screen.getAllByTestId('dropdown-option')).toHaveLength(options.length)

    // ドロップダウンメニューを閉じる
    fireEvent.mouseDown(control)
    expect(screen.queryByTestId('dropdown-option')).not.toBeInTheDocument()
  })

  it('calls onChange when an option is selected', () => {
    const handleChange = jest.fn()
    renderWithTheme(
      <Dropdown options={options} placeholder="Select an option" onChange={handleChange} />,
    )
    const control = screen.getByTestId('dropdown-control')

    // ドロップダウンメニューを開く
    fireEvent.mouseDown(control)

    // オプションを選択
    const option = screen.getByText('Option 1')
    fireEvent.mouseDown(option)

    // onChangeが呼び出されることを確認
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(options[0])
  })

  it('applies error styles when $hasError is true', () => {
    renderWithTheme(<Dropdown options={options} placeholder="Select an option" $hasError={true} />)
    const control = screen.getByTestId('dropdown-control')
    expect(control).toHaveStyle(`border: 1px solid ${theme.colors.danger}`)
  })
})
