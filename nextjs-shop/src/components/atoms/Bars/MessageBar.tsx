'use client'

import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import Text, { TextProps } from '@/components/atoms/Texts/Text'
import type { AppTheme } from '@/utils/style'

type MessageBarProps = TextProps & {
  $success?: boolean
}

type MessageBarWrapperProps = MessageBarProps & {
  /** テーマ */
  theme?: AppTheme
}

/**
 * メッセージバーのラッパー
 */
const MessageBarWrapper = styled(Text)<MessageBarWrapperProps>`
  color: ${({ $success = true, theme }) => {
    if ($success) {
      return theme.colors.primary
    } else {
      return theme.colors.danger
    }
  }};
`

/**
 * メッセージバー
 */
export default function MessageBar({
  $success,
  children,
  ...props
}: PropsWithChildren<MessageBarProps>) {
  return (
    <MessageBarWrapper as="p" $success={$success} {...props}>
      {children}
    </MessageBarWrapper>
  )
}
