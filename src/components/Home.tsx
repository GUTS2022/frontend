import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../style'

const Home = () => {
    return (
        <div className='bg-gradient-to-b from from-black via-black to-special-red w-full h-screen overflow-hidden cursor-crosshair '>
            <div className='flex items-center justify-center h-full flex-col'>
                <h1 className="mb-2 font-mono text-4xl text-white md:text-6xl ">
                    University of Glasgow  <br className='hidden' />
                    <span className="relative">
                        <span className="h-20 pt-2 overflow-x-hidden whitespace-nowrap text-brand-accent text-red-600 ">
                            Surveillance  </span>
                        <span
                            className="absolute -bottom-0 left-0 -top-1 inline-block bg-black border-l-2 border-white w-full animate-type will-change"
                        ></span>
                    </span>
                </h1>
                <div className='pt-20 flex flex-row items-center gap-x-32'>

                    <div className="grid gap-8 items-start justify-center">
                        <div className="relative group">
                            <div className="absolute -inset-0.5  bg-red-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                            <Link to="/heatmap">
                                <button className="relative px-7 py-4 bg-black rounded-lg flex items-center divide-x divide-gray-600 text-red-600 font-poppins font-medium text-xl leading-tight uppercase  ">Heatmap</button>
                            </Link>
                        </div>
                    </div>


                    <div className="grid gap-8 items-start justify-center">
                        <div className="relative group">
                            <div className="absolute -inset-0.5  bg-red-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                            <Link to="/network">
                                <button className="relative px-7 py-4 bg-black rounded-lg flex items-center divide-x divide-gray-600 text-red-600 font-poppins font-medium text-xl leading-tight uppercase  ">Student Network</button>
                            </Link>
                        </div>
                    </div>


                    <div className="grid gap-8 items-start justify-center">
                        <div className="relative group ">
                            <div className="absolute -inset-0.5  bg-red-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                            <Link to="/table">
                                <button className="relative px-7 py-4 bg-black rounded-lg flex items-center divide-x divide-gray-600 text-red-600 font-poppins font-medium text-xl leading-tight uppercase  ">Tableview</button>
                            </Link>
                        </div>
                    </div>

                </div>





            </div>

        </div>
    )
}

export default Home
