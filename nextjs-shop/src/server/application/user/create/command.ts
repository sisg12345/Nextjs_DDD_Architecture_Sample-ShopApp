import 'server-only'

export class Command {
  constructor(
    /** メールアドレス */
    public readonly email: string,
    /** パスワード */
    public readonly password: string,
    /** 確認パスワード */
    public readonly passwordConfirm: string,
  ) {}
}
