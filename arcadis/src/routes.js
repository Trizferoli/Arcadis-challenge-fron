import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddPoint from './page/AddPoint/AddPoint';
import DashboardParameters from './page/Dashboard/DashboardParameters';
import DashboardPoints from './page/Dashboard/DashboardPoints';
import AddParameter from './page/AddParameter/AddParameter'

function AppRoutes() {
    return (
        <Routes>
            <Route
                path='/add-point'
                element={<AddPoint />}></Route>
            <Route
                path='/add-parameter'
                element={<AddParameter />}></Route>
            <Route
                path='/'
                element={<DashboardParameters />}>
            </Route>
            <Route
                path='/parametros'
                element={<DashboardParameters />}>

            </Route>
            <Route
                path='/points'
                element={<DashboardPoints />}>

            </Route>
            <Route
                path='/irregulars'
                element={<DashboardPoints />}>

            </Route>
        </Routes>
    )
}

export default AppRoutes;