import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Edit from '../Edit/Edit';

import walk from '../../images/activity-walk.png';
import run from '../../images/activity-run.png';
import bicycle from '../../images/activity-bicycle.png';
import hike from '../../images/activity-hike.png';
import swim from '../../images/activity-swimming.png';
import yoga from '../../images/activity-yoga.png';
import badminton from '../../images/activity-badminton.png';
import treadmil from '../../images/activity-treadmill.png';
import location from '../../images/icon-location.png';
import editIcon from '../../images/icon-edit.png';
import deleteIcon from '../../images/icon-delete.png';

export default function Card(props) {
    const navigate = useNavigate();

    let pic;
    switch (props.data.activity) {
        case 'Walk': pic =
            <img src={walk} className='h-20' />
            break;
        case 'Run':
            pic = <img src={run} className='h-20' />
            break;
        case 'Bicycle ride':
            pic = <img src={bicycle} className='h-20' />
            break;
        case 'Hike':
            pic = <img src={hike} className='h-20' />
            break;
        case 'Swim':
            pic = <img src={swim} className='h-20' />
            break;
        case 'Badminton':
            pic = <img src={yoga} className='h-20' />
            break;
        case 'Treadmil running':
            pic = <img src={badminton} className='h-20' />
            break;
        case 'Yoga':
            pic = <img src={treadmil} className='h-20' />
            break;
        default:
            break;
    }

    const hour = props.data.duration.hour === 0 ? ``
        : props.data.duration.hour === 1 ? `${props.data.duration.hour} hr`: `${props.data.duration.hour} hrs`;
    const mins = props.data.duration.mins === 0 ? `` : `${props.data.duration.mins} mins`;

    const handleClick = (params) => {
        navigate({
            pathname: `/edit/${params._id}`
          });
        return 
    }

    return (
        <div className='card bg-gray-400 shadow-lg flex m-9 rounded-lg flex-col pb-5 '>

            {/* Title */}
            <div className="titleCard p-4 flex justify-between w-full">
                <label className='text-xl font-semibold text-white '>{props.data.title}</label>
                <div className='w-auto flex justify-end flex-shrink-0 ml-2'>
                    <img src={editIcon} onClick={()=>handleClick(props.data)} className='h-6 w-auto mr-3' />
                    <img src={deleteIcon} onClick={props.deleteCard} className=' h-6 w-auto' />
                </div>
            </div>
 
            {/* detail */}
            <div className='bg-blue-100 '>
                {/* activity detail */}
                <div className='p-4 flex'>
                    {pic}
                    <div className='flex flex-col'>
                        <div className='flex items-end  '>
                            <label className='text-2xl'>{props.data.activity}</label>
                            <img src={location} className='h-4 mb-2 ml-3' />
                            <label className='mb-px'>{props.data.location}</label>
                        </div>
                        <label className=' '>Date : {props.data.date.slice(0,10)}</label>
                        <label>Duration : {hour} {mins}</label>
                    </div>
                </div>

                {/* journal */}
                <div className='bg-white p-4 tex break-all' id='description-detail' dangerouslySetInnerHTML={{ __html: props.data.description }} />

            </div>


        </div>
    );
}
