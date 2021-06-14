import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  isLoading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  /* Display data using fetch approach
  const fetchData = async () => {
    dispatch({ type: 'Loading' })
    const response = await fetch(url)
    const cart = await response.json()
    dispatch({ type: 'DISPLAY_ITEMS', payload: cart })
  } 
    useEffect(() => {
    fetchData()
  }, []) 
  */

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const toggleAmount = (id, state) => {
    dispatch({ type: 'TOGGLE_AMOUNT', payload: { id, state } })
  }

  /* changing amount in one functions
  const changeAmount = (id, state) => {
    if (state === 'increase') dispatch({ type: 'INCREASE_ITEM', payload: id })
    else if (state === 'decrease')
      dispatch({ type: 'DECREASE_ITEM', payload: id })
  } */

  /* changing amount in two functions
  const increaseItem = (id) => {
    dispatch({ type: 'INCREASE_ITEM', payload: id })
  }

  const decreaseItem = (id) => {
    dispatch({ type: 'DECREASE_ITEM', payload: id })
  }
  */

  useEffect(() => {
    dispatch({ type: 'GET-TOTALS' })
  }, [state.cart])

  return (
    <AppContext.Provider
      value={{ ...state, clearCart, removeItem, toggleAmount }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
