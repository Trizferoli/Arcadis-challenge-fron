import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import CustomTablePoints from '../../components/Table/TablePoints';

import '../../style-global.css'
import './style.css'

function DashboardPoints() {
    return (
        <div className="main-global">
            <div className='dashboard'>
                <Sidebar></Sidebar>
                <div className='dashboard-right'>
                    <Header header='Pontos'></Header>
                    <div className='dashboard-right-main'>
                        <CustomTablePoints ></CustomTablePoints>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DashboardPoints