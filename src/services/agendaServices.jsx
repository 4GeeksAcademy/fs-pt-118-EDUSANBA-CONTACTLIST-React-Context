const agendaServices = {}
const url = 'https://playground.4geeks.com/contact/'
const user = 'Edusanba'


agendaServices.createUser = async () =>{
    try {
        const resp = await fetch(url+'agendas/'+user, {
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            }
        })
        if(!resp.ok) throw new Error('error creating user')
            const data = await resp.json();
            agendaServices.getUserAgenda()
            return data

    } catch (error){
        console.log(error)
        return error
    };
    
}


agendaServices.getUserAgenda = async () => {
    try {
        
        const resp = await fetch(url+'agendas/'+ user+'/contacts')
        if (!resp.ok) throw new Error('error fetching agenda') 
            const data = await resp.json();
       
        return data
    } catch (error) {
        agendaServices.createUser()
        console.log(error)
        return error
    }

}

agendaServices.createContact = async (newContact) =>{
    try {
        const resp = await fetch(url+'agendas/'+user+'/contacts', {
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(newContact)
        })
        if(!resp.ok) throw new Error('error creating user')
            const data = await resp.json();
            
            return data

    } catch (error){
        console.log(error)
        return error
    };
    
}

agendaServices.deleteContact = async (idUser) =>{
    try {
        const resp = await fetch(url+'agendas/'+user+'/contacts/'+idUser, {
            method: 'DELETE'
            
        })
        if(!resp.ok) throw new Error('error delete user')
           

    } catch (error){
        console.log(error)
        return error
    };
    
}


agendaServices.updateContact = async (newContact, id) =>{
    try {
        const resp = await fetch(url+'agendas/'+user+'/contacts/'+id, {
            method: 'PUT',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(newContact)
        })
        if(!resp.ok) throw new Error('error creating user')
            const data = await resp.json();
          
            return data

    } catch (error){
        console.log(error)
        return error
    };
    
}



agendaServices.avatarRamdom =() =>{   
     const gender = Math.random() > 0.5 ? 'men' : 'women'; 
  const id = Math.floor(Math.random() * 100); 
  return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
}

export default agendaServices