import React from 'react';

const UserContext = React.createContext({
  loggedInUser: null,
  setUserName: () => {},
});

export default UserContext;
