export const CLEAR_CART = 'CLEAR_CART'
export const INCREASE = 'INCREASE'
export const DECREASE = 'DECREASE'
export const REMOVE = 'REMOVE'

export const clearCart = () => {
	return {
		type: CLEAR_CART
	}
}

export const increase = (id) => {
	return {
		type: INCREASE,
		payload:id
	}
}

export const decrease = (id) => {
	return {
		type: DECREASE,
		payload:id
	}
}

export const remove = (id) => {
	return {
		type: REMOVE,
		payload: id
	}
}


