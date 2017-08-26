// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import { NavLink } from 'react-router-dom';
import { logout } from '../../actions/session';

const styles = StyleSheet.create({
  bar: {
    display: 'flex',
    position: 'fixed',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: '1030',
    width: '100%',
    background: 'var(--white)',
    padding: '20px',
    height: '70px',
    top: '0',
    boxShadow: '0 1px 1px rgba(0,0,0,.1)',
  },

  linkRight: {
    textAlign: 'right',
  },

  wrap: {
    display: 'inherit',
    alignItems: 'center',
    width: '100%',
    color: 'var(--palette-med-gray)',
    fontSize: '20px',
  },

  navLeft: {
    alignItems: 'center',
    flex: '1 1 auto',
    paddingLeft: '15px',
  },

  navRight: {
    flex: '0 0 auto',
  },

  mainNavLink: {
    opacity: '0.8',
    transition: 'all 0.15s ease-out 0s',

    ':hover': {
      opacity: '1',
    },

    ':focus': {
      opacity: '1',
    },
  }
});

type Props = {
  isAuthenticated: boolean
};

class Navbar extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props;

  handleLogout = ()                => this.props.logout(this.context.router);
  isActiveFunc = (match, location) => (location && location.pathname && !!location.pathname.match(/profile/));

  render() {
    const { isAuthenticated } = this.props;

    return (
      <nav className={css(styles.bar)}>
        {isAuthenticated &&
          <div className={css(styles.wrap)} >
            <div className={`navLeft ${css(styles.navLeft)}`}><NavLink exact activeStyle={{color: 'var(--palette-med-blue)', borderBottom: '1px solid var(--palette-med-blue)' }} to="/" >Home</NavLink></div>
            <div className={`navRight ${css(styles.navRight)}`}>
              <NavLink className={`mainNavLink ${css(styles.mainNavLink)}`} activeStyle={{color: 'var(--palette-med-blue)', borderBottom: '1px solid var(--palette-med-blue)' }} to={`/citations`}>Public</NavLink>
              <NavLink className={`mainNavLink ${css(styles.mainNavLink)}`} isActive={this.isActiveFunc} activeStyle={{color: 'var(--palette-med-blue)', borderBottom: '1px solid var(--palette-med-blue)' }} to={`profile/${this.props.currentUser.id}`}>{this.props.currentUser.username}</NavLink>
              <NavLink className={`mainNavLink ${css(styles.mainNavLink)}`} to={`#`} onClick={this.handleLogout}>Sign out</NavLink>
            </div>
          </div> 
        }
      </nav>
    )
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated
  }),
  { logout }
)(Navbar);
