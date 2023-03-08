import Footer from '../../components/app/footer/Footer';
import Navbar2 from '../../components/app/header/navbar2/Navbar2';
import Header from '../../components/app/header/Header';
import { useState } from 'react';
import useEventListener from '../../hooks/useEventListener';

export default function UserLayout({ components }) {
  const [isMobile, setIsMobile] = useState(false);

  const windowSizeHandler = () => {
    setIsMobile(window.innerWidth < 767);
  };

  useEventListener('resize', windowSizeHandler);

  return (
    <>
      {isMobile ? <Header /> : <Navbar2 />}

      {/* Display child components */}
      {components}
      <Footer />
    </>
  );
}
