import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Person } from '../types/peopleTypes';

//MUI Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const TablePage = () => {

    const [data, setData] = useState([]);

    const rows = [
        data.map((person) => {
            return ([person['age'], person['hair_colour'], person['height'], person['name'], person['sex'], person['societies'], person['student_id'], person['subject'], person['year']])
        })
    ];


    const getData = async () => {
        await axios.get("http://127.0.0.1:5000/people").then((resp) => {
            setData(resp.data);
            console.log('test')
        })
    }


    useEffect(() => {
        getData();
    }, [])


    return (

        <div className='w-full h-screen overflow-hidden bg-black'>
            <div className='w-full h-[200px]'>
                <h1 className='text-red-800'>Navbar</h1>
                <button>People</button>
                <button>People</button>
            </div>
            <div className=''>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>

                                <TableCell>Student ID</TableCell>
                                <TableCell align="right">Age&nbsp;</TableCell>
                                <TableCell align="right">Hair Colour</TableCell>
                                <TableCell align="right">Height&nbsp;</TableCell>
                                <TableCell align="right">Name&nbsp;</TableCell>
                                <TableCell align="right">Sex&nbsp;</TableCell>
                                <TableCell align="right">Societies</TableCell>
                                <TableCell align="right">Subject&nbsp;</TableCell>
                                <TableCell align="right">Year&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.length > 0 ? data.map((person, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="right">{person['student_id']}</TableCell>
                                    <TableCell align="right">{person['age']}</TableCell>
                                    <TableCell align="right">{person['hair_colour']}</TableCell>
                                    <TableCell align="right">{person['height']}</TableCell>
                                    <TableCell align="right">{person['name']}</TableCell>
                                    <TableCell align="right">{person['sex']}</TableCell>
                                    <TableCell align="right">{person['societies']}</TableCell>
                                    <TableCell align="right">{person['subject']}</TableCell>
                                    <TableCell align="right">{person['year']}</TableCell>

                                </TableRow>
                            )) : null}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    )
}

export default TablePage
