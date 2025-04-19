import { render, screen, fireEvent } from '@testing-library/react'
import FilterGroup from '@/components/molecules/Filters/FilterGroup'

describe('FilterGroup Component', () => {
  const items = [
    { label: 'Option 1', name: 'option1' },
    { label: 'Option 2', name: 'option2' },
    { label: 'Option 3', name: 'option3' },
  ]

  it('renders the title correctly', () => {
    render(<FilterGroup title="Test Title" items={items} />)
    const title = screen.getByText('Test Title')
    expect(title).toBeInTheDocument()
  })

  it('renders all checkboxes with correct labels', () => {
    render(<FilterGroup title="Test Title" items={items} />)
    items.forEach(({ label }) => {
      const checkboxLabel = screen.getByText(label)
      expect(checkboxLabel).toBeInTheDocument()
    })
  })

  it('renders checkboxes with the correct initial state', () => {
    const { container } = render(
      <FilterGroup title="Test Title" items={items} value={['option1', 'option3']} />,
    )
    const option1 = container.querySelector('input[name="option1"]') as HTMLInputElement
    const option2 = container.querySelector('input[name="option2"]') as HTMLInputElement
    const option3 = container.querySelector('input[name="option3"]') as HTMLInputElement

    expect(option1.checked).toBe(true)
    expect(option2.checked).toBe(false)
    expect(option3.checked).toBe(true)
  })

  it('updates the state when a checkbox is clicked', () => {
    const handleChange = jest.fn()
    const { container } = render(
      <FilterGroup title="Test Title" items={items} onChange={handleChange} />,
    )

    const option1 = container.querySelector('input[name="option1"]') as HTMLInputElement
    fireEvent.click(option1)

    expect(option1.checked).toBe(true)
    expect(handleChange).toHaveBeenCalledWith(['option1'])

    fireEvent.click(option1)
    expect(option1.checked).toBe(false)
    expect(handleChange).toHaveBeenCalledWith([])
  })
})
