'use client'

import Link from 'next/link'
import styled from 'styled-components'
import { GitHubIcon } from '@/components/atoms/Buttons/IconButton'
import Separator from '@/components/atoms/Separators/Separator'
import Text from '@/components/atoms/Texts/Text'
import Box from '@/components/layouts/Box'
import Flex from '@/components/layouts/Flex'
import { PAGE_NAME } from '@/constants'

const StyledFooter = styled.footer`
  position: absolute;
  width: 100%;
`

/**
 * フッター
 */
export default function Footer() {
  // ナビゲーションのリンクのメニュー
  const navLinkMenu = [
    [
      { label: PAGE_NAME.top, href: '/' },
      { label: PAGE_NAME.recruit, href: '/' },
      { label: PAGE_NAME.info, href: '/' },
    ],
    [
      { label: PAGE_NAME.termsOfService, href: '/' },
      { label: PAGE_NAME.privacyPolicy, href: '/' },
      { label: PAGE_NAME.shippingAndReturns, href: '/' },
    ],
  ]

  return (
    <StyledFooter>
      <Separator />
      <Flex $flexDirection={{ base: 'column', md: 'row' }} $padding={2}>
        {navLinkMenu.map((menu, index) => (
          <Box
            as="ul"
            $minWidth={{ base: '100%', md: '120px' }}
            $padding={{ base: 0, md: 1 }}
            key={index}
          >
            {menu.map(({ label, href }, index) => (
              <Box as="li" $marginBottom={2} key={index}>
                <Link href={href}>{label}</Link>
              </Box>
            ))}
          </Box>
        ))}
        <Box as="ul" $minWidth={{ base: '100%', md: '120px' }} $padding={{ base: 0, md: 1 }}>
          <Box as="li" $marginBottom={2}>
            <Link href="https://github.com/sisg12345" target="_blank" data-testid="github-link">
              <GitHubIcon $size={22} />
            </Link>
          </Box>
        </Box>
      </Flex>
      <Box $textAlign="center" $paddingTop={2} $paddingBottom={2}>
        <Text>© 2025 S.S. All rights reserved.</Text>
      </Box>
    </StyledFooter>
  )
}
