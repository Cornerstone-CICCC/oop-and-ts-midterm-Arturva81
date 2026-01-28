import { Component } from "../common/Component.js";

export class CartItem extends Component {
  render() {
    const { item, onUpdateQuantity, onRemove } = this.props
    
    const cartItem = document.createElement('div')
    cartItem.className = 'cart-item'
    
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
        <button class="remove-btn">Remove</button>
      </div>
    `

    const decreaseBtn = cartItem.querySelector('.decrease')
    const increaseBtn = cartItem.querySelector('.increase')
    const removeBtn = cartItem.querySelector('.remove-btn')

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