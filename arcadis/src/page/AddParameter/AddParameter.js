import React from 'react'
import '../../style-global.css'
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header'
import FormParameter from '../../components/Form/FormParameter';



function AddParameter() {

    return (
        <div className="main-global">
            <div className='dashboard'>
                <Sidebar></Sidebar>
                <div className='dashboard-right'>
                    <Header header='Adicionar Parâmetro'></Header>
                    <main className='form-container'>
                        <FormParameter nome={['Valor', 'Data']}></FormParameter>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default AddParameter;