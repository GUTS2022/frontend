import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Table = () => {

    const [data, setData] = useState({});

    const getData = async () => {
        await axios.get("http://localho.st:5000/").then((resp) => {
            setData(resp.data);
        })
    }

    useEffect(() => {
        getData();
    },[])


    return (
        <div>
            <h1>TableView</h1>
        </div>
    )
}

export default Table
