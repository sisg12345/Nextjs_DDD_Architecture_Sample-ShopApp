import { Meta, StoryObj } from '@storybook/react'
import { SessionProvider } from 'next-auth/react'
import Header from '@/components/organisms/Headers/Header'
import { ShoppingCartContext } from '@/contexts/ShoppingCartContext/ShoppingCartContext'

const meta: Meta<typeof Header> = {
  title: 'Organisms/Headers/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Header>

// デフォルトのヘッダー（未ログイン状態）
export const Default: Story = {
  decorators: [
    (Story) => (
      <SessionProvider session={null}>
        <Story />
      </SessionProvider>
    ),
  ],
}

// ログイン状態のヘッダー
export const LoggedIn: Story = {
  decorators: [
    (Story) => (
      <SessionProvider
        session={{
          user: { name: 'John Doe', email: 'john.doe@example.com' },
          expires: '2025-12-31T23:59:59.999Z',
        }}
      >
        <Story />
      </SessionProvider>
    ),
  ],
}

// カートに商品がある状態のヘッダー
export const WithCartItems: Story = {
  decorators: [
    (Story) => (
      <SessionProvider session={null}>
        <ShoppingCartContext
          value={{
            cart: [
              {
                id: 1,
                title: '商品1',
                price: 1000,
                imageUrl: '',
              },
              {
                id: 2,
                title: '商品2',
                price: 2000,
                imageUrl: '',
              },
            ],
            addProductToCart: () => {},
            removeProductFromCart: () => {},
          }}
        >
          <Story />
        </ShoppingCartContext>
      </SessionProvider>
    ),
  ],
}
