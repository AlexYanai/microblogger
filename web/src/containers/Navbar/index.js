// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import { NavLink } from 'react-router-dom';
import { logout } from '../../actions/session';

const styles = StyleSheet.create({
  bar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    background: 'var(--white)',
    padding: '20px',
    height: '70px',
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

  logoutButton: {
    padding: '0',
    background: 'transparent',
    border: '0',
    cursor: 'pointer',
  },
});

type Props = {
  currentUser: Object,
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
    // const { currentUser, isAuthenticated } = this.props;

    return (
      <div className={css(styles.bar)}>
          <NavLink to="/" className={css(styles.link)}>Cite</NavLink>
          {isAuthenticated &&
            <div className={css(styles.link, styles.linkRight)}>
              <button type="button" 
                      className={css(styles.logoutButton)}
                      onClick={this.handleLogout}>
                
                <div className={css(styles.badge)}>
                  <span className="fa fa-sign-out" />
                </div>
              </button>
            </div> 
          }
      </div>
    )
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    // currentUser: state.session.currentUser,
  }),
  { logout }
)(Navbar);
