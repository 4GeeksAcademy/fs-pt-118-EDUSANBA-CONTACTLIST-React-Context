import React, { useEffect } from "react";

import agendaServices from "../services/agendaServices.jsx";

import AgendaContacts from "../components/AgendaContacts.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


export const Home = () => {

  const {store, dispatch} =useGlobalReducer()


useEffect(() => {
  
  if (store.contacts.length === 0) {
    agendaServices.getUserAgenda().then(data => {
    
      const contactsWithAvatar = data.contacts.map(contact => ({ 
        ...contact,
        avatar: contact.avatar || agendaServices.avatarRamdom() 
      }));

      dispatch({ type: 'saveContacts', payload: { contacts: contactsWithAvatar } });
    });
  }
}, []);









	return (
		<div className="text-center mt-5">
			
			<AgendaContacts/>
		</div>
	);
};