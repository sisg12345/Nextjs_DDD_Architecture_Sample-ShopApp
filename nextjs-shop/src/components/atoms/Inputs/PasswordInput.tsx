import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import React, { InputHTMLAttributes, useState } from 'react'
import styled, { css } from 'styled-components'
import { commonStyle } from './style'
import type { AppTheme } from '@/utils/style'

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

type StyledInputProps = {
  /** ボーダーライン表示フラグ */
  $hasBorder?: boolean
  /** バリデーションエラーフラグ */
  $hasError?: boolean
  /** テーマ */
  theme?: AppTheme
}

const StyledInput = styled.input<StyledInputProps>`
  ${commonStyle}
  ${({ $hasError, $hasBorder = true, theme }) => {
    if ($hasBorder) {
      return css`
        border: 1px solid ${$hasError ? theme.colors.danger : theme.colors.border};
        border-radius: 5px;
      `
    }

    return css`
      border: none;
    `
  }}
  color: ${({ theme }) => theme.colors.text};
  height: 38px;
  padding-right: 40px; /* アイコンのスペースを確保 */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type='number'] {
    -webkit-appearance: none;
    -moz-appearance: textfield;
    appearance: none;
  }
  &:read-only {
    background-color: ${({ theme }) => theme.colors.readonly};
  }
`

const IconButton = styled.button`
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`

type PasswordInputProps = InputHTMLAttributes<HTMLInputElement> & {
  /** ボーダーライン表示フラグ */
  $hasBorder?: boolean
  /** バリデーションエラーフラグ */
  $hasError?: boolean
  /** パスワード表示切り替えフラグ */
  type?: string
}

/**
 *  パスワードテキストインプット
 */
export default function PasswordInput({
  type = 'password',
  $hasError,
  $hasBorder,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const isPasswordType = type === 'password'

  return (
    <InputWrapper>
      <StyledInput
        type={isPasswordType && showPassword ? 'text' : type}
        $hasError={$hasError}
        $hasBorder={$hasBorder}
        {...props}
      />
      {isPasswordType && (
        <IconButton type="button" onClick={handleTogglePasswordVisibility}>
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      )}
    </InputWrapper>
  )
}
