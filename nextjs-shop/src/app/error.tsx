'use client' // エラーバウンダリはクライアントコンポーネントである必要があります

import Link from 'next/link'
import { useEffect } from 'react'
import Button from '@/components/atoms/Buttons/Button'
import Text from '@/components/atoms/Texts/Text'
import Box from '@/components/layouts/Box'
import Flex from '@/components/layouts/Flex'

export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    // エラーをエラー報告サービスにログ出力
    console.error(error)
  }, [error])

  return (
    <Flex as="main" $justifyContent="center" $alignItems="center" $width="100%" $height="100vh">
      <Box>
        <Text as="h1" $variant="large" $fontWeight="bold" $color="danger">
          システムエラーが発生しました ಠ_ಠ
        </Text>
        <Text as="section" $color="danger" $fontWeight="bold" $textAlign="center" $margin={2}>
          ご迷惑をおかけして申し訳ございません
          <br />
          時間をおいて再度アクセスしてください
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
