import '../styles/globals.css'
import Nav from './Nav';
import { useCartState, CartContext } from '../hooks/use-cart';
function MyApp({ Component, pageProps }) {
    const cart = useCartState();
  return (
      <CartContext.Provider value={cart}>
        <Nav />
        <Component {...pageProps} />
      </CartContext.Provider>
  )
}

export default MyApp
