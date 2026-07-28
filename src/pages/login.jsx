import { useState, useEffect } from 'react'
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { db } from "../firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase.js";

function Login() {
  const [authMode, setAuthMode] = useState('login');
  const [errorMsg, setErrorMsg] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

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
      navigate("/page1");
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
      const userCredential = await createUserWithEmailAndPassword(auth, username, password);
      console.log("Գրանցվեց:", userCredential.user);
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


  return (
    <>
      <div className="grid grid-cols-[30%_65%] w-full h-[100vh] gap-[5%]" >
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
          </div>
        </div>

        <div className="bg-[url(https://static.tildacdn.com/tild3066-6435-4130-a662-656537366333/IMG_0167b.jpg)] bg-no-repeat bg-[length:100%_100%] flex flex-col justify-center items-center">
          <h1 className="text-[60px] text-[#2c3843] lg:text-[60px] md:text-[52px] sm:text-[42px]">PERSONAL ACCOUNT</h1>
          <img src="https://www.telecomarmenia.am/myaccount/img/mobile-devices.png?v=3" className='lg:w-[350px] h-[400px] md:w-[300px] h-[350px] sm:w-[250px] h-[300px]' alt="" />
        </div>
      </div>
    </>
  );
}

export default Login;