export class CartContext {
  constructor() {
    this.cart = []
    this.listeners = []
  }

  subscribe(listener) {
    this.listeners.push(listener)
  }

  notify() {
    this.listeners.forEach(listener => listener(this.cart))
  }

  addToCart(product) {
    const existingItem = this.cart.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      this.cart.push({ ...product, quantity: 1 })
    }
    
    this.notify()
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId)
    this.notify()
  }

  updateQuantity(productId, quantity) {
    const item = this.cart.find(item => item.id === productId)
    if (item) {
      item.quantity = Math.max(0, quantity)
      if (item.quantity === 0) {
        this.removeFromCart(productId)
      } else {
        this.notify()
      }
    }
  }

  getCart() {
    return this.cart
  }

  getCartCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0)
  }

  getCartTotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }
}