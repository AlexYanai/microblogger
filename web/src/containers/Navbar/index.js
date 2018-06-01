// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../actions/session';
import NavItem from '../../components/NavItem';

type Props = {
  isAuthenticated: boolean
};

class Navbar extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props;

  handleLogout = ()  => this.props.logout(this.context.router);

  render() {
    const { isAuthenticated } = this.props;

    return (
      <nav className="navbar-main-bar">
        {isAuthenticated &&
          <div className="navbar-main-wrap" >
            <div className="navbar-main-left">
              <NavItem text="Home" to="/" />
            </div>

            <div className="navbar-main-right">
              <NavItem text="Public" to={`/citations`} />
              <div className="navbar-main-divider">|</div>
              <NavItem text="Favorites" to={`/favorites`} />
              <div className="navbar-main-divider">|</div>
              <NavItem text={this.props.currentUser.username} to={`/profile/${this.props.currentUser.id}`} />
              <div className="navbar-main-divider">|</div>

              <NavLink className="navbar-main-link" to={`#`} onClick={this.handleLogout}>
                Sign out
              </NavLink>
              
              <div style={{marginRight: '5px', opacity: '0.3'}}></div>
            </div>
          </div> 
        }
        
        {!isAuthenticated && 
          <div className="navbar-main-wrap" >
            <div className="navbar-main-left">
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
