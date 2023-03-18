import React from 'react'
import { createContext, useContext, useState } from 'react';


const ClickedUsersContext = createContext();

export const useClickedUsers = () => {
  return useContext(ClickedUsersContext);
};

const ClickedUsers = ({children}) => {
  const [clickedUsers, setClickedUsers] = useState([]);
  
  const addClickedUser = (user) => {
       setClickedUsers((prevClickedUsers) => [...prevClickedUsers,user]);
      };

  return (
    <>
      <ClickedUsersContext.Provider value={{ clickedUsers, addClickedUser }}>
         {children}
    </ClickedUsersContext.Provider>
    </>
  )
}

export default ClickedUsers