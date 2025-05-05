import 'server-only'

import type { User as PrismaUser } from '@prisma/client'
import { injectable } from 'inversify'
import prisma from '@/lib/prisma'
import { UpdateUserDto } from '@/server/domain/dtos/updateUserDto'
import { UserEntity } from '@/server/domain/entities/userEntity'
import { IUserRepository } from '@/server/domain/interfaces/repositories/IUserRepository'
import { log } from '@/server/shared/decorators/log'
import type { User } from '@/types'

@injectable()
export class UserRepository implements IUserRepository {
  /**
   *  ユーザーを保存
   *
   * @param userEntity ユーザー情報
   */
  @log
  public async save(userEntity: UserEntity): Promise<void> {
    // 一時的に使用するユーザーID、自動採番後に更新する
    const tempUserId = 0

    // ユーザーを保存
    const createUser = await prisma.user.create({
      data: {
        email: userEntity.email,
        password: userEntity.password,
        username: userEntity.username,
        displayName: userEntity.displayName,
        description: userEntity.description,
        profileImageUrl: userEntity.profileImageUrl,
        updateUser: tempUserId,
        createUser: tempUserId,
      },
    })

    // 自動採番後にユーザーIDを更新
    await prisma.user.update({
      where: { id: createUser.id },
      data: {
        createUser: createUser.id,
        updateUser: createUser.id,
      },
    })
  }

  /**
   * ユーザー情報を更新
   *
   * @param dto ユーザー情報
   */
  @log
  public async update(dto: UpdateUserDto): Promise<void> {
    await prisma.user.update({
      where: { id: dto.userId },
      data: {
        email: dto.email,
        username: dto.username,
        displayName: dto.displayName,
        description: dto.description,
        profileImageUrl: dto.profileImageUrl,
        updateUser: dto.userId,
      },
    })
  }

  /**
   * パスワード更新
   *
   * @param userId ユーザーID
   * @param password パスワード
   */
  @log
  public async updatePassword(userId: User['id'], password: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: {
        password,
        updateUser: userId,
      },
    })
  }

  /**
   * メールアドレスからユーザーを取得
   *
   * @param email メールアドレス
   */
  public async findByEmail(email: string): Promise<PrismaUser | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return null
    }

    return user
  }

  /**
   * IDからユーザーを取得
   *
   * @param id  ユーザーID
   */
  @log
  public async findById(id: User['id']): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      return null
    }

    return UserEntity.reconstruct(
      user.id,
      user.password,
      user.email,
      user.username,
      user.displayName,
      user.description,
      user.profileImageUrl,
    )
  }
}
