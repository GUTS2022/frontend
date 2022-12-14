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


const TablePage = (props) => {
    const [peopleData, setPeopledata] = useState([]);
    const [locationData, setLocationData] = useState([]);
    const [logsData, setLogsData] = useState([]);
    const [statementsData, setStatementsData] = useState([]);
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

    const getStatementsData = async () => {
        await axios.get("http://127.0.0.1:5000/statements").then((resp) => {
            setStatementsData(resp.data);
        })
    }

    useEffect(() => {
        getPeopleData();
        getLocationData();
        getLogsData();
        getStatementsData();
    }, [])


    return (
        <div className='w-full h-screen bg-white'>
            <a href="/" className="text-4xl text-white fixed top-2 left-7 z-50">&lt;</a>
            <nav className="font-poppins flex flex-col text-center py-4 px-6 bg-[#121212] shadow w-full items-center justify-center">
                <div className="mb-2 sm:mb-0">
                    <button onClick={() => setCurrent('people')} className="text-lg no-underline text-white hover:text-red-300 mr-6 font-poppins font-semibold">Students</button>
                    <button onClick={() => setCurrent('locations')} className="text-lg no-underline text-white hover:text-red-300 mr-6 font-poppins font-semibold">Locations</button>
                    <button onClick={() => setCurrent('statements')} className="text-lg no-underline text-white hover:text-red-300 mr-6 font-poppins font-semibold">Statements</button>
                    <button onClick={() => setCurrent('logs')} className="text-lg no-underline text-white hover:text-red-300 mr-6 font-poppins font-semibold">Student Logs</button>
                </div>
            </nav>
            <div className='bg-gray-600'>
                {current === 'people' ?
                    <TableContainer component={Paper} className="bg-[#121212]">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow className="bg-[#121212]">
                                    <TableCell align="left"><p className="font-poppins font-semibold text-white">Student ID&nbsp;</p></TableCell>
                                    <TableCell align="left"><p className="font-poppins font-semibold text-white">Age&nbsp;</p></TableCell>
                                    <TableCell align="left"><p className="font-poppins font-semibold text-white">Hair Colour&nbsp;</p></TableCell>
                                    <TableCell align="left"><p className="font-poppins font-semibold text-white">Height&nbsp;</p></TableCell>
                                    <TableCell align="left"><p className="font-poppins font-semibold text-white">Name&nbsp;</p></TableCell>
                                    <TableCell align="left"><p className="font-poppins font-semibold text-white">Sex&nbsp;</p></TableCell>
                                    <TableCell align="left"><p className="font-poppins font-semibold text-white">Societies&nbsp;</p></TableCell>
                                    <TableCell align="left"><p className="font-poppins font-semibold text-white">Subject&nbsp;</p></TableCell>
                                    <TableCell align="left"><p className="font-poppins font-semibold text-white">Year&nbsp;</p></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {peopleData.length > 0 ? peopleData.map((person, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        className={index % 2 === 0 ? 'bg-[#2b2c34]' : 'bg-[#33333d]'}
                                    >
                                        <TableCell align="left">
                                            <p className="text-stolen">
                                                {person['student_id']}
                                            </p>
                                        </TableCell>
                                        <TableCell align="left">
                                            <p className="text-stolen">
                                                {person['age']}
                                            </p>
                                        </TableCell>
                                        <TableCell align="left">
                                            <p className="text-stolen">
                                                {person['hair_colour']}
                                            </p>
                                        </TableCell>
                                        <TableCell align="left">
                                            <p className="text-stolen">
                                                {person['height']}
                                            </p>
                                        </TableCell>
                                        <TableCell align="left">
                                            <p className="text-stolen">
                                                {person['name']}
                                            </p>
                                        </TableCell>
                                        <TableCell align="left">
                                            <p className="text-stolen">
                                                {person['sex']}
                                            </p>
                                        </TableCell>
                                        <TableCell align="left">
                                            {person['societies'].map((soc, index) => (
                                                <h1 className="text-stolen">
                                                    {soc}
                                                </h1>
                                            ))}
                                        </TableCell>
                                        <TableCell align="left">
                                            <p className="text-stolen">
                                                {person['subject']}
                                            </p>
                                        </TableCell>
                                        <TableCell align="left">
                                            <p className="text-stolen">
                                                {person['year']}
                                            </p>
                                        </TableCell>
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
                                <TableRow className="bg-[#121212]">
                                    <TableCell align="left"><p className="font-poppins font-semibold text-white">Description&nbsp;</p></TableCell>
                                    <TableCell align="left"><p className="font-poppins font-semibold text-white">(Longitude, Latitude)&nbsp;</p></TableCell>
                                    <TableCell align="left"><p className="font-poppins font-semibold text-white">Name&nbsp;</p></TableCell>
                                    <TableCell align="left"><p className="font-poppins font-semibold text-white">Opening Time&nbsp;</p></TableCell>
                                    <TableCell align="left"><p className="font-poppins font-semibold text-white">Ending Time&nbsp;</p></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {locationData.length > 0 ? locationData.map((location, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        className={index % 2 === 0 ? 'bg-[#2b2c34]' : 'bg-[#33333d]'}
                                    >
                                        <TableCell align="left">
                                            <p className="text-stolen">
                                                {location['description']}
                                            </p>
                                        </TableCell>
                                        <TableCell align="left">
                                            <p className="text-stolen">
                                                {`(${location['location']['latitude']},(${location['location']['longitude']})`}
                                            </p>
                                        </TableCell>
                                        <TableCell align="left">
                                            <p className="text-stolen">
                                                {location['name']}
                                            </p>
                                        </TableCell>
                                        <TableCell align="left">
                                            <p className="text-stolen">
                                                {location['opening_hours']['start_time']}
                                            </p>
                                        </TableCell>
                                        <TableCell align="left">
                                            <p className="text-stolen">
                                                {location['opening_hours']['end_time']}
                                            </p>
                                        </TableCell>
                                    </TableRow>
                                )) : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    : null
                }

                {current === 'statements' ?
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow className="bg-[#121212]">
                                    <TableCell align="left"><p className="font-poppins font-semibold text-white">Student ID&nbsp;</p></TableCell>
                                    <TableCell align="left"><p className="font-poppins font-semibold text-white">Name&nbsp;</p></TableCell>
                                    <TableCell align="left"><p className="font-poppins font-semibold text-white">Testimony&nbsp;</p></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {statementsData.length > 0 ? statementsData.map((statements, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        className={index % 2 === 0 ? 'bg-[#2b2c34]' : 'bg-[#33333d]'}
                                    >
                                        <TableCell align="left">
                                            <p className="text-stolen">
                                                {statements['name']}
                                            </p>
                                        </TableCell>
                                        <TableCell align="left">
                                            <p className="text-stolen">
                                                {`${statements['student_id']}`}
                                            </p>
                                        </TableCell>
                                        <TableCell align="left">
                                            <p className="text-stolen">
                                                {`${statements['testimony']}`}
                                            </p>
                                        </TableCell>
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
                                <TableRow className="bg-[#121212]">
                                    <TableCell align="left"><p className="font-poppins font-semibold text-white">Name&nbsp;</p></TableCell>
                                    <TableCell align="left"><p className="font-poppins font-semibold text-white">Location&nbsp;</p></TableCell>
                                    <TableCell align="left"><p className="font-poppins font-semibold text-white">(From, To)&nbsp;</p></TableCell>
                                    <TableCell align="left"><p className="font-poppins font-semibold text-white">Student ID&nbsp;</p></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {logsData.length > 0 ? logsData.map((location, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        className={index % 2 === 0 ? 'bg-[#2b2c34]' : 'bg-[#33333d]'}
                                    >
                                        <TableCell align="left">
                                            <p className="text-stolen">
                                                {location['name']}
                                            </p>
                                        </TableCell>
                                        <TableCell align="left">
                                            <p className="text-stolen">
                                                {`${location['place_name']}`}
                                            </p>
                                        </TableCell>
                                        <TableCell align="left">
                                            <p className="text-stolen">
                                                {`${location['present_hours']['start_time']} - ${location['present_hours']['end_time']}`}
                                            </p>
                                        </TableCell>
                                        <TableCell align="left">
                                            <p className="text-stolen">
                                                    {`${location['student_id']}`}
                                            </p>
                                        </TableCell>
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
