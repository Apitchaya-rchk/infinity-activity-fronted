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
    /////////////////////SET STATE/////////////////////
    //record
    const [records, setRecords] = useState([]);
    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(4);
    const [pageNumberLimit, setPageNumberLimit] = useState(3);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
    // Filter
    const [filter, setFilter] = useState(() => filterDateDaily);
    // 
    const [isLoading, setsLoading] = useState(true);

    useEffect(() => {
        FetchData();
        setsLoading(false);
    }, []);

    // FetchALLData and 
    async function FetchData() {
        await axios
            .get(`https://infinity-activity-backed.vercel.app/records`)
            .then((res) => {
                setRecords(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)));
                console.log(res.data);
            })
            .catch((err) => {
                Promise.reject(err);
            })
    };

    // Pagination
    const pages = [];
    for (let i = 1; i <= Math.ceil(records.filter(record => filter(record)).length / itemsPerPage); i++) {
        pages.push(i);
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = records.filter(record => filter(record)).slice(indexOfFirstItem, indexOfLastItem);

    ///////////////////// Handle Event /////////////////////
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
            .delete(`https://infinity-activity-backed.vercel.app/records/${id}`)
            .then(() => {
                FetchData();
            })
    };

    ///////////////////// Handle Event /////////////////////
    //click select "Filter"
    const handleClickDaily = () => {
        setFilter(() => filterDateDaily)
        setCurrentPage(1);
        setMaxPageNumberLimit(3);
        setMinPageNumberLimit(0);
    }
    const handleClickWeekly = () => {
        setFilter(() => filterDateWeekly)
        setCurrentPage(1);
        setMaxPageNumberLimit(3);
        setMinPageNumberLimit(0);
    }
    const handleClickMonthly = () => {
        setFilter(() => filterDateMonthly)
        setCurrentPage(1);
        setMaxPageNumberLimit(3);
        setMinPageNumberLimit(0);
    }
    const handleClickAll = () => {
        setFilter(() => filterDateCard)
        setCurrentPage(1);
        setMaxPageNumberLimit(3);
        setMinPageNumberLimit(0);
    }
    // click select Page 
    const handleClickPage = (event) => {
        setCurrentPage(Number(event.target.id));
    }
    const handleClickPrev = () => {
        if ((currentPage - 1) > 0) {
            setCurrentPage(currentPage - 1);
            if ((currentPage - 1) % pageNumberLimit === 0) {
                setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
                setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
            }
        }
    }
    const handleClickNext = () => {
        if ((currentPage) < pages.length) {
            setCurrentPage(currentPage + 1);
            if (currentPage + 1 > maxPageNumberLimit) {
                setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
                setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
            }
        }
    }

    const renderCards = (records) => {
        const allCard = records.filter(record => filter(record))
            .map((card) => <Card key={card._id} data={card} deleteCard={() => { confirmDelete(card._id) }} />)
        if (allCard.length > 0) {
            return allCard;
        } else {
            return (<div className='flex flex-col items-center mt-10 md:mt-48'>
                <p className=' text-sm md:text-lg'> There is currently no activity to display.😢</p>
                <p className=' text-sm md:text-lg'>💘Come to add your wonderful travel activities.💘</p>
            </div>
            );
        }
    }

    const renderPageNumbers = pages.map(number => {

        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li key={number} id={number} onClick={handleClickPage}
                    className={`p-3 border-[1px] border-gray-400 rounded-md cursor-pointer hover:bg-gray-400  active:bg-gray-400 font-medium  ${currentPage === number ? `bg-gray-400` : `bg-white`}`}>{number}</li>
            );
        } else {
            return null;
        }

    });


    return (
        <div className='dashboard flex justify-center w-full'>
            <div className='w-full flex flex-col items-center md:flex md:flex-row md:items-start md:w-5/6 lg:w-4/6 '>
                {/* profile user */}
                <div className='flex w-full md:flex-col md:w-1/3 justify-center md:justify-start'>
                    {/* name and pic */}

                    <div className='profileUser flex flex-col items-center mr-11 md:mr-0 '>
                        <label className='text-2xl md:text-4xl m-5'>Dashboard</label>
                        <img src='https://1417094351.rsc.cdn77.org/articles/982/981903/thumbnail/small.gif?4'
                            className=' h-28 md:h-full w-auto object-cover rounded-lg' />
                        <label className='fullname m-3 text-lg'>Piggy Laylico</label>
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
                {!isLoading &&
                    <div className='flex m-0 flex-col items-stretch w-full md:w-2/3'>
                        <ul className="pageNumbers flex justify-center mt-9 space-x-2">
                            {(pages.length > 3) && !(minPageNumberLimit + 1 === 1) && <li onClick={handleClickPrev}
                                className='p-3 border-[1px] border-gray-400 rounded-md cursor-pointer hover:bg-gray-300  active:bg-gray-300 font-medium'>Prev</li>}
                            {renderPageNumbers}
                            {(pages.length > maxPageNumberLimit) && <li onClick={handleClickNext}
                                className='p-3 border-[1px] border-gray-400 rounded-md cursor-pointer hover:bg-gray-300  active:bg-gray-300 font-medium'>Next</li>}
                        </ul>
                        {renderCards(currentItems)}
                    </div>
                }


            </div>
        </div>
    );
}
