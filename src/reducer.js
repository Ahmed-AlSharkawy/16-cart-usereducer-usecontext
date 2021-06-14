import CartItem from './CartItem'

const reducer = (state, action) => {
  switch (action.type) {
    case 'Loading':
      return { ...state, isLoading: true }
    case 'DISPLAY_ITEMS':
      return { ...state, isLoading: false, cart: action.payload }
    case 'CLEAR_CART':
      return { ...state, cart: [] }
    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      }
    case 'TOGGLE_AMOUNT':
      let tempCart = state.cart
        .map((item) => {
          if (item.id === action.payload.id) {
            if (action.payload.state === 'inc')
              return { ...item, amount: item.amount + 1 }
            if (action.payload.state === 'dec')
              return { ...item, amount: item.amount - 1 }
          }
          return item
        })
        .filter((cartItem) => cartItem.amount !== 0)

      return {
        ...state,
        cart: tempCart,
      }

    case 'INCREASE_ITEM':
      return {
        ...state,
        cart: changeAmount(state.cart, 'increase', action.payload),
      }
    case 'DECREASE_ITEM':
      return {
        ...state,
        cart: changeAmount(state.cart, 'decrease', action.payload),
      }
    case 'GET-TOTALS':
      let { totalPrice, totalAmount } = state.cart.reduce(
        (totals, item) => {
          const { price, amount } = item
          const itemPrice = price * amount
          totals.totalPrice += itemPrice
          totals.totalAmount += amount
          return totals
        },
        {
          totalPrice: 0,
          totalAmount: 0,
        }
      )
      totalPrice = parseFloat(totalPrice.toFixed(2))
      return {
        ...state,
        total: totalPrice,
        amount: totalAmount,
      }
    default:
      throw new Error('Action type did not found')
  }
}

const changeAmount = (cart, changeState, id) => {
  return cart
    .map((item) => {
      if (item.id === id) {
        if (changeState === 'increase')
          return { ...item, amount: item.amount + 1 }
        else if (changeState === 'decrease')
          return { ...item, amount: item.amount - 1 }
        else return { ...item }
      }
      return item
    })
    .filter((cartItem) => cartItem.amount !== 0)
}

export default reducer
