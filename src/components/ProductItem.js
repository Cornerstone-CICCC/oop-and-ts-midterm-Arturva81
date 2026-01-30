import { Component } from "../common/Component.js";

export class ProductItem extends Component {
  render() {
    const { product, onAddToCart } = this.props
    
    const card = document.createElement('div')
    card.className = 'product-card'
    
    const formattedId = String(product.id).padStart(2, '0')
    
    card.innerHTML = `
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.title}" class="product-image">
      </div>
      <div class="product-info">
        <div class="product-id">/${formattedId}</div>
        <div class="product-name">${product.title}</div>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <button class="add-button">Add+</button>
      </div>
    `

    const addButton = card.querySelector('.add-button')
    addButton.addEventListener('click', () => {
      if (onAddToCart) {
        onAddToCart(product)
      }
    })

    return card
  }
}