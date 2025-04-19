'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import Button from '@/components/atoms/Buttons/Button'
import Text from '@/components/atoms/Texts/Text'
import Box from '@/components/layouts/Box'
import Flex from '@/components/layouts/Flex'

/**
 * 404 Not Found
 */
export default function NotFoundPage() {
  useEffect(() => {
    // ヘッダーを削除
    const headers = document.getElementsByTagName('header')
    Array.from(headers).forEach((el) => el.remove())

    // フッターを削除
    const footers = document.getElementsByTagName('footer')
    Array.from(footers).forEach((el) => el.remove())
  }, [])

  return (
    <Flex $justifyContent="center" $alignItems="center" $width="100%" $height="100vh">
      <Box>
        <Text as="h1" $variant="large" $fontWeight="bold" $color="danger">
          404 Not Found ( ´Д`)y━･~~
        </Text>
        <Flex $justifyContent="center" $margin={2}>
          <Link href="/">
            <Button $variant="danger">トップに戻る</Button>
          </Link>
        </Flex>
      </Box>
    </Flex>
  )
}
