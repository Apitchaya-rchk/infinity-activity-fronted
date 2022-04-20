import { useState } from "react";

export default function InputBox(props) {
    const [focused, setFocused] = useState(false);
    const regInput = 'peer h-8 w-full pl-2 rounded-md border-2 invalid:border-red-500 outline-none focus:border-gray-500 focus:shadow-md'
    const neverFocusInput = 'peer h-8 w-full pl-2 rounded-md border-2 border-gray-300 outline-none focus:border-gray-500 focus:shadow-md'

    const handleFocus = () => {
        setFocused(true);
    }

    return (
        <div id="" className='w-auto mr-1 my-2'>
            <label
                className="h-8 w-full after:content-['*'] after:ml-0.5 after:text-red-500">
                {props.label}
            </label>
            <input
                type={props.type}
                pattern={props.pattern}
                required
                onBlur={handleFocus}
                focused={focused.toString()}
                // onInvalid={e=>e.target.setCustomValidity('errMessage')}
                onChange={e => props.setState(e.target.value)}
                className={focused ? regInput : neverFocusInput}
                value={props.stateValue}
                // value="2013-01-08"
            />
            {focused && <span className=" text-red-400 text-sm hidden peer-invalid:block">{props.errMessage}</span>}
        </div>
    );
}