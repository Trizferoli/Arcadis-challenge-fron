import api from '../../service/api';

import React from "react";
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


function formatedDate(date) {
    const jsData = new Date(date);
    return format(jsData, 'dd/MM/yyyy');
}


function CustomTable({ toggle, selectedPoint, selectedParameter }) {
    const [tableData, setTableData] = useState([]);
    const [allTableData, setAllTableData] = useState([]);
    const [irregulars, setIrregulars] = useState([]);
    const [current, setCurrent] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    async function getPoints() {
        try {
            const response = await api.get('/parametros');
            setTableData(response.data);
            setAllTableData(response.data);
            console.log(response.data)
        }
        catch (error) {
            console.log(error.response.data.message)
        }
    }

    async function getPoints() {
        try {
            const response = await api.get('/parametros');
            setTableData(response.data);
        }
        catch (error) {
            console.log(error.response.data.message)
        }
    }

    async function getIrregulars() {
        try {
            let points = []
            const response = await api.get('/irregulares');
            console.log(response.data)
            for (let point of response.data) {
                points.push(point.valor_parametro)
            }
            setIrregulars(points);
        }
        catch (error) {
            console.log(error.response.data.message)
        }
    }



    useEffect(() => {
        getPoints()
        getIrregulars()
    }, []);



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <Paper sx={{ width: '80%', overflow: 'hidden' }}>
            <TableContainer sx={{ height: 450, maxHeight: 450 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                align='center'
                                style={{ maxWidth: 20 }}
                            >
                                <b>Ponto</b>
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{ maxWidth: 20 }}
                            >
                                <b>Parâmetro</b>
                            </TableCell>

                            <TableCell
                                align='center'
                                style={{ maxWidth: 170 }}
                            >
                                <b>Valor</b>
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{ maxWidth: 170 }}
                            >
                                <b>Unidade</b>
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{ maxWidth: 170 }}
                            >
                                <b>Data da Coleta</b>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row) => {
                            let isIrregular = irregulars.includes(row.valor_parametro);

                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell
                                        sx={{
                                            backgroundColor: toggle && isIrregular ? "#F57C01" : ''
                                        }}
                                        align='center'>({row.ponto_x}, {row.ponto_y})
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            backgroundColor: toggle && isIrregular ? "#F57C01" : ''
                                        }}
                                        align='center'>
                                        {row.nome ? row.nome : '-'}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            backgroundColor: toggle && isIrregular ? "#F57C01" : ''
                                        }}
                                        align='center'>
                                        {row.valor_parametro ? row.valor_parametro : '-'}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            backgroundColor: toggle && isIrregular ? "#F57C01" : ''
                                        }}
                                        align='center'>
                                        {row.unidade_de_medida ? row.unidade_de_medida : '-'}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            backgroundColor: toggle && isIrregular ? "#F57C01" : ''
                                        }}
                                        align='center'>
                                        {row.data_coleta ? formatedDate(row.data_coleta) : '-'}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={tableData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}




export default CustomTable;