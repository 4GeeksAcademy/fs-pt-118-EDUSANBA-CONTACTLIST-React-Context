import agendaServices from "./services/agendaServices.jsx"

export const initialStore=()=>{
  return{
    formEdit: false,
    contacEdit:{},
    imgrandom:[],
    contacts: [],
    message: null,
    todos: [
      {
        id: 1,
        title: "Preparar café",
        background: null,
      },
      {
        id: 2,
        title: "Leer correos",
        background: null,
      }
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){

    case 'updatedContact':
    
      return{
        ...store,
        contacts: store.contacts.map(contact =>
          contact.id === action.payload.idUpdate
          ? {...contact, ...action.payload.contactUpdated} 
          : contact
        )
      }

    case 'formEdit':
      return{
        ...store,
        formEdit: action.payload.formEdit
      }

    case 'editContact':
  
     return{
      ...store,
      contacEdit: action.payload.contacEdit 
     
     }

    case 'addContact':

    const {newContact} = action.payload
     newContact.avatar = agendaServices.avatarRamdom()


      return{
        ...store,
        contacts : [...store.contacts, newContact]
      }


    
    case 'deleContact':
      return{
        ...store,
       contacts: store.contacts.filter((e) => e.id !== action.payload.id) 
      }
    
    case 'saveContacts':
           
     
      return {
        ...store,
        contacts: action.payload.contacts 
      };

   
    default:
      throw Error('Unknown action.');
  }    
}