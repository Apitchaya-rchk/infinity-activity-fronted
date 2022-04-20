export default function Register() {

    const styleInput = "h-10 w-96 border-2 border-opacity-50 rounded-lg border-orange-300 shadow-md shadow-gray-400 outline-none focus:border-orange-500";

    return (
        <div className="h-screen bg-orange-100 flex flex-col justify-center  items-center" >
            Sign up
            <div class="grid grid-cols-2 gap-1">
                <label >Username </label>
                <input type="text" className={styleInput} />
                <label>Password </label>
                <input type="text" className={styleInput} />
                <label>Confirm Password </label>
                <input type="text" className={styleInput} />
                <label>Email </label>
                <input type="text" className={styleInput} />
            </div>



        </div>
    );
}

