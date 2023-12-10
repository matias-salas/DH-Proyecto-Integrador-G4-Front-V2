import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logoDC.png';
import style from './Header.module.css';
import Menu from './Menu/Menu';

const Header = () => {
  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <div className={style.containerLeft}>
          <Link className={style.logoContainer} to="/" aria-label="Página de inicio de Digital Cars">
            <img className={style.logo} src={logo} alt="logo" />
            <span className={style.motto}>Tu viaje, tu auto, tu libertad!</span>
          </Link>

        </div>
        <Menu />
      </nav>
    </header>
  );
};

export default Header;
