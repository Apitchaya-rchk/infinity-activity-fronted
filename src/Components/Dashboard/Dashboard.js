import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import profilePic from '../../images/user-profile.png';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2'

const filterDateCard = (record) => {
    if (moment().format() > record.date) return true;
    else return false;
}
const filterDateDaily = (record) => {
    if (moment().startOf('day') < new Date(record.date) && moment().format() > record.date) return true;
    else return false;
}
const filterDateWeekly = (record) => {
    if (moment().startOf('week') < new Date(record.date) && moment().format() > record.date) return true;
    else return false;
}
const filterDateMonthly = (record) => {
    if (moment().startOf('month') < new Date(record.date) && moment().format() > record.date) return true;
    else return false;
}

export default function Dashboard() {

    const [records, setRecords] = useState([]);
    const [filter, setFilter] = useState(() => filterDateCard);

    async function FetchData() {
        await axios
            // .get(`http://localhost:4000/records/`)
            .get(`https://infinity-activity-backed.vercel.app/records`)
            .then((res) => {
                setRecords(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                Promise.reject(err);
            })
    }
    useEffect(() => {
        FetchData();
    }, []);

    const confirmDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCard(id);
            }
        });
    };

    const deleteCard = (id) => {
        axios
            // .delete(`http://localhost:4000/records/${id}`)
            .delete(`https://infinity-activity-backed.vercel.app/records/${id}`)
            .then(() => {
                FetchData();
            })
    }

    const handleClickDaily = () => {
        setFilter(() => filterDateDaily)
    }
    const handleClickWeekly = () => {
        setFilter(() => filterDateWeekly)
    }
    const handleClickMonthly = () => {
        setFilter(() => filterDateMonthly)
    }
    const handleClickAll = () => {
        setFilter(() => filterDateCard)
    }

    const cards = records
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .filter(record => filter(record))
        .map((card) => <Card key={card._id} data={card} deleteCard={() => { confirmDelete(card._id) }} />);

    return (
        <div className='dashboard flex justify-center w-full'>
            <div className='w-full flex flex-col items-center md:flex md:flex-row md:items-start md:w-5/6 lg:w-4/6 '>
                {/* profile user */}
                <div className='flex w-full md:flex-col md:w-1/3 justify-center md:justify-start'>
                    {/* name and pic */}

                    <div className='profileUser flex flex-col items-center mr-11 md:mr-0 '>
                        <label className='text-2xl md:text-4xl m-5'>Dashboard</label>
                        <img src={profilePic}
                            className=' h-28 md:h-full w-auto object-cover' />
                        <label className='fullname m-3 text-lg'>Tom Holland</label>
                    </div>

                    <div className='sort md:my-8 flex flex-col justify-center space-y-4 items-center'>
                        <button className='rounded-full w-28 md:w-40 md:px-3 md:py-3 bg-gray-500 text-lg text-white hover:bg-gray-400'
                            onClick={handleClickDaily}>Daily</button>
                        <button className='rounded-full w-28 md:w-40 md:px-3 md:py-3 bg-gray-500 text-lg text-white hover:bg-gray-400'
                            onClick={handleClickWeekly}>Weekly</button>
                        <button className='rounded-full w-28 md:w-40 md:px-3 md:py-3 bg-gray-500 text-lg text-white hover:bg-gray-400'
                            onClick={handleClickMonthly}>Monthly</button>
                        <button className='rounded-full w-28 md:w-40 md:px-3 md:py-3 bg-gray-500 text-lg text-white hover:bg-gray-400'
                            onClick={handleClickAll}>ALL</button>
                    </div>
                </div>
                {/* Dashboard */}

                <div className='flex m-0 flex-col items-stretch w-full md:w-2/3'>
                    {cards}
                </div>

            </div>
        </div>
    );
}
