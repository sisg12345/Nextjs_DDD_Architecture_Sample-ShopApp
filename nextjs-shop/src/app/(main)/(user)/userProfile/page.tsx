'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { updateUserProfile } from '@/app/api/userProfile/action'
import Box from '@/components/layouts/Box'
import Flex from '@/components/layouts/Flex'
import UserProfileForm from '@/components/organisms/Forms/UserProfileForm'
import type { ResponseResult, User } from '@/types'
import { fetcher } from '@/utils/fetch/fetcher'

/**
 * ユーザー情報を取得
 *
 * @returns ユーザープロフィール情報
 */
const searchUserProfile = async (userId: string): Promise<User | null> => {
  const result = await fetcher<ResponseResult<User | null>>(
    `http://localhost:3000/api/users/${userId}`,
  )

  return result.data ?? null
}

/**
 * ユーザープロフィールページ
 */
export default function UserProfile() {
  // セッション
  const { data: session } = useSession()
  // ユーザープロフィール情報
  const [userProfile, setUserProfile] = useState<User | null>(null)

  useEffect(() => {
    ;(async () => {
      if (session?.user?.id) {
        // ユーザープロフィール情報を取得
        const userProfile = await searchUserProfile(session.user.id)
        setUserProfile(userProfile)
      }
    })()
  }, [session?.user?.id])

  return (
    <Flex
      $justifyContent="center"
      $paddingTop={{ base: 2, md: 4 }}
      $paddingBottom={{ base: 2, md: 4 }}
      $paddingLeft={{ base: 2, md: 0 }}
      $paddingRight={{ base: 2, md: 0 }}
    >
      <Flex $width="800px" $flexDirection="column" $justifyContent="center" $alignItems="center">
        <Box $width="100%">
          {/* ユーザープロフィールフォーム */}
          <UserProfileForm userProfile={userProfile} onSave={updateUserProfile} />
        </Box>
      </Flex>
    </Flex>
  )
}
