import react,{ useState} from 'react';


const signup = () => {
    const [agreed, setAgreed] = useState(false);

    const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (!name || !email || !password) {
      alert("Please fill all required fields!");
      return;
    }

    // Submit form logic here
   if (!agreed) {
    alert("You must agree to the Terms and Conditions!");
    return;
  }

  // Success
  alert("Form submitted successfully!");
};

    return (
       <div className="min-h-screen flex items-center justify-center bg-cream">

            <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold mb-2 text-gray-800 text-center">
                    Register Here </h2>

                <p className="text-center text-gray-500 mb-6 text-sm">
                    Create Your Account to get Started
                </p>

                {/*Social buttons*/}
                <div className="flex gap-6 mb-6">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2. px-4 border-2 border-blue-600 rounded-xl text-blue-600 hover:bg-gray-100 transition font-medium">
                        {/* Facebook Logo SVG */}
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg> 
                            Facebook
                    </button>

                    <button className="flex-1 flex items-center justify-center gap-2  py-2 px-4 border-2 border-red-500 rounded-xl text-red-500 hover:bg-gray-100 transition font-medium">
                        {/* Google Logo SVG */}
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#EA4335" d="M12 5.04c1.91 0 3.63.66 4.99 1.74l3.73-3.73C18.27 1.19 15.33 0 12 0 7.39 0 3.39 2.77 1.47 6.82l4.34 2.17C7.11 6.45 9.36 5.04 12 5.04z"/>
                        <path fill="#4285F4" d="M23.49 12.28c0-.86-.07-1.68-.22-2.47H12v4.68h6.45c-.28 1.48-1.12 2.73-2.38 3.57l3.86 2.99c2.25-2.08 3.56-5.13 3.56-8.77z"/>
                        <path fill="#FBBC05" d="M5.81 14.3c-.23-.68-.36-1.41-.36-2.15s.13-1.47.36-2.15L1.47 7.82C.53 9.77 0 11.93 0 14.15s.53 4.38 1.47 6.33l4.34-2.17z"/>
                        <path fill="#34A853" d="M12 24c3.25 0 5.97-1.08 7.96-2.91l-3.86-2.99c-1.08.72-2.47 1.15-4.1 1.15-3.14 0-5.81-2.12-6.76-4.96l-4.34 2.17C3.39 21.23 7.39 24 12 24z"/>
                        </svg>
                         Google
                    </button>
                </div>


                {/*OR divider*/}
                <div className="flex items-center mb-6 text-gray-400 text-sm">
                    <span className="flex-grow border-t"></span>
                    <span className="px-2">OR</span>
                    <span className="flex-grow border-t"></span>
                </div>

                {/*Role Selection*/}
                <p className="text-gray-700 mb-3 font-bold">I am an </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {["Property Owner", "Admin","Agent", "Buyer"].map((r) => (
                        <button
                            key={r}
                            type="button"
                            onClick={() => setRole(r)}
                            className={`py-2 rounded-lg border font-medium transition transform 
                                    bg-white text-gray-700 border-gray-300 
                                    hover:translate-y-[-3px] hover:shadow-md hover:bg-primary hover:text-white
                
                            } `}
                        >
                            {r}
                        </button>
                    ))}
                </div>

                {/*Form*/}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                     <label className="text-gray-700 text-sm font-bold mb-1">Enter your name *</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your Full Name" 
                        required
                        className="w-full px-4 text-sm py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                    />
                    </div>


                    <div className="flex flex-col">
                    <label className="text-gray-700 text-sm font-bold mb-1">Email Address *</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address" 
                        required
                        className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                    /> 
                    </div>


                    <div className="flex flex-col">
                    <label className="text-gray-700 text-sm font-bold mb-1">Password *</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Minimum 8 characters" 
                        required
                        minLength={8}
                        className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                    />
                    </div>

                    {/*checkboxes*/}
                        <div className="flex flex-wrap items-center gap-4 mt-2">
                            <label className="flex items-center gap-2 text-gray-500 text-sm cursor-pointer">
                                <input type="checkbox" className="peer h-4 w-4 text-black checked:text-black" />
                                <span className="peer-checked:text-black">Subscribe to our Newsletter and email alerts</span>
                            </label>

                            <label className="flex items-center gap-3 text-gray-500 text-sm cursor-pointer">
                                <input type="checkbox" 
                                checked={agreed}
                                onChange={(e) => setAgreed    (e.target.checked)} 
                                className="peer h-4 w-4 text-black checked:text-black" />
                                <span className="peer-checked:text-black">
                                I agree to <span className="text-primary underline cursor-pointer">Terms and Conditions</span>
                                </span>
                            </label>
                            </div>
                            
                        <button
                        type="submit"
                        disabled={!agreed}
                        className={`w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition font-semibold mt-4
                        ${agreed ? "bg-primary text-white hover:bg-secondary" : "bg-gray-300 text-gray-500 cursor-not-allowed"}
                        `}                     
                        >
                        CLICK TO REGISTER
                        </button>
                        </form>

                        <p className="text-center text-sm text-gray-500 mt-4">
                            Already have an account ? <a href="/login" className="text-primary font-bold hover:underline">
                                Login Here
                            </a>
                        </p>


            </div>
        </div>
    );
};
export default signup;
