import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import Text from '@/components/atoms/Texts/Text'
import { theme } from '@/styles/themes'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Text Component', () => {
  it('renders the text with the correct variant styles', () => {
    renderWithTheme(<Text $variant="large">Test Text</Text>)
    const textElement = screen.getByText('Test Text')

    // バリアントに基づくスタイルを確認
    expect(textElement).toHaveStyle(`font-size: ${theme.fontSizes.large}`)
    expect(textElement).toHaveStyle(`letter-spacing: ${theme.letterSpacings[4]}`)
    expect(textElement).toHaveStyle(`line-height: ${theme.lineHeights[4]}`)
  })

  it('overrides variant styles with custom props', () => {
    renderWithTheme(
      <Text $variant="large" $fontSize="extraSmall" $letterSpacing={2} $lineHeight={1}>
        Custom Text
      </Text>,
    )
    const textElement = screen.getByText('Custom Text')

    // カスタムスタイルがバリアントスタイルを上書きしていることを確認
    expect(textElement).toHaveStyle(`font-size: ${theme.fontSizes.extraSmall}`)
    expect(textElement).toHaveStyle(`letter-spacing: ${theme.letterSpacings[2]}`)
    expect(textElement).toHaveStyle(`line-height: ${theme.lineHeights[1]}`)
  })

  it('applies color and background color styles', () => {
    renderWithTheme(
      <Text $color="primary" $backgroundColor="secondary">
        Colored Text
      </Text>,
    )
    const textElement = screen.getByText('Colored Text')

    // 色のスタイルを確認
    expect(textElement).toHaveStyle(`color: ${theme.colors.primary}`)
    expect(textElement).toHaveStyle(`background-color: ${theme.colors.secondary}`)
  })
})
