// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import { NavLink } from 'react-router-dom';
import { logout } from '../../actions/session';
import NavItem from '../../components/NavItem';

const styles = StyleSheet.create({
  bar: {
    display: 'flex',
    position: 'fixed',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: '1030',
    width: '100%',
    background: 'var(--white)',
    height: '70px',
    top: '0',
    boxShadow: '0 1px 1px rgba(0,0,0,.1)',
  },

  wrap: {
    display: 'inherit',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    fontSize: '18px',
    paddingTop: '1.75%',
  },

  navLeft: {
    alignItems: 'center',
    height: '100%',
    flex: '1 1 auto',
    paddingLeft: '15px',
  },

  navRight: {
    flex: '0 0 auto',
    height: '100%',
    display: 'inline-flex',
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
            <div className={`${css(styles.navLeft)}`}>
              <NavItem text="Home" to="/" />
            </div>

            <div className={`${css(styles.navRight)}`}>
              <NavItem text={this.props.currentUser.username} to={`/profile/${this.props.currentUser.id}`} />
              
              <div style={{marginLeft: '5px', marginRight: '5px'}}>|</div>
              <NavItem text="Public" to={`/citations`} />
              <div style={{marginLeft: '5px', marginRight: '5px'}}>|</div>

              <NavLink className={`${css(styles.link)}`} to={`#`} onClick={this.handleLogout}>
                Sign out
              </NavLink>
              <div style={{marginRight: '5px'}}></div>
            </div>
          </div> 
        }
        
        {!isAuthenticated && 
          <div className={css(styles.wrap)} >
            <div className={`${css(styles.navLeft)}`}>
              <NavItem text="Home" to="/" />
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
