// import { useState, useEffect } from 'react'
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { Link, useNavigate } from 'react-router-dom';
// import { db } from "../firebase.js";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { auth } from "../firebase.js";

// function Login() {
//   const [authMode, setAuthMode] = useState('login');
//   const [errorMsg, setErrorMsg] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [about, setAbout] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     localStorage.clear();
//   }, []);

//   const switchMode = (mode) => {
//     setAuthMode(mode);
//     setErrorMsg('');
//     setUsername('');
//     setPassword('');
//     setConfirmPassword('');
//     setName('');
//     setAbout('');
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setErrorMsg('');
//     setIsLoading(true);
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, username, password);
//       console.log("Մուտք գործեց:", userCredential.user);
//       navigate("/page1");
//     } catch (error) {
//       if (
//         error.code === 'auth/invalid-credential' ||
//         error.code === 'auth/wrong-password' ||
//         error.code === 'auth/user-not-found'
//       ) {
//         setErrorMsg('Սխալ մուտքանուն կամ գաղտնաբառ');
//       } else {
//         setErrorMsg('Ինչ-որ բան սխալ գնաց, փորձիր կրկին');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setErrorMsg('');

//     if (password !== confirmPassword) {
//       setErrorMsg('Գաղտնաբառերը չեն համընկնում');
//       return;
//     }

//     if (password.length < 6) {
//       setErrorMsg('Գաղտնաբառը պետք է լինի առնվազն 6 նիշ');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // 1. Ստեղծում ենք user-ը Firebase Authentication-ում
//       const userCredential = await createUserWithEmailAndPassword(auth, username, password);
//       const user = userCredential.user;

//       // 2. Պահում ենք registration-ի տվյալները առանձին "info" collection-ում
//       await addDoc(collection(db, "info"), {
//         uid: user.uid,
//         email: username,
//         name: name,
//         about: about,
//         createdAt: serverTimestamp(),
//       });

//       console.log("Գրանցվեց:", user);
//       await signOut(auth);
//       switchMode('login');
//       setErrorMsg('');
//     } catch (error) {
//       if (error.code === 'auth/email-already-in-use') {
//         setErrorMsg('Այս email-ով account արդեն գոյություն ունի');
//       } else if (error.code === 'auth/invalid-email') {
//         setErrorMsg('Email-ի ֆորմատը սխալ է');
//       } else if (error.code === 'auth/weak-password') {
//         setErrorMsg('Գաղտնաբառը շատ թույլ է');
//       } else {
//         setErrorMsg('Ինչ-որ բան սխալ գնաց, փորձիր կրկին');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };


//   return (
//     <>
//       <div className="grid grid-cols-[30%_65%] w-full h-[100vh] gap-[5%]" >
//         <div className="">
//           <div
//             style={{
//               width: '130px',
//               height: '60px',
//               backgroundImage: 'url(https://www.telecomarmenia.am/img/logo-light.svg?v=1)',
//               marginLeft: '40%',
//               marginTop: '40px',
//             }}
//           ></div>

//           <div className="w-full ml-[10%] mt-[60px] max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//             {authMode === 'login' ? (
//               <form onSubmit={handleLogin} className="space-y-4">
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 mb-1">
//                     Username
//                   </label>
//                   <input
//                     type="email"
//                     placeholder="Enter your email"
//                     className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a896] focus:border-[#00a896]"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 mb-1">
//                     Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Enter your password"
//                       className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a896] focus:border-[#00a896]"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword((prev) => !prev)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                     >
//                       {showPassword ? "🙈" : "👁"}
//                     </button>
//                   </div>
//                 </div>

//                 {errorMsg && (
//                   <p className="text-red-500 text-xs text-center">{errorMsg}</p>
//                 )}

//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="w-full py-3 bg-[#e34234] hover:bg-[#d23528] disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm rounded-md transition-colors"
//                 >
//                   {isLoading ? "Please wait..." : "Sign in"}
//                 </button>

//                 <div className="text-center pt-2">
//                   <span className="text-xs text-gray-600">Don't have an account in Team? </span>
//                   <button
//                     type="button"
//                     onClick={() => switchMode('register')}
//                     className="text-xs text-[#e34234] hover:underline bg-transparent border-none cursor-pointer p-0"
//                   >
//                     Register
//                   </button>
//                 </div>

//                 <div className="text-center pt-2">
//                   <a href="#forgot" className="text-xs text-gray-600 hover:underline">
//                     Forgot password?
//                   </a>
//                 </div>
//               </form>
//             ) : (
//               <form onSubmit={handleRegister} className="space-y-4">
//                 <h2 className="text-lg font-medium text-center mb-2">Գրանցում</h2>

