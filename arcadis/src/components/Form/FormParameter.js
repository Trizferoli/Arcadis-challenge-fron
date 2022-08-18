import api from '../../service/api';
import './style.css'
import React from 'react'
import { useState, useEffect } from 'react';

import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

function Form() {
    const [parametersLimit, setParametersLimit] = useState([]);
    const [points, setPoints] = useState([]);
    const [selectedParameter, setSelectedParameter] = useState('');
    const [selectedPoint, setSelectedPoint] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [modalDone, setModalDone] = useState(false);
    const [modalError, setModalError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    async function getParameterLimit() {
        try {
            const response = await api.get('/parametros-limite');
            setParametersLimit(response.data);
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
    async function getPoints() {
        try {
            const response = await api.get('/pontos');
            setPoints(response.data);
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
    useEffect(() => {
        getParameterLimit();
        getPoints();
    }, []);


    async function addParameter(point, parameter, value, date) {
        try {
            const response = await api.post('/parametro', {
                id_ponto: point,
                id_parametros_limite: parameter.id,
                valor: value,
                data: new Date(date)
            });

            setModalDone(true);
            setSelectedPoint('');
            setSelectedParameter('');
            setSelectedValue('');
            setSelectedDate('');
            setTimeout(() => { setModalDone(false) }, 2500);
        } catch (error) {
            setErrorMessage(error.response.data.message)
            setModalError(true);
            setTimeout(() => { setModalError(false) }, 3000);
            console.log(error.response.data.message)
        }
    }


    function handleSubmit(event) {
        event.preventDefault();
        addParameter(selectedPoint, selectedParameter, selectedValue, selectedDate);
    }

    function handleChangeParameter(event) {
        setSelectedParameter(event.target.value);
    }

    function handleChangePoint(event) {
        setSelectedPoint(event.target.value);
    }

    function handleChangeValue(event) {
        setSelectedValue(event.target.value);
    }

    function handleChangeDate(event) {
        setSelectedDate(event.target.value);
    }

    return (
        <form className='add-form' onSubmit={handleSubmit}>
            <p className='form-text-p'>Insira o Parâmetro</p>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > :not(style)': { m: 1 },
                }}
            >
                <TextField
                    id="outlined-select-point"
                    select
                    label="Ponto"
                    fullWidth
                    value={selectedPoint}
                    onChange={handleChangePoint}
                >
                    {points.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            Ponto ({option.ponto_x}, {option.ponto_y})
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    id="outlined-select-parameter"
                    select
                    label="Parâmetro"
                    fullWidth
                    value={selectedParameter}
                    onChange={handleChangeParameter}
                >
                    {parametersLimit.map((option) => (
                        <MenuItem key={option.id} value={option}>
                            {option.nome}
                        </MenuItem>
                    ))}
                </TextField>

                < TextField
                    onChange={handleChangeValue}
                    fullWidth
                    value={selectedValue}
                    type="number"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    color="warning" id="demo-helper-text-misaligned-no-helper" label={selectedParameter ? `Valor    ${selectedParameter.unidade_de_medida}` : 'Valor'}
                />

                < TextField
                    onChange={handleChangeDate}
                    fullWidth
                    value={selectedDate}
                    type="date"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    color="warning" id="demo-helper-text-misaligned-no-helper"
                />
            </Box>

            <div
                className={modalDone ? 'show-modal' : 'hide-modal'}
            >
                <Alert severity="success">Ponto cadastrado com sucesso!</Alert>
            </div>
            <div
                className={modalError ? 'show-modal' : 'hide-modal'}
            >
                <Alert severity="error">{errorMessage}</Alert>
            </div>
            <Stack direction="row">
                <Button type="submit"
                    variant="contained" endIcon={<SendIcon />}>
                    Enviar
                </Button>
            </Stack>
        </form >
    )
}

export default Form;
