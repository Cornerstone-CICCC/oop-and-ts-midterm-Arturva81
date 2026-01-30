import { Component } from "../common/Component.js";
import { ProductItem } from "./ProductItem.js";

export class ProductList extends Component {
  constructor(props) {
    super(props)
    this.products = []
    this.filteredProducts = []
    this.isLoading = true
  }

  async fetchProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products')
      this.products = await response.json()
      this.filteredProducts = this.products
      this.isLoading = false
      this.updateProducts()
    } catch (error) {
      console.error('Error fetching products:', error)
      this.isLoading = false
    }
  }

  filterProducts(searchQuery) {
    const query = searchQuery.toLowerCase().trim()
    if (query === '') {
      this.filteredProducts = this.products
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      )
    }
    this.updateProducts()
  }

  updateProducts() {
    if (!this.element) return
    
    const grid = this.element.querySelector('.products-grid')
    grid.innerHTML = ''
    
    if (this.filteredProducts.length === 0) {
      grid.innerHTML = '<div class="loading">No products found</div>'
      return
    }
    
    this.filteredProducts.forEach(product => {
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
      <div class="products-header">
        <div class="search-bar">
          <input type="text" placeholder="Search" class="search-input">
          <button class="search-btn">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <h2 class="section-title">Products</h2>
      </div>
      <div class="products-grid">
        ${this.isLoading ? '<div class="loading">Loading products...</div>' : ''}
      </div>
    `

    const searchInput = section.querySelector('.search-input')
    searchInput.addEventListener('input', (e) => {
      this.filterProducts(e.target.value)
    })

    setTimeout(() => this.fetchProducts(), 0)

    return section
  }
}