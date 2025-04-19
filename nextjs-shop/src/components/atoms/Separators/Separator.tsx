'use client'

import styled from 'styled-components'

/**
 * セパレーター
 */
const Separator = styled.hr`
  height: 22px;
  color: #e5e7eb;
  display: flex;
  align-items: center;
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e5e7eb;
  }
`

export default Separator
