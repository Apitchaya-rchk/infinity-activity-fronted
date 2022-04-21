import logo from '../../images/logo.png';
import addLogo from '../../images/icon-add.png';
import historyLogo from '../../images/icon-history.png';
import notiLogo from '../../images/icon-notification.png';
import profileLogo from '../../images/icon-profile.png';
import settingLogo from '../../images/icon-setting.png';
import { Link } from "react-router-dom";


export default function ResponsiveNavbar() {
    return (
        <div className='flex justify-center shadow-md'>
            <div className="menuBar flex justify-between w-full md:w-5/6 p-3">
                <div className="brandSection flex flex-col justify-center items-center ">
                    <img src={logo} alt='Logo' className="h-7 w-auto md:w-fit object-cover" />
                    <div className="text-sm md:text-base">Infinity Activity</div>
                </div>
                <ul className="navSection flex  items-center ">
                    <li className="text-sm md:text-base border-r-2 pr-2 hover:text-lg duration-300 cursor-pointer"><Link to="/addjourney">New Journey</Link></li>
                    <li className="text-sm md:text-base pl-2 hover:text-lg duration-300 cursor-pointer"><Link to="/dashboard">Journey</Link></li>
                </ul>
            </div>
        </div>
    )
}


