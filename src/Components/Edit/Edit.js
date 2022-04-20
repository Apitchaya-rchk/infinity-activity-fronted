import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'

import SelectBox from '../AddJourney/SelectBox/SelectBox';
import InputBox from '../AddJourney/InputBox/InputBox';
import TextEditor from '../AddJourney/TextEditor/TextEditor';


export default function Edit(props) {
    //tailwindcss
    const styleComponent = "flex justify-center items-center bg-gradient-to-r from-sky-100 to-red-100";
    const styleForm = "bg-white block round-xl shadow-md p-7 my-16 w-5/6 sm:w-2/3 md:w-1/2 rounded-lg";
    const styleButton = "w-full bg-gray-400 hover:bg-gray-600 text-white rounded shadow-md py-2 px-4 my-4";

    // State
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('')
    const [activity, setActivity] = useState('Walk');
    const [location, setLocation] = useState('');
    const [durationHour, setDurationHour] = useState('');
    const [durationMin, setDurationMin] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    let { id } = useParams();

    async function FetchData() {
        await axios
            .get(`https://infinity-activity-backed.vercel.app/records/${id}`)
            //   .get(`http://localhost:4000/records/`)
            .then((res) => {
                setTitle(res.data.title);
                setDate(res.data.date.slice(0, 10));
                setActivity(res.data.activity);
                setLocation(res.data.location);
                setDurationHour(res.data.duration.hour);
                setDurationMin(res.data.duration.mins);
                setDescription(res.data.description);
                setIsLoading(true);
            })
            .catch((err) => {
                Promise.reject(err);
            })
    }

    useEffect(() => {
        FetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        let updateRecords = {
            title: title,
            activity: activity,
            location: location,
            date: date,
            duration: { hour: durationHour, mins: durationMin },
            description: description
        };
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    // .put(`http://localhost:4001/users/me/records/${id}`, updateRecords)
                    .put(`https://infinity-activity-backed.vercel.app/records/${id}`, updateRecords)
                    .then((res) => {
                        console.log("data: ", res.data);
                        navigate({
                            pathname: "/dashboard"
                        });
                    })
                Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
                navigate({
                    pathname: "/dashboard"
                });
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    };

    return (
        <div className={styleComponent}>
            {isLoading &&
                <div id="form" className={styleForm}>
                    <form onSubmit={handleSubmit} >
                        <h2 className='text-4xl my-4 '>Edit Journey 🛠️</h2>

                        {/* Activity Type */}
                        <SelectBox stateValue={activity} setState={setActivity} />
                        {/* Title */}
                        <InputBox
                            label='Title'
                            type='text'
                            stateValue={title}
                            setState={setTitle}
                            errMessage='*Title should not be empty'
                            pattern='^.{1,}$' />
                        {/* Date */}
                        <InputBox
                            label='Date'
                            type='date'
                            stateValue={date}
                            setState={setDate}
                            errMessage='*Please select a date'
                            pattern='^.{1,}$' />
                        {/* Duration */}
                        <InputBox
                            label='hour'
                            type='text'
                            stateValue={durationHour}
                            setState={setDurationHour}
                            errMessage='*Duration should not be empty (0-9)'
                            pattern='^[0-9]{1}' />
                        <InputBox
                            label='minute'
                            type='text'
                            stateValue={durationMin}
                            setState={setDurationMin}
                            errMessage='*Duration should not be empty (0-59)'
                            pattern='^([1-5]?[0-9])$' />
                        {/* Location */}
                        <InputBox
                            label='Location'
                            type='text'
                            stateValue={location}
                            setState={setLocation}
                            errMessage='*Location should not be empty'
                            pattern='^.{1,}$' />
                        {/* Description*/}
                        <TextEditor
                            stateValue={description}
                            setState={setDescription}
                            errMessage='Please, take down some note so it becomes memorable 😢💭' />

                        {/* BUTTON */}
                        <div className='md:flex'>
                            <input type="submit" name="" id="" className='w-full bg-gray-400 hover:bg-gray-600 text-white rounded shadow-md py-2 px-4 my-4 md:mr-2' />
                            <button className="w-full bg-gray-400 hover:bg-gray-600 text-white py-2 px-4 md:my-4 rounded" onClick={(e)=>e.preventDefault()}>
                            <Link to="/dashboard">Back</Link>
                            </button >
                        </div>

                    </form>
                </div >}
        </div >
    );
}


