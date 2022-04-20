import { useState } from "react";
export default function TextareaBox(props) {

    const [focused, setFocused] = useState(false);
    const errInput = 'peer w-full pl-2 my-1 rounded-md border-2 outline-none focus:border-gray-500 invalid:border-red-500 outline-none focus:shadow-md'
    const regInput = 'peer w-full pl-2 my-1 rounded-md border-2 border-gray-300 outline-none focus:border-gray-500 focus:shadow-md'

    const handleFocus = (params) => {
        setFocused(true);
    }

    return (
        <div id="" className='w-auto mr-1 my-2'>
            <label className="h-8 w-full ">
                How are your workouts?
            </label>
            <textarea type="text" rows="7"
                placeholder="Feel free to write your story 🤩💘"
                required
                onBlur={handleFocus}
                focused={focused.toString()}
                onChange={e => props.setState(e.target.value)}
                className={focused ? errInput : regInput}>
            </textarea>
            {focused && <span className=" text-red-400 text-sm hidden peer-invalid:block">{props.errMessage}</span>}
        </div>
    );
}