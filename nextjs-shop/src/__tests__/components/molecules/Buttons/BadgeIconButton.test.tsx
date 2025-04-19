import { render, screen } from '@testing-library/react'
import { PersonIcon } from '@/components/atoms/Buttons/IconButton'
import BadgeIconButton from '@/components/molecules/Buttons/BadgeIconButton'

describe('BadgeIconButton Component', () => {
  it('renders the icon correctly', () => {
    render(<BadgeIconButton icon={<PersonIcon />} $badgeBackgroundColor="primary" />)
    const icon = screen.getByTestId('badge-icon-button')
    expect(icon).toBeInTheDocument()
  })

  it('does not render the badge when badgeContent is not provided', () => {
    render(<BadgeIconButton icon={<PersonIcon />} $badgeBackgroundColor="primary" />)
    const badgeWrapper = screen.queryByTestId('badge-wrapper')
    expect(badgeWrapper).not.toBeInTheDocument()
  })

  it('renders the badge when badgeContent is provided', () => {
    render(
      <BadgeIconButton icon={<PersonIcon />} badgeContent={5} $badgeBackgroundColor="primary" />,
    )
    const badgeWrapper = screen.getByTestId('badge-wrapper')
    expect(badgeWrapper).toBeInTheDocument()
    const badge = screen.getByText('5')
    expect(badge).toBeInTheDocument()
  })

  it('applies the correct size to the wrapper', () => {
    render(
      <BadgeIconButton
        icon={<PersonIcon />}
        $size={40}
        badgeContent={5}
        $badgeBackgroundColor="primary"
      />,
    )
    const wrapper = screen.getByTestId('badge-wrapper').parentElement
    expect(wrapper).toHaveStyle('width: 40px')
    expect(wrapper).toHaveStyle('height: 40px')
  })

  it('applies the correct badge background color', () => {
    render(
      <BadgeIconButton icon={<PersonIcon />} badgeContent={5} $badgeBackgroundColor="primary" />,
    )
    const badge = screen.getByText('5')
    expect(badge).toHaveStyle('background-color: ${theme.colors.primary}')
  })
})
