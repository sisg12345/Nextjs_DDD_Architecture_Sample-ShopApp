import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/themes/index'
import type { Preview } from '@storybook/react'
import React from 'react'
import '@/styles/reset.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    // themeの適応
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
}

export default preview
