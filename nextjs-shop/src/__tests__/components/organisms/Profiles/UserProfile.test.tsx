import { render, screen } from '@testing-library/react'
import UserProfile from '@/components/organisms/Profiles/UserProfile'

describe('UserProfile Component', () => {
  it('renders the user profile with all props correctly', () => {
    render(
      <UserProfile
        username="Test User"
        profileImageUrl="/test-image.jpg"
        numberOfProducts={5}
        description="This is a test user description."
      />,
    )

    // ユーザー名が正しく表示されているか
    expect(screen.getByText('Test User')).toBeInTheDocument()

    // 商品数が正しく表示されているか
    expect(screen.getByText('5点出品済')).toBeInTheDocument()

    // ユーザー説明が正しく表示されているか
    expect(screen.getByText('This is a test user description.')).toBeInTheDocument()

    // 画像が正しくレンダリングされているか
    const image = screen.getByAltText('Test User')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining(`/_next/image?url=%2Ftest-image.jpg`),
    )
  })

  it('renders the user profile without description when $variant is "small"', () => {
    render(
      <UserProfile
        $variant="small"
        username="Test User"
        profileImageUrl="/test-image.jpg"
        numberOfProducts={3}
      />,
    )

    // ユーザー名が正しく表示されているか
    expect(screen.getByText('Test User')).toBeInTheDocument()

    // 商品数が正しく表示されているか
    expect(screen.getByText('3点出品済')).toBeInTheDocument()

    // 説明が表示されていないことを確認
    expect(screen.queryByText('This is a test user description.')).not.toBeInTheDocument()
  })
})
