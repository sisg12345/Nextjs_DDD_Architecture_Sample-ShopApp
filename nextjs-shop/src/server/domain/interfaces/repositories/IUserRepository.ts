import 'server-only'

import type { User as PrismaUser } from '@prisma/client'
import { UpdateUserDto } from '@/server/domain/dtos/updateUserDto'
import { UserEntity } from '@/server/domain/entities/userEntity'
import type { User } from '@/types'

export interface IUserRepository {
  /**
   * ユーザーを保存
   *
   * @param dto ユーザー情報
   */
  save(userEntity: UserEntity): Promise<void>

  /**
   * ユーザーを更新
   *
   * @param dto ユーザー情報
   */
  update(dto: UpdateUserDto): Promise<void>

  /**
   * パスワード更新
   *
   * @param userId ユーザーID
   * @param password パスワード
   */
  updatePassword(userId: User['id'], password: string): Promise<void>

  /**
   * メールアドレスからユーザーを取得
   *
   * @param email メールアドレス
   */
  findByEmail(email: string): Promise<PrismaUser | null>

  /**
   * IDからユーザーを取得
   *
   * @param id  ユーザーID
   */
  findById(id: User['id']): Promise<UserEntity | null>
}
