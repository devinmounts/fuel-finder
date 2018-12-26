import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SignOutButton from '../SignOut';
import LightBrain from '../../assets/images/smart-energy.png';
import './styles.css';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import StickyNav from './sticky';

const Navigation = ( {authUser, onCollapse, visible} ) => {
  return(
    <div 
    id='navbar'
    className={visible ? 'slideIn' : 'slideOut'}
    >
      <img className='nav-icon' src={LightBrain}/>
        <FontAwesomeIcon 
          icon={faTimes} 
          color='#ac8e42'
          size='lg'
          className='menu-bars'
          onClick={onCollapse}
      /> 
      { authUser ? 
        <NavigationAuth 
        authUser={authUser} 
        onCollapse={onCollapse}
        />
       :
        <NavigationNonAuth onCollapse={onCollapse} />}

    </div>
  );
}

const NavigationAuth = ({ authUser, onCollapse }) => (
    <ul>
      <li>
        <Link onClick={onCollapse} to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link onClick={onCollapse} to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link onClick={onCollapse} to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      {authUser.roles.includes(ROLES.ADMIN) && (
        <li>
          <Link onClick={onCollapse} to={ROUTES.ADMIN}>Admin</Link>
        </li>
      )}
      <li>
        <SignOutButton  onCollapse={onCollapse}/>
      </li>
    </ul>  
);

const NavigationNonAuth = ({ onCollapse }) => (
    <ul>
      <li>
        <Link  onClick={onCollapse} to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
      <li>
        <Link  onClick={onCollapse} to={ROUTES.LANDING}>Landing</Link>
      </li>
    </ul>  
);

class NavCollapse extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false,
    }

    this.handleShowCollapse = this.handleShowCollapse.bind(this);
  }

  handleShowCollapse() {
    this.setState({
      show: !this.state.show,
    });
  }


  render() {
    return (
      <div className='navigation-container'>
        <img className='nav-icon' src={LightBrain}/>
        <FontAwesomeIcon 
          icon={faBars} 
          color='#ac8e42'
          size='lg'
          className='menu-bars'
          onClick={this.handleShowCollapse}
        /> 
        <Navigation
          visible={this.state.show}
          authUser={this.props.authUser}
          onCollapse={this.handleShowCollapse}
        />
        <StickyNav/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
})

export default connect(mapStateToProps)(NavCollapse);