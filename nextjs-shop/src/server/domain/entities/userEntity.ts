import 'server-only'

import { MESSAGE } from '@/constants'
import type { User } from '@/types'

/**
 * ユーザーエンティティ
 */
export class UserEntity {
  /** ユーザーID */
  readonly #id: User['id']
  /** パスワード */
  #password: string
  /** メールアドレス */
  #email: string
  /** ユーザー名 */
  #username: string
  /** ユーザー表示名 */
  #displayName: string
  /** 説明 */
  #description: string
  /** プロフィール画像のURL */
  #profileImageUrl: string

  private constructor(
    id: User['id'],
    password: string,
    email: string,
    username: string,
    displayName: string,
    description: string,
    profileImageUrl: string,
  ) {
    this.#id = id
    this.#password = password
    this.#email = email
    this.#username = username
    this.#displayName = displayName
    this.#description = description
    this.#profileImageUrl = profileImageUrl
  }

  /**
   * ファクトリメソッド: 新規作成用
   */
  static create(
    id: User['id'],
    password: string,
    email: string,
    username: string,
    displayName: string,
    description: string,
    profileImageUrl: string,
  ) {
    if (!email.trim() || !password.trim()) {
      throw new Error(MESSAGE.error.invalidUser)
    }

    return new UserEntity(id, password, email, username, displayName, description, profileImageUrl)
  }

  /**
   * ファクトリメソッド: 復元用
   */
  static reconstruct(
    id: User['id'],
    password: string,
    email: string,
    username: string,
    displayName: string,
    description: string,
    profileImageUrl: string,
  ) {
    return new UserEntity(id, password, email, username, displayName, description, profileImageUrl)
  }

  get id() {
    return this.#id
  }

  get password() {
    return this.#password
  }

  get email() {
    return this.#email
  }

  get username() {
    return this.#username
  }

  get displayName() {
    return this.#displayName
  }

  get description() {
    return this.#description
  }

  get profileImageUrl() {
    return this.#profileImageUrl
  }

  set password(newPassword: string) {
    if (!newPassword.trim()) {
      throw new Error(MESSAGE.error.passwordRequired)
    }
  }

  set email(newEmail: string) {
    if (!newEmail.trim()) {
      throw new Error(MESSAGE.error.emailRequired)
    }
  }

  /**
   * DTO/プリミティブ型へ変換
   */
  toPrimitives() {
    return {
      id: this.#id,
      email: this.#email,
      username: this.#username,
      displayName: this.#displayName,
      description: this.#description,
      profileImageUrl: this.profileImageUrl,
    }
  }
}
