import { useEffect } from 'react';

import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';

import { useSelector, useDispatch } from 'react-redux';
import { getCartItems } from './features/cart/cartSlice';
import Modal from './components/Modal';

function App() {
  const { isLoading } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
