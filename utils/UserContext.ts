import React from 'react';
import { UserContextType } from '../types/types';

const UserContext = React.createContext<UserContextType>({
  loggedInUser: null,
  userProfile: null,
  setUserName: () => {},
  loginUser: () => false,
  signupUser: () => false,
  logoutUser: () => {},
});

export default UserContext;
