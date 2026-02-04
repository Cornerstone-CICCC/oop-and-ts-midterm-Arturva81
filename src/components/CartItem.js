import { Component } from "../common/Component.js";

export class CartItem extends Component {
  render() {
    const { item, isPage, onUpdateQuantity, onRemove } = this.props
    const subtotal = (item.price * item.quantity).toFixed(2)
    
    const cartItem = document.createElement('div')
    cartItem.className = isPage ? 'cart-item-page' : 'cart-item'
    
    if (isPage) {
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="cart-item-page-image">
        <div class="cart-item-page-info">
          <div class="cart-item-page-name">${item.title}</div>
          <div class="cart-item-page-price">$${item.price.toFixed(2)}</div>
          <div class="cart-item-page-quantity">
            <button class="quantity-btn-page decrease">-</button>
            <span class="quantity-value-page">${item.quantity}</span>
            <button class="quantity-btn-page increase">+</button>
          </div>
          <div class="cart-item-subtotal">Subtotal: $${subtotal}</div>
          <button class="remove-btn-page">Remove</button>
        </div>
      `
    } else {
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="cart-item-image">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.title}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="cart-item-quantity">
            <button class="quantity-btn decrease">-</button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-btn increase">+</button>
          </div>
          <div class="cart-item-subtotal">Subtotal: $${subtotal}</div>
          <button class="remove-btn">Remove</button>
        </div>
      `
    }

    const decreaseBtn = cartItem.querySelector('.decrease, .decrease')
    const increaseBtn = cartItem.querySelector('.increase, .increase')
    const removeBtn = cartItem.querySelector('.remove-btn, .remove-btn-page')

    decreaseBtn.addEventListener('click', () => {
      if (onUpdateQuantity) {
        onUpdateQuantity(item.id, item.quantity - 1)
      }
    })

    increaseBtn.addEventListener('click', () => {
      if (onUpdateQuantity) {
        onUpdateQuantity(item.id, item.quantity + 1)
      }
    })

    removeBtn.addEventListener('click', () => {
      if (onRemove) {
        onRemove(item.id)
      }
    })

    return cartItem
  }
}