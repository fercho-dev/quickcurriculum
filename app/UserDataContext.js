'use client'

import React, { useState } from 'react';

const UserDataContext = React.createContext();

export default UserDataContext;

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};