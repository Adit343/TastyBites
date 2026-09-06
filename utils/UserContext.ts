import React from 'react';
import { UserContextType } from '../types/types';

const UserContext = React.createContext<UserContextType>({
  loggedInUser: null,
  setUserName: () => {},
});

export default UserContext;
