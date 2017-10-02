import React, { Component, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';

class NavItem extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  clearCitations() {
    console.log("HERE");
  }

  render () {
    const { router }   = this.context
    const { text, to } = this.props;
    var routeExist     = router && router.route && router.route.match && router.route.location

    if (routeExist) {
      routeExist = (router.route.location.pathname === to) ? true : false;
    }
    
    return (
      <NavLink className="nav-item-link" activeClassName="nav-item-active" to={to} onClick={this.clearCitations}>
        <div className={routeExist ? "nav-item-bottom-border" : "nav-item-bottom-border-alt" }>
          {text}
        </div>
      </NavLink>
    )
  }
}

export default NavItem;