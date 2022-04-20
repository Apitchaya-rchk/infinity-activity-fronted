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
                    <img src={logo} alt='Logo' className="h-7 w-fit object-cover" />
                    <div className="text-sm md:text-base">Infinity Activity</div>

                </div>
                <ul className="navSection flex space-x-4 items-center ">
            
                    {/* <li className=""><a href="#">Home</a></li> */}
                    <li className="text-sm md:text-base"><Link to="/addjourney">New Journey</Link></li>
                    <li className="text-sm md:text-base"><Link to="/dashboard">Journey</Link></li>
                    {/* <li className=""><a href="#">Settings</a></li> */}
                </ul>
                {/* <div className='loginSection flex space-x-4 items-center'>
                    <button className="bg-gray-400 hover:bg-gray-600 text-white  py-2 px-4 rounded">
                        Sign in
                    </button>
                    <button className="bg-gray-400 hover:bg-gray-600 text-white  py-2 px-4 rounded">
                        Sign up
                    </button>
                </div> */}
            </div>
        </div>
    )
}


