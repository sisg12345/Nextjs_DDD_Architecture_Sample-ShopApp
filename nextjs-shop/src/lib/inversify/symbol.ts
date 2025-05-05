const TYPES = {
  // useCase
  IGetProductHandler: Symbol.for('IGetProductHandler'),
  IGetProductsHandler: Symbol.for('IGetProductsHandler'),
  ICreateProductOrderHandler: Symbol.for('ICreateProductOrderHandler'),
  ICreateProductHandler: Symbol.for('ICreateProductHandler'),
  ICreateUserHandler: Symbol.for('ICreateUserHandler'),
  IGetUserHandler: Symbol.for('IGetUserHandler'),

  // service
  IProductService: Symbol.for('IProductService'),
  IUserService: Symbol.for('IUserService'),
  IUpdateUserHandler: Symbol.for('IUpdateUserHandler'),

  // repository
  IProductRepository: Symbol.for('IProductRepository'),
  IUserRepository: Symbol.for('IUserRepository'),
} as const

export default TYPES
