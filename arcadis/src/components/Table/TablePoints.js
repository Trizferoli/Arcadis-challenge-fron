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


function CustomTable() {
    const [tableData, setTableData] = useState([]);

    async function getPoints() {
        try {
            const response = await api.get('/pontos');
            setTableData(response.data);
            console.log(response.data)
        }
        catch (error) {
            console.log(error.response.data.message)
        }
    }


    useEffect(() => {
        getPoints()
    }, []);


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
                                style={{ width: 1 }}
                            >
                                <b>Índice</b>
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{ maxWidth: 20 }}
                            >
                                <b>Ponto<br />(x, y)</b>
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{ maxWidth: 20 }}
                            >
                                <b>Parâmetros Catalogados</b>
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row) => {
                            const parameters = [];
                            row.parametros.map((parameter) => {
                                parameters.push(parameter.nome)
                            })

                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align='left'>{row.id}</TableCell>
                                    <TableCell align='center'>({row.ponto_x}, {row.ponto_y})</TableCell>
                                    <TableCell align='center'>
                                        {parameters.length > 0 ? parameters.join(', ') : '-'}
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