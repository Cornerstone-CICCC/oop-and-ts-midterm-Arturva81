import { Component } from "../common/Component.js";
import { Header } from "./Header.js";
import { ProductList } from "./ProductList.js";
import { CartList } from "./CartList.js";
import { Footer } from "./Footer.js";

export class App extends Component {
  constructor(props) {
    super(props)
    this.cartList = null
  }

  render() {
    const app = document.createElement('div')
    app.className = 'app'
    
    const header = new Header({
      cartContext: this.props.cartContext,
      onCartClick: () => {
        if (this.cartList) {
          this.cartList.toggleCart()
        }
      }
    })
    header.mount(app)
    
    const main = document.createElement('main')
    main.className = 'main-content'
    
    const productList = new ProductList({
      onAddToCart: (product) => {
        this.props.cartContext.addToCart(product)
      }
    })
    productList.mount(main)
    
    app.appendChild(main)
    
    this.cartList = new CartList({
      cartContext: this.props.cartContext
    })
    this.cartList.mount(app)
    
    const footer = new Footer()
    footer.mount(app)
    
    return app
  }
}