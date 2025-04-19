import type { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const defaultPages: MetadataRoute.Sitemap = [
    {
      url: 'https://localhost:3000',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://localhost:3000/signin',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://localhost:3000/signup',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://localhost:3000/search',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://localhost:3000/search/clothes',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://localhost:3000/search/book',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://localhost:3000/search/shoes',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://localhost:3000/search/cart',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://localhost:3000/search/sell',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://localhost:3000/userProfile',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]

  // ユーザーID一覧を取得
  const users = await prisma.user.findMany({
    select: {
      id: true,
    },
  })

  const userPages: MetadataRoute.Sitemap = users.map((user) => ({
    url: `https://localhost:3000/user/${user.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  }))

  // 商品ID一覧を取得
  const products = await prisma.product.findMany({
    select: {
      id: true,
    },
  })

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `https://localhost:3000/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  }))

  return [...defaultPages, ...userPages, ...productPages]
}
