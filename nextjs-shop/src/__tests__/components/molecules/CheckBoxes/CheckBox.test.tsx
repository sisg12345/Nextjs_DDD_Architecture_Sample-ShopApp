import { render, screen, fireEvent } from '@testing-library/react'
import CheckBox from '@/components/molecules/CheckBoxes/CheckBox'

describe('CheckBox Component', () => {
  it('renders the checkbox with the correct label', () => {
    render(<CheckBox id="test-checkbox" label="Test Label" />)
    const label = screen.getByText('Test Label')
    expect(label).toBeInTheDocument()
  })

  it('renders the checkbox in the unchecked state by default', () => {
    render(<CheckBox id="test-checkbox" />)
    // 未チェック状態のアイコン
    const checkboxIcon = screen.getByTestId('CheckBoxOutlineBlankIcon')
    expect(checkboxIcon).toBeInTheDocument()
  })

  it('renders the checkbox in the checked state when `checked` is true', () => {
    render(<CheckBox id="test-checkbox" checked={true} />)
    // チェック状態のアイコン
    const checkboxIcon = screen.getByTestId('CheckBoxIcon')
    expect(checkboxIcon).toBeInTheDocument()
  })

  it('toggles the checkbox state when clicked', () => {
    render(<CheckBox id="test-checkbox" />)
    // 初期状態は未チェック
    const checkboxIcon = screen.getByTestId('CheckBoxOutlineBlankIcon')
    // クリックイベントを発火
    fireEvent.click(checkboxIcon)
    // チェック状態に変化
    const checkedIcon = screen.getByTestId('CheckBoxIcon')
    expect(checkedIcon).toBeInTheDocument()
  })

  it('calls the `onChange` handler when the checkbox is clicked', async () => {
    const handleChange = jest.fn()
    render(<CheckBox id="test-checkbox" onChange={handleChange} />)
    const checkboxIcon = screen.getByTestId('CheckBoxOutlineBlankIcon')
    fireEvent.click(checkboxIcon)
    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
