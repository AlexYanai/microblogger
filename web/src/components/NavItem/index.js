import React, { Component, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  active: {
    color: 'var(--palette-dark-blue)', 
    margin: 'auto',
  },

  bottomBorder: {
   height: '100%',
   borderBottom: '2px solid var(--palette-med-blue)',
   width: 'fit-content',
  },

  bottomBorderOther: {
   height: '100%',
   borderBottom: '2px solid var(--palette-white)',
   width: 'fit-content',
  },

  link: {
    opacity: '0.85',
    transition: 'all 0.15s ease-out 0s',
    color: 'var(--palette-dark-gray)',
    height: '100%',
    margin: 'auto',

    ':hover': {
      opacity: '1',
    },

    ':focus': {
      opacity: '1',
    },
  }
});

class NavItem extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  render () {
    const { router }   = this.context
    const { text, to } = this.props;
    var routeExist     = router && router.route && router.route.match && router.route.location

    if (routeExist) {
      routeExist = (router.route.location.pathname === to) ? true : false;
    }
    
    return (
      <NavLink className={`${css(styles.link)}`} activeClassName={`${css(styles.active)}`} to={to}>
        <div className={routeExist ? `${css(styles.bottomBorder)}` : `${css(styles.bottomBorderOther)}` }>
          {text}
        </div>
      </NavLink>
    )
  }
}

export default NavItem;