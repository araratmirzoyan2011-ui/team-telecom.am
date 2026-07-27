import { useState, useEffect } from 'react'
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { db } from "../firebase.js";
import { os } from '../Components/os.jsx';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase.js";

function Login() {
  const [mainTab, setMainTab] = useState('Private Clients');
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [errorMsg, setErrorMsg] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accountType, setAccountType] = useState('Admin');

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  // Փոխում ենք Login ⇄ Register և մաքրում ենք ֆորմը
  const switchMode = (mode) => {
    setAuthMode(mode);
    setErrorMsg('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      console.log("Մուտք գործեց:", userCredential.user);
      navigate("/user");
    } catch (error) {
      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/user-not-found'
      ) {
        setErrorMsg('Սխալ մուտքանուն կամ գաղտնաբառ');
      } else {
        setErrorMsg('Ինչ-որ բան սխալ գնաց, փորձիր կրկին');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Գաղտնաբառերը չեն համընկնում');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Գաղտնաբառը պետք է լինի առնվազն 6 նիշ');
      return;
    }

    setIsLoading(true);
    try {
      // Ստեղծում ենք account-ը Firebase Authentication-ում
      const userCredential = await createUserWithEmailAndPassword(auth, username, password);
      console.log("Գրանցվեց:", userCredential.user);

      // Firebase-ը ինքնաշխատ login է անում account ստեղծելուց հետո,
      // ուստի անմիջապես sign out ենք անում, որ user-ը ինքը մուտքագրի իր տվյալները
      await signOut(auth);

      switchMode('login');
      setErrorMsg('');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMsg('Այս email-ով account արդեն գոյություն ունի');
      } else if (error.code === 'auth/invalid-email') {
        setErrorMsg('Email-ի ֆորմատը սխալ է');
      } else if (error.code === 'auth/weak-password') {
        setErrorMsg('Գաղտնաբառը շատ թույլ է');
      } else {
        setErrorMsg('Ինչ-որ բան սխալ գնաց, փորձիր կրկին');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout-ի սխալ:", error.message);
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
                {authMode === 'login' ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Username
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a896] focus:border-[#00a896]"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a896] focus:border-[#00a896]"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? "🙈" : "👁"}
                        </button>
                      </div>
                    </div>

                    {errorMsg && (
                      <p className="text-red-500 text-xs text-center">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 bg-[#e34234] hover:bg-[#d23528] disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm rounded-md transition-colors"
                    >
                      {isLoading ? "Please wait..." : "Sign in"}
                    </button>

                    <div className="text-center pt-2">
                      <span className="text-xs text-gray-600">Don't have an account in Team? </span>
                      <button
                        type="button"
                        onClick={() => switchMode('register')}
                        className="text-xs text-[#e34234] hover:underline bg-transparent border-none cursor-pointer p-0"
                      >
                        Register
                      </button>
                    </div>

                    <div className="text-center pt-2">
                      <a href="#forgot" className="text-xs text-gray-600 hover:underline">
                        Forgot password?
                      </a>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <h2 className="text-lg font-medium text-center mb-2">Գրանցում</h2>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a896] focus:border-[#00a896]"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a896] focus:border-[#00a896]"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Confirm Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a896] focus:border-[#00a896]"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>

                    {errorMsg && (
                      <p className="text-red-500 text-xs text-center">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 bg-[#e34234] hover:bg-[#d23528] disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm rounded-md transition-colors"
                    >
                      {isLoading ? "Please wait..." : "Գրանցվել"}
                    </button>

                    <div className="text-center pt-2">
                      <span className="text-xs text-gray-600">Already have an account? </span>
                      <button
                        type="button"
                        onClick={() => switchMode('login')}
                        className="text-xs text-[#e34234] hover:underline bg-transparent border-none cursor-pointer p-0"
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                )}
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
                    <select
                      value={accountType}
                      onChange={(e) => setAccountType(e.target.value)}
                      className='w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a896] focus:border-[#00a896]'
                    >
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
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a896] focus:border-[#00a896]"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? "🙈" : "👁"}
                    </button>
                  </div>
                </div>

                {errorMsg && (
                  <p className="text-red-500 text-xs text-center">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#e34234] hover:bg-[#d23528] disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm rounded-md transition-colors mt-[10px]"
                >
                  {isLoading ? "Please wait..." : "Sign in"}
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