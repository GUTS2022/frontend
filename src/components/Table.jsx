import React, { useEffect, useState } from 'react'
import axios from 'axios';

//MUI Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const TablePage = () => {

    const [peopleData, setPeopledata] = useState([]);
    const [locationData, setLocationData] = useState([]);
    const [logsData, setLogsData] = useState([]);

    const [current, setCurrent] = useState("people");



    const getPeopleData = async () => {
        await axios.get("http://127.0.0.1:5000/people").then((resp) => {
            setPeopledata(resp.data);
        })
    }

    const getLocationData = async () => {
        await axios.get("http://127.0.0.1:5000/places").then((resp) => {
            setLocationData(resp.data);
        })
    }

    const getLogsData = async () => {
        await axios.get("http://127.0.0.1:5000/reports").then((resp) => {
            setLogsData(resp.data);
        })
    }

    useEffect(() => {
        getPeopleData();
        getLocationData();
        getLogsData();
    }, [])


    return (

        <div className='w-full h-screen bg-white'>
            <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
                <div className="mb-2 sm:mb-0">
                    <button onClick={() => setCurrent('people')} className="text-2xl no-underline text-red-600 hover:text-red-300 mr-6 font-poppins font-semibold">Students</button>
                    <button onClick={() => setCurrent('locations')} className="text-2xl no-underline text-red-600 hover:text-red-300 mr-6 font-poppins font-semibold">Locations</button>
                    <button onClick={() => setCurrent('statements')} className="text-2xl no-underline text-red-600 hover:text-red-300 mr-6 font-poppins font-semibold">Statements</button>
                    <button onClick={() => setCurrent('logs')} className="text-2xl no-underline text-red-600 hover:text-red-300 mr-6 font-poppins font-semibold">Student Logs</button>
                </div>
            </nav>
            <div className='bg-gray-600'>
                {current === 'people' ?
                    <TableContainer component={Paper} className="bg-gray-600">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow className="bg-gray-300">
                                <TableCell align="left"><p className="font-poppins font-semibold">Student ID&nbsp;</p></TableCell>
                                    <TableCell align="left"><p className="font-poppins font-semibold">Age&nbsp;</p></TableCell>
                                    <TableCell align="left"><p className="font-poppins font-semibold">Hair Colour&nbsp;</p></TableCell>
                                    <TableCell align="left"><p className="font-poppins font-semibold">Height&nbsp;</p></TableCell>
                                    <TableCell align="left"><p className="font-poppins font-semibold">Name&nbsp;</p></TableCell>
                                    <TableCell align="left"><p className="font-poppins font-semibold">Sex&nbsp;</p></TableCell>
                                    <TableCell align="left"><p className="font-poppins font-semibold">Societies&nbsp;</p></TableCell>
                                    <TableCell align="left"><p className="font-poppins font-semibold">Subject&nbsp;</p></TableCell>
                                    <TableCell align="left"><p className="font-poppins font-semibold">Year&nbsp;</p></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {peopleData.length > 0 ? peopleData.map((person, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">{person['student_id']}</TableCell>
                                        <TableCell align="left">{person['age']}</TableCell>
                                        <TableCell align="left">{person['hair_colour']}</TableCell>
                                        <TableCell align="left">{person['height']}</TableCell>
                                        <TableCell align="left">{person['name']}</TableCell>
                                        <TableCell align="left">{person['sex']}</TableCell>
                                        <TableCell align="left">{person['societies']}</TableCell>
                                        <TableCell align="left">{person['subject']}</TableCell>
                                        <TableCell align="left">{person['year']}</TableCell>

                                    </TableRow>
                                )) : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    : null
                }

                {current === 'locations' ?
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell align="right">(Longitude,Latitude)&nbsp;</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Opening Time&nbsp;</TableCell>
                                    <TableCell align="right">Ending Time&nbsp;</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {peopleData.length > 0 ? locationData.map((location, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">{location['description']}</TableCell>
                                        <TableCell align="right">{`(${location['location']['latitude']},(${location['location']['longitude']})`}</TableCell>
                                        <TableCell align="right">{location['name']}</TableCell>
                                        <TableCell align="right">{location['opening_hours']['start_time']}</TableCell>
                                        <TableCell align="right">{location['opening_hours']['end_time']}</TableCell>

                                    </TableRow>
                                )) : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    : null
                }

                {current === 'logs' ?
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Location</TableCell>
                                    <TableCell align="right">(From,To)&nbsp;</TableCell>
                                    <TableCell align="right">Student Id</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {logsData.length > 0 ? logsData.map((location, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">{location['name']}</TableCell>
                                        <TableCell align="right">{`${location['place_name']}`}</TableCell>
                                        <TableCell align="right">{`${location['present_hours']['start_time']} - ${location['present_hours']['end_time']}`}</TableCell>
                                        <TableCell align="right">{`${location['student_id']}`}</TableCell>

                                    </TableRow>
                                )) : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    : null
                }

            </div>

        </div>
    )
}

export default TablePage
