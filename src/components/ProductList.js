import { Component } from "../common/Component.js";
import { ProductItem } from "./ProductItem.js";

export class ProductList extends Component {
  constructor(props) {
    super(props)
    this.products = []
    this.isLoading = true
  }

  async fetchProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products')
      this.products = await response.json()
      this.isLoading = false
      this.updateProducts()
    } catch (error) {
      console.error('Error fetching products:', error)
      this.isLoading = false
    }
  }

  updateProducts() {
    if (!this.element) return
    
    const grid = this.element.querySelector('.products-grid')
    grid.innerHTML = ''
    
    this.products.forEach(product => {
      const productItem = new ProductItem({
        product,
        onAddToCart: this.props.onAddToCart
      })
      productItem.mount(grid)
    })
  }

  render() {
    const section = document.createElement('section')
    section.className = 'products-section'
    
    section.innerHTML = `
      <h2 class="section-title">Products</h2>
      <div class="products-grid">
        ${this.isLoading ? '<div class="loading">Loading products...</div>' : ''}
      </div>
    `

    setTimeout(() => this.fetchProducts(), 0)

    return section
  }
}