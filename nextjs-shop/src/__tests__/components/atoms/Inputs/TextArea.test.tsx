import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import TextArea from '@/components/atoms/Inputs/TextArea'
import { theme } from '@/styles/themes'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('TextArea Component', () => {
  it('renders the textarea with the correct placeholder', () => {
    renderWithTheme(<TextArea placeholder="Enter text" />)
    const textarea = screen.getByPlaceholderText('Enter text')
    expect(textarea).toBeInTheDocument()
  })

  it('applies the correct styles when $hasError is true', () => {
    renderWithTheme(<TextArea $hasError={true} placeholder="Error TextArea" />)
    const textarea = screen.getByPlaceholderText('Error TextArea')
    expect(textarea).toHaveStyle(`border: 1px solid ${theme.colors.danger}`)
  })

  it('updates the row count dynamically based on input', async () => {
    renderWithTheme(<TextArea placeholder="Dynamic Rows" minRows={2} maxRows={5} />)
    const textarea = screen.getByPlaceholderText('Dynamic Rows') as HTMLTextAreaElement

    // Simulate input that increases the row count
    fireEvent.change(textarea, { target: { value: 'Line 1\nLine 2\nLine 3' } })
    await waitFor(() => {
      expect(textarea.rows).toBe(2)
    })

    // Simulate input that exceeds maxRows
    fireEvent.change(textarea, {
      target: { value: 'Line 1\nLine 2\nLine 3\nLine 4\nLine 5\nLine 6' },
    })
    await waitFor(() => {
      expect(textarea.rows).toBe(2)
    })
  })

  it('calls onChange handler when input changes', async () => {
    const handleChange = jest.fn()
    renderWithTheme(<TextArea placeholder="Change Event" onChange={handleChange} />)
    const textarea = screen.getByPlaceholderText('Change Event')

    fireEvent.change(textarea, { target: { value: 'New Value' } })
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledTimes(1)
    })
  })

  it('throws an error if minRows is greater than rows', () => {
    expect(() => {
      renderWithTheme(<TextArea rows={2} minRows={3} />)
    }).toThrow('TextArea: props value rows should be greater than minRows.')
  })
})
