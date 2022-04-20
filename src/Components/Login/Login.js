export default function Login() {
    
    // tailwind style
    const styleComponent = "flex justify-center items-center h-screen bg-gray-200";
    const styleForm = "bg-white block round-xl shadow-md p-7 w-1/2 rounded-lg";
    const styleInput = "h-8 w-full pl-2 rounded-md border-2 border-gray-300 outline-gray-500 focus:shadow-md";
    const styleButton = "w-full bg-gray-400 hover:bg-gray-600 text-white rounded shadow-md py-2 px-4 my-4";

    return (
        <div className={styleComponent}>

            <div id="form" className={styleForm}>
                <form action="">
                    <h2 className='text-4xl my-4'>Login</h2>

                    {/* EMAIL */}
                    <div id="email" className='w-auto mr-1 my-2'>
                        <label for="email" className="h-8 w-full ">E-mail</label>
                        <input type="email" name="" id="email" className={styleInput} />
                    </div>

                    {/* PASSWORD */}
                    <div id="password" className='w-auto mr-1 my-2'>
                        <label for="password" className="h-8 w-full ">Password</label>
                        <input type="password" name="" id="password" className={styleInput} />
                    </div>

                    {/* SUBMIT BUTTON */}
                    <input type="submit" name="" id="" className={styleButton} />

                </form>
            </div >

        </div >
    );
}

