import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { collection, getDocs, addDoc} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { db } from "../firebase.js";
import { N2 } from '../Components/style4.jsx';
import { N3 } from '../Components/style5.jsx';
import { Faq } from '../Components/Faq.jsx';
import { Faq2 } from '../Components/Reg-Val';
function MobileID() {
    const faqLeft = [
  {
    q: "Who can use Mobile ID?",
    a: "The service is available to individuals: citizens of the Republic of Armenia (valid ID card or passport, plus a Public Services Number if you have an ID card), citizens holding a passport issued under code 070 (passport, Public Services Number, and temporary protection certificate), and foreign citizens who hold a Public Services Number together with either a temporary/permanent residence card, a special passport, or a certificate confirming legal residence.",
  },
  {
    q: "What is an electronic signature?",
    a: "An electronic signature is the digital equivalent of your personal signature. It confirms the authenticity of a document and is used to sign contracts, applications, and other important paperwork securely and reliably.",
  },
  {
    q: "Which services can I access using Mobile ID?",
    a: "With Mobile ID you can access online banking and other digital services, sign contracts and agreements, log in to government portals, and take part in electronic voting and other remote processes.",
  },
  {
    q: "What is EKENG?",
    a: "EKENG (the Electronic Governance Infrastructure Implementation Office) is the state-authorized body that manages and issues electronic signature certificates, granting the right to use electronic signatures for an annual fee. More details are available at ekeng.am.",
  },
  {
    q: "What is the \"Yes em\" Portal?",
    a: "Yesem.am is a secure identification and electronic signature platform. Your username is your registered, verified mobile number (format 0xx xx xx xx), and a PIN is generated when you register for Mobile ID. You can also sign and verify documents through the portal, which keeps a record of all Mobile ID transactions for security and transparency.",
  },
  {
    q: "Is it necessary to change the eSIM/SIM card for Mobile ID?",
    a: "Yes, Mobile ID requires a special eSIM/SIM card, which you can obtain by visiting any Team sales and service center.",
  },
  {
    q: "How long does it take to replace the SIM card?",
    a: "If you have all the required documents with you, replacing the SIM card takes only a few minutes.",
  },
  {
    q: "Can I deactivate the Mobile ID service?",
    a: "Yes, you can deactivate the service at any time by visiting a Team sales and service center.",
  },
  {
    q: "What should I do if my SIM card is lost or damaged?",
    a: "Visit a Team sales and service center to restore your SIM card and reactivate Mobile ID.",
  },
  {
    q: "How to protect my PIN code?",
    a: "Never share your PIN code with anyone, and choose a complex, unique code to keep your data safe.",
  },
  {
    q: "Is Mobile ID secure?",
    a: "Yes. Mobile ID relies on advanced encryption and two-factor authentication to keep your identity and signature protected.",
  },
];

const faqRight = [
  {
    q: "Can I use Mobile ID abroad?",
    a: "Yes, as long as your SIM card has roaming enabled.",
  },
  {
    q: "Is it necessary to download an app for Mobile ID?",
    a: "No. Mobile ID works without any app — all the necessary functions are built directly into the SIM card.",
  },
  {
    q: "What should I Do If I forget my PIN code?",
    a: "Visit a Team sales and service center and they'll help you restore it.",
  },
  {
    q: "How much does the Mobile ID cost?",
    a: "Activating and using Mobile ID is free of charge. Replacing your eSIM/SIM card costs 500 AMD.",
  },
  {
    q: "Can I Use Mobile ID on multiple devices?",
    a: "No — Mobile ID is tied to the specific eSIM/SIM card, so it only works on the device that card is installed in.",
  },
  {
    q: "Can I change my Mobile ID PIN code?",
    a: "Yes, this can be done at any Team sales and service center.",
  },
  {
    q: "What Should I Do If Mobile ID Is not working?",
    a: "Check that you have mobile network coverage, and if the issue continues, contact your operator's support center.",
  },
  {
    q: "What should I do If I change my phone number?",
    a: "Your existing Mobile ID will stop working. You'll need to visit a Team sales and service center to reactivate the service on the new number.",
  },
  {
    q: "What happens if the eSIM is removed from the phone?",
    a: "An eSIM with Mobile ID can only be used once — if the profile is deleted from your device, it can't be restored, and you'll need to visit a Team office to get a replacement eSIM.",
  },
  {
    q: "Technical limitations",
    a: "Due to technical limitations, Mobile ID with eSIM is not supported on iPhone 11 or older models. A physical uSIM card is available for those devices instead.",
  },
  {
    q: "How can I check the service status on my number?",
    a: "You can check by entering your phone number on this page: imid.am/am/test.",
  },
];

const faqLeft2 = [
  {
    q: "What is Mobile ID?",
    a: "Mobile ID is a SIM-based digital identification service that lets you verify your identity, use an electronic signature, and access digital services.",
  },
  {
    q: "Where can I purchase a SIM card with Mobile ID support?",
    a: "A SIM card with Mobile ID support, including the 100 GB internet package, is available exclusively through Team Telecom Armenia's distributors and partners. A standard SIM (without the 100 GB package) can also be bought at Team service centers or the Team online store.",
  },
  {
    q: "Is this SIM card ready for use?",
    a: "No. After purchase, the SIM card must be registered and activated in the My Team mobile app, in the SIMs section.",
  },
  {
    q: "How do I activate this SIM card?",
    a: "Registration and activation are both done in the My Team mobile app, in the SIMs section.",
  },
  {
    q: "Who can use this service?",
    a: "The service is available to citizens of the Republic of Armenia who are over 18 and registered in the My Team app, including subscribers of Team and other operators. Online registration is limited to no more than three times per user.",
  },
  {
    q: "What can I do with this SIM card?",
    a: "You can register the SIM online and get a new number; register online, get a new number, and activate Mobile ID at a service center; keep your existing number while replacing your old SIM (Team subscribers only); or keep your number while replacing your SIM and activating Mobile ID (Team subscribers only). If you don't yet have a SIM card, you'll need to purchase one first.",
  },
  {
    q: "What numbers and tariffs are available?",
    a: "A wide selection of numbers is available, including premium numbers. The prepaid tariffs open for activation are Be Free 2500, Be Free 3200, Be Free 3500, Be Free 5000, and Be Free 8000.",
  },
  {
    q: "What documents are required?",
    a: "You'll need a passport or ID card for general registration; for Mobile ID specifically, only an ID card is accepted.",
  },
  {
    q: "What happens during registration of new number?",
    a: "The My Team app handles SIM validation, number selection or transfer, billing data verification and updates, identity verification via documents and biometrics, automatic registration and activation, activation of the 100 GB internet package, and emailing you the contract.",
  },
  {
    q: "What happens during the card replacement?",
    a: "The app performs the same steps as new registration — SIM validation, SIM replacement, billing data verification, biometric identity check, automatic registration and activation, 100 GB package activation, and emailing the contract.",
  },
  {
    q: "When is the SIM card ready for use?",
    a: "As soon as online registration succeeds and you receive email confirmation, the SIM card is ready — just insert it into your phone.",
  },
];

const faqRight2 = [
  {
    q: "Can Mobile ID be activated online?",
    a: "No. Mobile ID can only be activated in person at a Team service center, in line with legal requirements.",
  },
  {
    q: "What should I do if the SIM card is not found?",
    a: "This can mean the card isn't in the system, was scanned incorrectly, or has already been activated. Contact a Team service center or call short number 100 for help.",
  },
  {
    q: "What should I do if the number is registered to another person?",
    a: "Registration isn't possible if the owner's data doesn't match the person completing verification — the number must be registered to the same person being verified. If you think this is a system error, contact a Team service center or support.",
  },
  {
    q: "What should I do if online registration failed?",
    a: "Visit any Team service center, where a staff member can complete registration, activation, and 100 GB package activation for you in person.",
  },
  {
    q: "What should I do if the payment failed?",
    a: "You can simply try the payment again.",
  },
  {
    q: "Is the 100 GB package activated immediately?",
    a: "Not always — the system makes up to 3 connection attempts, three minutes apart.",
  },
  {
    q: "100 GB bonus validity period",
    a: "The bonus package is valid for 6 months from the date the SIM card was activated.",
  },
  {
    q: "Can I receive the bonus again?",
    a: "Yes, for a new number. No, if you're simply replacing the SIM while keeping the same number — the bonus is only granted once within 6 months of first activation.",
  },
  {
    q: "What should I do if my number is in Suspend status?",
    a: "Top up your balance to bring the status back to Active, then continue with registration.",
  },
  {
    q: "Can I register a SIM card offline?",
    a: "Yes — at a Team service center, staff can register the SIM, activate the number, connect the bonus, and perform the identity verification needed for Mobile ID activation.",
  },
];
    const navigate = useNavigate();
    // ...
return (
  <>
    {header()}

    <div className='mt-[100px] w-full min-h-[500px] grid grid-cols-1 md:grid-cols-2 bg-[#02273a]'>
      <N2
        src='https://www.telecomarmenia.am/images/block_with_text/1/17574204271237.jpeg'
        h1='Mobile ID'
        p='Mobile ID is a convenient and secure tool for digital identification, allowing you to sign electronic documents and access government services using your mobile phone.'
        col="text-white"
      />
    </div>
    <div className='w-full min-h-[500px] grid grid-cols-1 md:grid-cols-2'>
      <N3
        src='https://www.telecomarmenia.am/images/block_with_text/1/17497079209004.png'
        h1='Always with you'
        p='Your digital signature is always with you - sign documents online anytime and from anywhere in the world.'
        button='Buy now'
        col="text-[#083f58]"
      />
    </div>
    <div className='w-full min-h-[500px] grid grid-cols-1 md:grid-cols-2 bg-[#e3ddd2]'>
      <N2
        src='https://www.telecomarmenia.am/images/block_with_text/1/17497079561537.png'
        h1='Legal significance'
        p='A digital signature created using Mobile ID has legal force and fully complies with the norms established by legislation.'
        button='Buy now'
        col="text-[#083f58]"
      />
    </div>
    <div className='w-full min-h-[500px] grid grid-cols-1 md:grid-cols-2 '>
      <N3
        src='https://www.telecomarmenia.am/images/block_with_text/1/17497079905771.png'
        h1='Safe and reliable'
        p='Advanced encryption technologies ensure the reliable protection of your data. No one but you can sign: your SIM card is always with you, and access is protected by a PIN code known only to you.'
        button='Buy now'
        col="text-[#083f58]"
      />
    </div>
    <div className='w-full min-h-[500px] grid grid-cols-1 md:grid-cols-2 bg-[#02273a]'>
      <N2
        src='https://www.telecomarmenia.am/images/block_with_text/1/17497080685495.jpeg'
        h1='Activation steps'
        p='✔ Visit any Team sales and service center. ✔ Verify your identity, ✔ Receive PIN codes for the secure use of the service. For activation, you need to visit Team office in person, in compliance with the legal requirements of the Republic of Armenia.'
        button='Buy now'
        col="text-white"
      />
    </div>
    <div className='w-full min-h-[200px]  bg-[#01415f] text-white flex justify-center items-center text-[42px] text-center'>
        <h1>Due to technical limitations, Mobile ID with eSIM is not supported on iPhone 11 and older models. For these devices, a uSIM card is available.</h1>
    </div>
    <Faq2 leftItems={faqLeft2} rightItems={faqRight2} title="SIM Card Registration via the My Team App" />
    <Faq leftItems={faqLeft} rightItems={faqRight} title="FAQ" />
    <Footer />
  </>
);
}
export default MobileID