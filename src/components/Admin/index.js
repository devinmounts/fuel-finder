<<<<<<< HEAD
import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { withAuthentication, withAuthorization } from '../Session';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    }
  }

  componentDidMount(){
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount(){
    this.props.firebase.users().off();
  }
  render() {
    const { users, loading } =this.state;
    return(
      <div>
        <h1>Admin</h1>

        {loading && <div>Loading...</div>}

        <UsersList users={users} />
      </div>
    );
  }
}

const UsersList = ( { users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <br/>
        <span>
          <strong>Email:</strong> {user.email}
        </span>
        <br/>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
        <hr/>
        <br/>
      </li>
    ))}
  </ul>
);

export default compose(
  withFirebase,
)(AdminPage);
=======
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { UserList, UserItem } from '../Users';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

const AdminPage = () => (
  <div>
    <h1>Admin</h1>
    <p>The Admin Page is accessible by every signed in admin user.</p>

    <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.ADMIN} component={UserList} />
    </Switch>
  </div>
);

const condition = authUser =>
  authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AdminPage)
>>>>>>> redux
