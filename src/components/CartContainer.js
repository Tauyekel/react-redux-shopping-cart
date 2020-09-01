import React from 'react'
import {connect} from 'react-redux'

import CartItem from './CartItem'
import {clearCart, remove, increase, decrease} from '../actions'

const CartContainer = ({cart, total, clearCart, remove, increase, decrease}) => {
  if (cart.length === 0) {
    return (
      <section className="cart">
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    )
  }
  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      <article>
        {cart.map(item => {
          const {id} = item
          return (
            <CartItem
              key={id}
              {...item}
              remove={() => remove(id)}
              increase={() => increase(id)}
              decrease={() => decrease(id)}
            />
          )
        })}
      </article>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        <button
          onClick={clearCart}
          className="btn clear-btn"
        >
          clear cart
        </button>
      </footer>
    </section>
  )
}

const mapStateToProps = ({cart, total, amount}) => {
  return {cart, total, amount}
}

const mapDispatchToProps = {
  clearCart,
  increase,
  decrease,
  remove
}

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer)
