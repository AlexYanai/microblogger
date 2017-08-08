// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  navbar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 1rem',
    height: '70px',
    background: '#fff',
    boxShadow: '0 1px 1px rgba(0,0,0,.1)',
  },

  link: {
    color: '#555459',
    fontSize: '22px',
    fontWeight: 'bold',
    ':hover': {
      textDecoration: 'none',
    },

    ':focus': {
      textDecoration: 'none',
    },
  },
});

const Navbar = () => (
  <nav className={css(styles.navbar)}>
    <NavLink to="/" className={css(styles.link)}>Cite</NavLink>
  </nav>
)

export default Navbar;