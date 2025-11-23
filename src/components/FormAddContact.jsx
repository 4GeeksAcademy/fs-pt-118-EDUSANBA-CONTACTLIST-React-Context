import React, { useState, useEffect } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import agendaServices from "../services/agendaServices.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer";

const FormAddContact = () => {
    const newContact = {
        "name": '',
        "phone": '',
        "email": '',
        "address": '',
        "id":''
    }
    
    const { store, dispatch } = useGlobalReducer()
    
    
    const [labelBtn, setLabelBtn] = useState(store.formEdit ? "Guardar cambios" : "Crear contacto")
    const [title, setTitle] = useState(store.formEdit ? "Editar contacto" : "Nuevo contacto")
    const navigate = useNavigate()
    const [dataContact, setDataContact] = useState(store.formEdit ? store.contacEdit : newContact)

 
    const handleChange = e =>{
       

        const { name, value } = e.target;
        setDataContact({ ...dataContact, [name]: value })
        
   
    }


    const handleSave = () => {
      
        if (store.formEdit) {

            agendaServices.updateContact(dataContact, store.contacEdit.id)
            dispatch({ type: 'updatedContact', payload: { contactUpdated: dataContact, idUpdate: store.contacEdit.id } })
            dispatch({ type: 'formEdit', payload: { formEdit: false } })
            navigate('/')
            return
        }
        agendaServices.createContact(dataContact).then(dataContact => {
            dispatch({ type: 'addContact', payload: { newContact: dataContact } })
            navigate('/')
        })


       
    }



    return (
        <>
            <div className="container my-5">
                <Form onSubmit={handleSave}>
                    <h2 className="text-center">{title}</h2>
                    <div className="form-floating mb-2">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Nombre completo" name="name" value={dataContact.name} required onChange={handleChange}></input>
                        <label htmlFor="floatingInput">Nombre Completo</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input type="email" className="form-control" id="floatingInput" placeholder="Email" name="email" value={dataContact.email} required onChange={handleChange}></input>
                        <label htmlFor="floatingInput">Email</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input type="tel" className="form-control" id="floatingInput" placeholder="Telefono" name="phone" value={dataContact.phone} required onChange={handleChange}></input>
                        <label htmlFor="floatingInput">Telefono</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Dirección" name="address"  value={dataContact.address} required onChange={handleChange}></input>
                        <label htmlFor="floatingInput">Dirección</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input type="submit" className="btn btn-primary w-100" id="floatingInput" placeholder="Dirección" value={labelBtn}></input>
                        <Link to="/">
                            <span className="navbar-brand mb-0 h1">Volver a la lista</span>
                        </Link>
                    </div>
                </Form>


            </div>
        </>
    )

}

export default FormAddContact