'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { startTransition, useActionState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { SigninFormData } from '@/app/api/signin/action'
import Button from '@/components/atoms/Buttons/Button'
import Input from '@/components/atoms/Inputs/Input'
import PasswordInput from '@/components/atoms/Inputs/PasswordInput'
import Text from '@/components/atoms/Texts/Text'
import Box from '@/components/layouts/Box'
import { useGlobalSpinnerActionsContext } from '@/contexts/GlobalSpinnerActionsContext'
import { signinFormSchema } from '@/lib/services/auth/validations'

interface SigninFormProps {
  // サインインボタンクリックした時のイベントハンドラー
  onSignin: (prevState: unknown, formData: SigninFormData) => Promise<string | void>
}

/**
 * サインインフォーム
 */
export default function SigninForm({ onSignin }: SigninFormProps) {
  // ローディングスピナーアクションコンテキストのフック
  const setGlobalSpinner = useGlobalSpinnerActionsContext()
  // formの初期化
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    // yupを使用するように設定
    resolver: yupResolver(signinFormSchema),
  })
  // サーバーアクションの状態フック
  const [error, formAction, isPending] = useActionState(onSignin, undefined)

  /**
   * 送信イベントのハンドラー
   *
   * @param data フォームのデータ
   */
  const onSubmit = async (data: SigninFormData) => {
    // 受けっとったサインインイベント(サーバーアクション)を実行
    startTransition(() => {
      formAction(data)
    })
  }

  useEffect(() => {
    // ローディングスピナー表示 / 非表示
    setGlobalSpinner(isPending)

    return () => {
      // ローディングスピナー非表示
      setGlobalSpinner(false)
    }
  }, [isPending, setGlobalSpinner])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box $marginBottom={1}>
        {/* メールアドレスの入力 */}
        <Input
          type="text"
          placeholder="メールアドレス"
          $hasError={!!errors.email}
          {...register('email')}
        />
        <Box>
          <Text $variant="small" $color="danger">
            {errors.email?.message}
          </Text>
        </Box>
      </Box>
      {/* ユーザーパスワードの入力 */}
      <Box $marginBottom={1}>
        <PasswordInput
          placeholder="パスワード"
          $hasError={!!errors.password}
          {...register('password')}
        />
        <Box>
          <Text $variant="small" $color="danger">
            {errors.password?.message}
          </Text>
        </Box>
      </Box>
      {/* エラー */}
      {!!error && (
        <Box $marginBottom={1}>
          <Text $variant="small" $color="danger">
            {error}
          </Text>
        </Box>
      )}
      {/* サインイン */}
      <Button type="submit" $width="100%">
        サインイン
      </Button>
    </form>
  )
}
