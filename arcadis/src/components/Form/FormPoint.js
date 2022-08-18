import api from '../../service/api';
import './style.css'

import React from 'react'
import { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

function Form({ nome }) {
    const [pointX, setPointX] = useState('');
    const [pointY, setPointY] = useState('');
    const [modalDone, setModalDone] = useState(false);
    const [modalError, setModalError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function addPoint(x, y) {
        try {
            await api.post('/ponto', {
                x,
                y
            });
            setModalDone(true);
            setPointX('');
            setPointY('');
            setTimeout(() => { setModalDone(false) }, 2500);
        } catch (error) {
            setErrorMessage(error.response.data.message)
            setModalError(true);
            setTimeout(() => { setModalError(false) }, 2500);
            console.log(error.response.data.message)
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        addPoint(pointX, pointY)
    }

    return (
        <form
            className='add-form'
            onSubmit={handleSubmit}
        >
            <p className='form-text-p'>Insira os Pontos</p>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > :not(style)': { m: 1 },
                }}
            >
                < TextField
                    onChange={(e) => { setPointX(e.target.value) }}
                    fullWidth
                    value={pointX}
                    type="number"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    color="warning" id="demo-helper-text-misaligned-no-helper" label='Ponto X'
                />
                < TextField
                    onChange={(e) => { setPointY(e.target.value) }}
                    fullWidth
                    value={pointY}
                    type="number"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    color="warning" id="demo-helper-text-misaligned-no-helper" label='Ponto Y'
                />
            </Box>

            <div className={modalDone ? 'show-modal' : 'hide-modal'}>
                <Alert severity="success">Ponto cadastrado com sucesso!</Alert>
            </div>
            <div className={modalError ? 'show-modal' : 'hide-modal'}>
                <Alert severity="error">{errorMessage}</Alert>
            </div>

            <Stack direction="row">
                <Button type="submit"
                    variant="contained" endIcon={<SendIcon />}>
                    Enviar
                </Button>
            </Stack>
        </form>
    )
}

export default Form;
