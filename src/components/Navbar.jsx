import { Link } from "react-router-dom";
import logo from "../assets/img/edusanba-logo.svg";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
 const {store, dispatch} =useGlobalReducer()
 
const handleAddNewContact = () =>{
    dispatch({type: 'formEdit', payload:{formEdit: false}})
    
}

    return (
        <nav className="navbar">
            <div className="container d-flex align-items-center justify-content-between">
                <Link to="/" className="d-flex align-items-center">
                    <img src={logo} alt="Edusanba" className="brand-logo me-2" />
                    <span className="fw-semibold">Contactos</span>
                </Link>
                <div className="ms-auto">
                    <Link to="/formcontact">
                        <button className="btn btn-success" onClick={handleAddNewContact}>Nuevo contacto</button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};