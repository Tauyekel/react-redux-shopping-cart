import {CLEAR_CART, DECREASE, INCREASE, REMOVE} from './actions'
import cartItems from './cart-items'

const data = (arr, value) => {
	return arr
		.map(el => el[value])
		.reduce((sum, current) => sum + current, 0)
}

const initialState = {
	cart: cartItems,
	total: data(cartItems, 'price'),
	amount: data(cartItems, 'amount')
}

const updateArray = (arr, item, idx) => {
	if (item.amount === 0) {
		return [
			...arr.slice(0, idx),
			...arr.slice(idx + 1)
		]
	}

	return [
		...arr.slice(0, idx),
		item,
		...arr.slice(idx + 1)
	]
}

const updateItem = (item = {}, quantity) => {
	const {id, title, price, img, amount} = item
	return {id, title, price, img, amount: amount + quantity}
}

const totalPrice = ({price}, total, quantity) => {
	return parseFloat((total + quantity*price).toFixed(2))
}

const updateOrder = (state, payload, quantity) => {
	const {cart, amount, total} = state
	const findedItem = cart.find(({id}) => id === payload)
	const itemIndex = cart.findIndex(({id}) => id === payload)

	const newItem = updateItem(findedItem, quantity)

	return {
		cart: updateArray(cart, newItem, itemIndex),
		amount: amount + quantity,
		total: totalPrice(findedItem, total, quantity)
	}
}

export const reducer = (state = initialState, {type, payload}) => {
	switch (type) {
		case CLEAR_CART:
			return {
				cart: [],
				amount: 0,
				total: 0
			}

		case INCREASE:
			return updateOrder(state, payload, 1)

		case DECREASE:
			return updateOrder(state, payload, -1)

		case REMOVE:
			const {amount} = state.cart.find(({id}) => id === payload)
			return updateOrder(state, payload, -amount)

		default:
			return state
	}
}
