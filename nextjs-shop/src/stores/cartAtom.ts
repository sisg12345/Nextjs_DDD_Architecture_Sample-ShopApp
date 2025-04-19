import { atom, atomFamily, DefaultValue, selectorFamily } from 'recoil'

// 商品追加
export const ADD_PRODUCT = 'ADD_PRODUCT'
// 商品削除
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/**
 * カート内の商品情報の型
 */
type CartItem = {
  id: number
  title: string
  price: number
  imageUrl: string
}

/**
 * カートのアクションの型
 */
type CartAction = {
  /** カートの操作 */
  type: typeof ADD_PRODUCT | typeof REMOVE_PRODUCT
  /** 商品ID */
  id: number
}

/**
 * カートに入っている商品のIDを管理するatom
 */
const cartIdsAtom = atom<number[]>({
  key: 'cartIdAtom',
  default: [],
})

/**
 * 各商品の情報を管理するatomFamily
 */
const cartAtom = atomFamily<CartItem | null, number>({
  key: 'cartAtom',
  default: null,
})

/**
 * カートの操作を管理するselector
 */
export const cartListSelector = selectorFamily({
  key: 'cartListSelector',
  get:
    () =>
    ({ get }) => {
      const cartIds = get(cartIdsAtom)

      // カード一覧を取得
      return cartIds.map((id) => get(cartAtom(id)))
    },
  set:
    (action: CartAction) =>
    ({ set, reset }, newValue) => {
      if (newValue instanceof DefaultValue) {
        return
      }

      // カートの操作を取得
      switch (action.type) {
        // カートに商品を追加
        case ADD_PRODUCT:
          set(cartAtom(action.id), newValue[0])
          set(cartIdsAtom, (ids) => [...ids, action.id])
          break
        // カートから商品を削除
        case REMOVE_PRODUCT:
          reset(cartAtom(action.id))
          set(cartIdsAtom, (ids) => ids.filter((id) => id !== action.id))
          break
        default:
          throw new Error('Invalid action type')
      }
    },
})
