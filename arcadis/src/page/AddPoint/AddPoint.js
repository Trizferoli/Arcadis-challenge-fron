import React from 'react'
import '../../style-global.css'
import './style.css'
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header'
import FormPoint from '../../components/Form/FormPoint';



function AddPoint() {

    return (
        <div className="main-global">
            <div className='dashboard'>
                <Sidebar></Sidebar>
                <div className='dashboard-right'>
                    <Header header='Adicionar Ponto'></Header>
                    <main className='form-container'>
                        <FormPoint nome={['Ponto x', 'Ponto y']} idade='20'></FormPoint>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default AddPoint;