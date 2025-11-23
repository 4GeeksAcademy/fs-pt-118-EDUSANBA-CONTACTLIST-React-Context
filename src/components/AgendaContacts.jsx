import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import agendaServices from "../services/agendaServices.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const AgendaContacts = () => {
  const [imgRandom, setImgRamdom] = useState([]);
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate()
  const [contactToDelete, setContactToDelete] = useState(null)


  const handleEditContact = (el) => {

    const contactEdit = {
      "id": el.id,
      "name": el.name,
      "email": el.email,
      "phone": el.phone,
      "address": el.address,

    }
    dispatch({ type: 'formEdit', payload: { formEdit: true } })
    dispatch({ type: 'editContact', payload: { contacEdit: contactEdit } })
    navigate('/formcontact')




  }


  const handleDeleteContact = (idUser) => {
    agendaServices.deleteContact(idUser)
    console.log('contactos:', store.contacts)
    dispatch({ type: 'saveContacts', payload: { contacts: store.contacts.filter(contact => contact.id !== idUser) } }) //se actualiza el store de los contactos filtrando el ya eliminado
    setContactToDelete(null)

  }

  return (
    <div className="container">


      {store.contacts?.map(el => <div key={el.id} className="card">
        <div className="row">
          <div className="col-md-4 p-2 align-content-center">
            <img src={el.avatar} className="img-fluid rounded-circle avatar" alt={el.name}></img>
          </div>
          <div className="col-md-8 d-flex" >
            <div className="card-body text-start my-4 ">
              <h5 className="card-title fs-2">{el.name}</h5>
              <p className="fs-5 text-body-secondary mb-2"><span><i className="fa-solid fa-location-dot me-3 text-danger"></i></span>{el.address}</p>
              <p className="fs-5 text-body-secondary mb-2"><span><i className="fa-solid fa-phone me-3 text-primary"></i></span>{el.phone}</p>
              <p className="fs-5 text-body-secondary mb-2"><span><i className="fa-solid fa-envelope me-3 text-success"></i></span>{el.email}</p>
            </div>
            <div className="d-flex my-5 me-2">
              <span ><i className="fa-solid fa-user-pen me-4 text-primary-emphasis fs-5 pointer" onClick={() => handleEditContact(el)}></i></span>
              <span ><i className="fa-solid fa-user-xmark me-5 text-danger fs-5 pointer" onClick={() => setContactToDelete(el)}></i></span>
            </div>
          </div>

        </div>
      </div>)}
      {contactToDelete && (<div className="modal fade show d-block" tabIndex="-1" aria-modal="true" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-body text-center fs-5">
              ¿Deseas eliminar a <strong>{contactToDelete.name}</strong>? Esta acción no se puede deshacer.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setContactToDelete(null)}>Cancelar</button>
              <button type="button" className="btn btn-primary" onClick={() => handleDeleteContact(contactToDelete.id)}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>)
      }
    </div>
  )

}
export default AgendaContacts