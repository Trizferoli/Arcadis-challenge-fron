import React, { useState } from 'react'
import { Switch, FormControlLabel } from '@mui/material';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import CustomTable from '../../components/Table/TableParametros';
import '../../style-global.css'
import './style.css'


function Dashboard() {
    const [toggle, setToggle] = useState(false);

    function handleChange(event) {
        setToggle(event.target.checked)
    }

    return (
        <div className="main-global">
            <div className='dashboard'>
                <Sidebar></Sidebar>
                <div className='dashboard-right'>
                    <Header header='Parâmetros'></Header>
                    <div className='dashboard-right-main'>
                        <CustomTable toggle={toggle}></CustomTable>
                        <div className='dashboard-footer'>
                            <p className='form-text-p'>Marcar parâmetros irregulares:</p>
                            <Switch
                                checked={toggle}
                                color="warning"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;