import React from 'react'
import { NavLink } from 'react-router-dom';
import './style.css';
import logoArcadis from '../../assets/arcadis--600.png'

function Sidebar() {
    return (
        <aside className='sidebar-container'>
            <img className='sidebar-icon' src={logoArcadis} alt='logo empresa arcadis' draggable='false'>
            </img>
            <div className='sidebar-menu'>
                <NavLink to='/add-point' className={({ isActive }) => isActive ? "link-selected" : "link"}>
                    Adicionar Ponto
                </NavLink>
                <NavLink to='/add-parameter' className={({ isActive }) => isActive ? "link-selected" : "link"}>
                    Adicionar Parametro
                </NavLink>
                <NavLink to='/' className={({ isActive }) => isActive ? "link-selected" : "link"}>
                    Parâmetros
                </NavLink>
                <NavLink to='/points' className={({ isActive }) => isActive ? "link-selected" : "link"}>
                    Pontos
                </NavLink>

            </div>
        </aside>
    )
}

export default Sidebar;
