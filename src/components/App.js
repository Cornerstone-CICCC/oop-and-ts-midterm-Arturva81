import { Component } from "../common/Component.js";
import { Header } from "./Header.js";
import { ProductList } from "./ProductList.js";
import { CartList } from "./CartList.js";
import { Footer } from "./Footer.js";

export class App extends Component {
  constructor(props) {
    super(props)
    this.currentPage = 'home'
    this.mainContent = null
  }

  navigateToHome() {
    this.currentPage = 'home'
    this.renderPage()
  }

  navigateToCart() {
    this.currentPage = 'cart'
    this.renderPage()
  }

  renderPage() {
    if (!this.mainContent) return
    
    this.mainContent.innerHTML = ''
    
    if (this.currentPage === 'home') {
      const productList = new ProductList({
        onAddToCart: (product) => {
          this.props.cartContext.addToCart(product)
        }
      })
      productList.mount(this.mainContent)
    } else if (this.currentPage === 'cart') {
      const cartList = new CartList({
        cartContext: this.props.cartContext,
        isPage: true
      })
      cartList.mount(this.mainContent)
    }
  }

  render() {
    const app = document.createElement('div')
    app.className = 'app'
    
    const header = new Header({
      cartContext: this.props.cartContext,
      onHomeClick: () => this.navigateToHome(),
      onCartClick: () => this.navigateToCart()
    })
    header.mount(app)
    
    this.mainContent = document.createElement('main')
    this.mainContent.className = 'main-content'
    app.appendChild(this.mainContent)
    
    this.renderPage()
    
    const footer = new Footer()
    footer.mount(app)
    
    return app
  }
}