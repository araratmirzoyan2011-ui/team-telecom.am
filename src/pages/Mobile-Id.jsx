import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../firebase.js";

import { header as Header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { N2 } from '../Components/style4.jsx';
import { N3 } from '../Components/style5.jsx';
import { Faq } from '../Components/Faq.jsx';
import { Faq2 } from '../Components/Reg-Val';

function MobileID() {
  const [faqGeneral, setFaqGeneral] = useState({ left: [], right: [] });
  const [faqReg, setFaqReg] = useState({ left: [], right: [] });

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "mobileIdFaq"));
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.faqGeneral) setFaqGeneral(data.faqGeneral);
          if (data.faqRegistration) setFaqReg(data.faqRegistration);
        });
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <>
      <Header />

      <div className='mt-[100px] w-full min-h-[500px] grid grid-cols-1 md:grid-cols-2 bg-[#02273a]'>
        <N2
          src='https://www.telecomarmenia.am/images/block_with_text/1/17574204271237.jpeg'
          h1='Mobile ID'
          p='Mobile ID is a convenient and secure tool for digital identification, allowing you to sign electronic documents and access government services using your mobile phone.'
          col="text-white"
        />
      </div>

      <N3
        src='https://www.telecomarmenia.am/images/block_with_text/1/17497079209004.png'
        h1='Always with you'
        p='Your digital signature is always with you - sign documents online anytime and from anywhere in the world.'
        col="text-[#083f58]"
      />

      <div className='w-full min-h-[500px] grid grid-cols-1 md:grid-cols-2 bg-[#e3ddd2]'>
        <N2
          src='https://www.telecomarmenia.am/images/block_with_text/1/17497079561537.png'
          h1='Legal significance'
          p='A digital signature created using Mobile ID has legal force and fully complies with the norms established by legislation.'
          col="text-[#083f58]"
        />
      </div>

      <N3
        src='https://www.telecomarmenia.am/images/block_with_text/1/17497079905771.png'
        h1='Safe and reliable'
        p='Advanced encryption technologies ensure the reliable protection of your data. No one but you can sign: your SIM card is always with you, and access is protected by a PIN code known only to you.'
        col="text-[#083f58]"
      />

      <div className='w-full min-h-[500px] grid grid-cols-1 md:grid-cols-2 bg-[#02273a]'>
        <N2
          src='https://www.telecomarmenia.am/images/block_with_text/1/17497080685495.jpeg'
          h1='Activation steps'
          p='✔ Visit any Team sales and service center. ✔ Verify your identity, ✔ Receive PIN codes for the secure use of the service. For activation, you need to visit Team office in person, in compliance with the legal requirements of the Republic of Armenia.'
          col="text-white"
        />
      </div>

      <div className='w-full min-h-[200px] bg-[#01415f] text-white flex justify-center items-center text-[42px] text-center'>
        <h1>Due to technical limitations, Mobile ID with eSIM is not supported on iPhone 11 and older models. For these devices, a uSIM card is available.</h1>
      </div>

      {/* Dynamic FAQ Components */}
      <Faq2 leftItems={faqReg.left} rightItems={faqReg.right} title="SIM Card Registration via the My Team App" />
      <Faq leftItems={faqGeneral.left} rightItems={faqGeneral.right} title="FAQ" />

      <Footer />
    </>
  );
}

export default MobileID;