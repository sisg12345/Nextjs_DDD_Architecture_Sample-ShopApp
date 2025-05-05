import { Container } from 'inversify'
import { GetProductsHandler } from './server/application/product/get/category/getProductsHandler'
import { IGetUserHandler } from './server/application/user/get/IGetUserHandler'
import { GetUserHandler } from './server/application/user/get/getUserHandler'
import { ICreateProductOrderHandler } from '@/server/application/product/create/order/ICreateProductOrderHandler'
import { CreateProductOrderHandler } from '@/server/application/product/create/order/createProductOrderHandler'
import { ICreateProductHandler } from '@/server/application/product/create/register/ICreateProductHandler'
import { CreateProductHandler } from '@/server/application/product/create/register/createProductHandler'
import { IGetProductsHandler } from '@/server/application/product/get/category/IGetProductsHandler'
import { IGetProductHandler } from '@/server/application/product/get/info/IGetProductHandler'
import { GetProductHandler } from '@/server/application/product/get/info/getProductHandler'
import { ICreateUserHandler } from '@/server/application/user/create/ICreateUserHandler'
import { CreateUserHandler } from '@/server/application/user/create/createUserHandler'
import { IUpdateUserHandler } from '@/server/application/user/update/IUpdateUserHandler'
import { UpdateUserHandler } from '@/server/application/user/update/updateUserHandler'
import { IProductRepository } from '@/server/domain/interfaces/repositories/IProductRepository'
import { IUserRepository } from '@/server/domain/interfaces/repositories/IUserRepository'
import { IProductService } from '@/server/domain/interfaces/services/IProductService'
import { IUserService } from '@/server/domain/interfaces/services/IUserService'
import { ProductService } from '@/server/domain/services/productService'
import { UserService } from '@/server/domain/services/userService'
import { ProductRepository } from '@/server/infrastructure/repositories/product/productRepository'
import { UserRepository } from '@/server/infrastructure/repositories/user/userRepository'
import TYPES from '@/types/symbol'

/**
 * DIコンテナの設定
 */
const diContainer = new Container()
// useCase
diContainer.bind<IGetProductHandler>(TYPES.IGetProductHandler).to(GetProductHandler)
diContainer.bind<IGetProductsHandler>(TYPES.IGetProductsHandler).to(GetProductsHandler)
diContainer
  .bind<ICreateProductOrderHandler>(TYPES.ICreateProductOrderHandler)
  .to(CreateProductOrderHandler)
diContainer.bind<ICreateProductHandler>(TYPES.ICreateProductHandler).to(CreateProductHandler)
diContainer.bind<ICreateUserHandler>(TYPES.ICreateUserHandler).to(CreateUserHandler)
diContainer.bind<IUpdateUserHandler>(TYPES.IUpdateUserHandler).to(UpdateUserHandler)
diContainer.bind<IGetUserHandler>(TYPES.IGetUserHandler).to(GetUserHandler)

// service
diContainer.bind<IProductService>(TYPES.IProductService).to(ProductService)
diContainer.bind<IUserService>(TYPES.IUserService).to(UserService)

// repository
diContainer.bind<IProductRepository>(TYPES.IProductRepository).to(ProductRepository)
diContainer.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository)

export { diContainer }
