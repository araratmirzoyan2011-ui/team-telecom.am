import { useState,useEffect } from 'react'
import { collection, getDocs, addDoc} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from "../firebase.js";
import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { share } from '../Components/Share.jsx';
function CorEth() {
    return (
        <>
        {header()}
      <div className="mt-[150px]! ml-[10%] w-3/5 h-auto flex flex-col font-sans border-b border-gray-500 mb-10 max-[1100px]:w-[70%] max-[900px]:w-4/5">
        <h1 className="mb-[10px] text-[48px] text-[rgb(17,22,44)]">Corporate Ethics and Compliance</h1>
        <p className="mt-[10px] text-[26px] text-[rgb(12,13,22)] max-[1280px]:text-2xl max-[1100px]:text-[22px] max-[800px]:text-xl">
            "Telecom Armenia" OJSC values open, honest and transparent business relations and mutual trust with everyone: customers, employees, partners. In order to ensure the preservation of this culture, the highest international standards of corporate ethics and compliance have been implemented in the Company. These are summarized in a series of ethical guidelines that clearly describe the criterions and expectations of our activities.
        </p>
        <p className="mt-[10px] text-[26px] text-[rgb(12,13,22)] max-[1280px]:text-2xl max-[1100px]:text-[22px] max-[800px]:text-xl">
            We believe that in today's highly competitive market, the Company can only succeed by remaining true to its values and ethical behavior. The long-term perspective of "Telecom Armenia" OJSC is to value and constantly protect the reputation of the Company as a reliable and responsible partner in the ever-changing world. We want our employees, partners and customers to share these values as well.
        </p>
        <h3 className="mt-[10px] mb-[10px] text-[32px] text-[rgb(17,22,44)] text-gray-500">Code of Conduct</h3>
        
        <p className="mt-[10px] text-[26px] text-[rgb(12,13,22)] max-[1280px]:text-2xl max-[1100px]:text-[22px] max-[800px]:text-xl">
            Our ethical principles and standards of conduct are reflected in the Company's Code of Conduct, which is a fundamental guide to the Company's values. All our employees, regardless of their position and responsibility level, as well as all third parties who act on behalf of the Company, are obliged to follow the requirements of the Code of Conduct.
        </p>
        
        <a href="" className="mt-[20px]  text-[32px] text-[rgb(17,22,44)] text-blue-500">Code of Conduct(document)</a>
        <h1 className="mb-[10px] text-[48px] text-gray-500">Speak-Up hotline</h1>
        <p className="mt-[10px] text-[26px] text-[rgb(12,13,22)] max-[1280px]:text-2xl max-[1100px]:text-[22px] max-[800px]:text-xl">
            "Telecom Armenia" OJSC maintains an online system for raising concerns. If you are aware of potential or actual misconduct, as well as any violations of the legislation relevant the Company's field of activity, you can speak about it by submitting a report using the link below. "Telecom Armenia" OJSC takes all the necessary steps to maintain the confidentiality and anonymity of the reporting parties, in accordance with current legislation.
        </p>
        <a href="" className="mt-[10px] mb-[10px] text-[32px] text-[rgb(17,22,44)] text-blue-500">Speak-Up online platform</a>
        
        </div>
      <div className="w-[200px] h-[60px] ml-[10%] flex flex-row items-center justify-around text-[rgb(44,43,43)] mb-[60px]">
        {share()}
      </div>
     <Footer />
      </>
    )
}
export default CorEth