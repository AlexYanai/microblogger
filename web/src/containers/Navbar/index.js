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

  link: {
    flex: '1 auto',
    color: 'var(--palette-med-gray)',
    fontSize: '22px',
    fontWeight: 'bold',
    ':hover': {
      textDecoration: 'none',
    },

    ':focus': {
      textDecoration: 'none',
    },
  },

  linkRight: {
    textAlign: 'right',
  },

  badge: {
    width: '45px',
    height: '45px',
    fontSize: '30px',
    color: 'var(--palette-med-gray)',
    background: 'rgba(255,255,255,.2)',
    borderRadius: '5px',
  },

  wrap: {
    display: 'inherit',
    alignItems: 'center',
    color: 'var(--palette-med-gray)',
    fontSize: '20px',
  },

  logoutButton: {
    padding: '0',
    background: 'transparent',
    border: '0',
    cursor: 'pointer',
  },
});

type Props = {
  isAuthenticated: boolean
};

class Navbar extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props;

  handleLogout = () => this.props.logout(this.context.router);

  render() {
    const { isAuthenticated } = this.props;

    return (
      <nav className={css(styles.bar)}>
        <NavLink to="/" className={css(styles.link)}>Cite</NavLink>
        {isAuthenticated &&
          <div className={css(styles.wrap)} >
            <div className={css(styles.username)}>
              <NavLink to={`citations`}>All</NavLink>
              <NavLink to={`profile/${this.props.currentUser.id}`}>{this.props.currentUser.username}</NavLink>
            </div>

            <div className={css(styles.link, styles.linkRight)}>
              <button type="button" 
                      className={css(styles.logoutButton)}
                      onClick={this.handleLogout}>
                
                <div className={css(styles.badge)}>
                  <span className="fa fa-sign-out" />
                </div>
              </button>
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