//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 mb-1">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     placeholder="Enter your email"
//                     className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a896] focus:border-[#00a896]"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 mb-1">
//                     Nickname
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Enter your nickname"
//                     className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a896] focus:border-[#00a896]"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 mb-1">
//                     About you
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Tell us about yourself"
//                     className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a896] focus:border-[#00a896]"
//                     value={about}
//                     onChange={(e) => setAbout(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 mb-1">
//                     Password
//                   </label>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter your password"
//                     className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a896] focus:border-[#00a896]"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 mb-1">
//                     Confirm Password
//                   </label>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Confirm your password"
//                     className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a896] focus:border-[#00a896]"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                   />
//                 </div>

//                 {errorMsg && (
//                   <p className="text-red-500 text-xs text-center">{errorMsg}</p>
//                 )}

//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="w-full py-3 bg-[#e34234] hover:bg-[#d23528] disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm rounded-md transition-colors"
//                 >
//                   {isLoading ? "Please wait..." : "Գրանցվել"}
//                 </button>

//                 <div className="text-center pt-2">
//                   <span className="text-xs text-gray-600">Already have an account? </span>
//                   <button
//                     type="button"
//                     onClick={() => switchMode('login')}
//                     className="text-xs text-[#e34234] hover:underline bg-transparent border-none cursor-pointer p-0"
//                   >
//                     Sign in
//                   </button>
//                 </div>
//               </form>
//             )}
//           </div>
//         </div>

//         <div className="bg-[url(https://static.tildacdn.com/tild3066-6435-4130-a662-656537366333/IMG_0167b.jpg)] bg-no-repeat bg-[length:100%_100%] flex flex-col justify-center items-center">
//           <h1 className="text-[60px] text-[#2c3843] lg:text-[60px] md:text-[52px] sm:text-[42px]">PERSONAL ACCOUNT</h1>
//           <img src="https://www.telecomarmenia.am/myaccount/img/mobile-devices.png?v=3" className='lg:w-[350px] h-[400px] md:w-[300px] h-[350px] sm:w-[250px] h-[300px]' alt="" />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;
import { useState, useEffect } from 'react'
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { db } from "../firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { auth, googleProvider } from "../firebase.js";

function Login() {
  const [authMode, setAuthMode] = useState('login');
  const [errorMsg, setErrorMsg] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

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
    setName('');
    setAbout('');
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

  const handleGoogleLogin = async () => {
    setErrorMsg('');
    setIsGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google-ով մուտք գործեց:", user);

      const q = query(collection(db, "info"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        await addDoc(collection(db, "info"), {
          uid: user.uid,
          email: user.email,
          name: user.displayName || '',
          about: '',
          photoURL: user.photoURL || '',
          createdAt: serverTimestamp(),
        });
        console.log("Google user-ի տվյալները ավելացվեցին info collection-ում");
      }

      navigate("/page1");
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
      } else {
        setErrorMsg('Google-ով մուտքը ձախողվեց, փորձիր կրկին');
      }
      console.error("Google login սխալ:", error);
    } finally {
      setIsGoogleLoading(false);
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
      const user = userCredential.user;

      await addDoc(collection(db, "info"), {
        uid: user.uid,
        email: username,
        name: name,
        about: about,
        createdAt: serverTimestamp(),
      });

      console.log("Գրանցվեց:", user);
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
                      {showPassword ? "+" : "-"}
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

                <div className="flex items-center gap-3 py-1">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="text-xs text-gray-400">կամ</span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isGoogleLoading}
                  className="w-full py-2.5 flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed text-gray-700 font-medium text-sm rounded-md transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"/>
                    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                    <path fill="#4CAF50" d="M24 44c5.5 0 10.4-1.9 14.2-5.1l-6.6-5.4C29.6 35.4 27 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.6 5.1C9.6 39.6 16.3 44 24 44z"/>
                    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.3-4.1 5.7l6.6 5.4C41.8 35.6 44 30.2 44 24c0-1.3-.1-2.7-.4-3.5z"/>
                  </svg>
                  {isGoogleLoading ? "Please wait..." : "Մուտք գործել Google-ով"}
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
                    Nickname
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your nickname"
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a896] focus:border-[#00a896]"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    About you
                  </label>
                  <input
                    type="text"
                    placeholder="Tell us about yourself"
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a896] focus:border-[#00a896]"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
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