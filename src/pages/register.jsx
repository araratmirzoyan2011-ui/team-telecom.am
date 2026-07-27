import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Ստուգում ենք passwords-ը համընկնում են
    if (password !== confirmPassword) {
      setErrorMsg('Գաղտնաբառերը չեն համընկնում');
      return;
    }

    // Firebase-ի minimum պահանջ՝ առնվազն 6 նիշ
    if (password.length < 6) {
      setErrorMsg('Գաղտնաբառը պետք է լինի առնվազն 6 նիշ');
      return;
    }

    setIsLoading(true);
    try {
      // Սա ինքնաշխատ ստեղծում է user-ը Firebase Authentication-ում
      // (նույնը, ինչ Console-ից "Add user"-ը, բայց ավտոմատ)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Գրանցվեց:", userCredential.user);
      navigate("/page1");
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
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-[100px]">
      <h1 className="text-xl font-medium text-center mb-6">Գրանցում</h1>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a896] focus:border-[#00a896]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a896] focus:border-[#00a896]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm your password"
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a896] focus:border-[#00a896]"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
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
          <Link to="/login" className="text-xs text-[#e34234] hover:underline">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;