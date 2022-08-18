import React, { useState, useEffect } from 'react'
import { Switch, TextField, MenuItem, Box, getTableHeadUtilityClass } from '@mui/material';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import CustomTable from '../../components/Table/TableParametros';
import api from '../../service/api';
import '../../style-global.css'
import './style.css'


function Dashboard() {
    const [toggle, setToggle] = useState(false);
    const [points, setPoints] = useState([]);
    const [parametersLimit, setParametersLimit] = useState([]);
    const [selectedPoint, setSelectedPoint] = useState('');
    const [selectedParameter, setSelectedParameter] = useState('');

    async function getPoints() {
        try {
            const response = await api.get('/pontos');
            setPoints(response.data);
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

    async function getParameterLimit() {
        try {
            const response = await api.get('/parametros-limite');
            setParametersLimit(response.data);
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

    useEffect(() => {
        getParameterLimit();
        getPoints();
    }, []);



    function handleChange(event) {
        setToggle(event.target.checked)
    }

    function handleChangeParameter(event) {
        setSelectedParameter(event.target.value);
    }

    function handleChangePoint(event) {
        setSelectedPoint(event.target.value);
    }

    return (
        <div className="main-global">
            <div className='dashboard'>
                <Sidebar></Sidebar>
                <div className='dashboard-right'>
                    <Header header='Parâmetros'></Header>
                    <div className='dashboard-right-main'>
                        <CustomTable toggle={toggle}
                            selectedParameter={selectedParameter}
                            selectedPoint={selectedPoint}
                        ></CustomTable>
                        <Box
                            sx={{
                                display: 'flex',
                                width: '400',
                                flexDirection: 'row',
                                alignItems: 'center',
                                '& > :not(style)': { m: 1 },
                            }}
                        >
                            <div className='dashboard-footer'>
                                <p className='form-text-p'>Parâmetros irregulares:</p>
                                <Switch
                                    checked={toggle}
                                    color="warning"
                                    onChange={handleChange}
                                />
                            </div>
                            <TextField
                                id="outlined-select-point"
                                select
                                fullWidth
                                label="Parâmetro"
                                value={selectedParameter}
                                onChange={handleChangeParameter}
                            >
                                <MenuItem key={0} value={''}>
                                    -
                                </MenuItem>
                                {parametersLimit.map((option) => (
                                    <MenuItem key={option.id} value={option}>
                                        {option.nome}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="outlined-select-point"
                                select
                                fullWidth
                                label="Ponto"
                                value={selectedPoint}
                                onChange={handleChangePoint}
                            >
                                <MenuItem key={0} value={''}>
                                    -
                                </MenuItem>
                                {points.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        ({option.ponto_x}, {option.ponto_y})
                                    </MenuItem>
                                ))}
                            </TextField>

                        </Box>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Dashboard;