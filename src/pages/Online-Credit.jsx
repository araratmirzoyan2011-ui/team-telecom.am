import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { collection, getDocs, addDoc} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { db } from "../firebase.js";
import { N2 } from '../Components/style2.jsx';
import { N1 } from '../Components/style1.jsx';
import { Faq } from '../Components/Faq.jsx';

function OnlineCredit() {
    const arr1=[["https://www.telecomarmenia.am/images/block_with_icons_icons/1/17537347165186.png","Visit Team e-Shop and choose smartphone any smartphone/smartphones and add to basket."],
    ["https://www.telecomarmenia.am/images/block_with_icons_icons/1/17537347165413.png","On order processing stage choose payment type \"By Credit\" and provide required documents."],
    ["https://www.telecomarmenia.am/images/block_with_icons_icons/1/17537347165633.png","Our specialist will contact you to process your credit application."],
    ["https://www.telecomarmenia.am/images/block_with_icons_icons/1/17537347165888.png","After successfully being granted a credit confirmation await your products."]]

    const arr1acba=[["https://www.telecomarmenia.am/images/block_with_icons_icons/1/17617368528774.png","Visit Team e-Shop and choose smartphone any smartphone/smartphones and add to basket."],
    ["https://www.telecomarmenia.am/images/block_with_icons_icons/1/17617368529952.png","On order processing stage choose payment type \"By Credit\" and provide required documents."],
    ["https://www.telecomarmenia.am/images/block_with_icons_icons/1/17617368530182.png","Our specialist will contact you to process your credit application."],
    ["https://www.telecomarmenia.am/images/block_with_icons_icons/1/17617368530398.png","After successfully being granted a credit confirmation await your products."]]

    const arr2=[["https://www.telecomarmenia.am/images/block_with_icons_icons/1/16510387043795.png","Visit Team e-Shop and choose smartphone and/or nice number and add to basket."],
    ["https://www.telecomarmenia.am/images/block_with_icons_icons/1/16510387044203.png",`On order processing page, choose payment type "Credit" , click on "Apply" and apply for online credit by filling required fields.`],
    ["https://www.telecomarmenia.am/images/block_with_icons_icons/1/16510387044626.png","After successful application you will get confirmation code to your phone number"],
    ["https://www.telecomarmenia.am/images/block_with_icons_icons/1/16510387044988.png",`Make an order by using confirmation code in "VTB code" field.`]]

    const faqLeft = [
      {
        q: "How to get an online credit? (ACBA Bank)",
        steps: [
          { before: "Visit ", linkText: "telecomarmenia.am/eshop", linkHref: "https://www.telecomarmenia.am/eshop/en", after: ", choose any smartphone, and add to the basket. Check the basket for correctness and click on \"Buy\"." },
          { text: 'On the order page fill in all required fields and choose "By Credit" as a payment method.' },
          { text: "Provide necessary documents, carefully read and accept the agreement on the request and processing of information on financial obligations, and submit the order." },
          { text: "Our specialist will contact you and verify the provided information." },
          { text: "After verification your application will be processed by the chosen Bank and you will be informed on the results." },
          { text: "After successful credit processing our specialist will contact you for order delivery or pick-up and agreement arrangement." },
        ],
        note: "CREDIT OBLIGATION IS NOT CONSIDERED TO BE VALID BEFORE SIGNING THE CREDIT AGREEMENT!",
      },
      {
        q: "How to get an online credit? (EVOCABANK)",
        steps: [
          { before: "Visit ", linkText: "telecomarmenia.am/eshop", linkHref: "https://www.telecomarmenia.am/eshop/en", after: ", choose any smartphone, and add to the basket. Check the basket for correctness and click on \"Buy\"." },
          { text: 'On the order page fill in all required fields and choose "By Credit" as a payment method.' },
          { text: "Provide necessary documents, carefully read and accept the agreement on the request and processing of information on financial obligations, and submit the order." },
          { text: "Our specialist will contact you and verify the provided information." },
          { text: "After verification your application will be processed by the chosen Bank and you will be informed on the results." },
          { text: "After successful credit processing our specialist will contact you for order delivery or pick-up and agreement arrangement." },
        ],
        note: "CREDIT OBLIGATION IS NOT CONSIDERED TO BE VALID BEFORE SIGNING THE CREDIT AGREEMENT!",
      },
      {
        q: "How to get an online credit? (VTB)",
        steps: [
          { before: "Visit ", linkText: "telecomarmenia.am/eshop", linkHref: "https://www.telecomarmenia.am/eshop/en", after: ", choose the smartphone/accessory and/or nice number and add to the basket. Check the basket for correctness and click on \"Buy\"." },
          { text: 'On the order page choose "Credit" as a payment method and click on "Apply for Credit".' },
          { text: "Fill in the required fields and send the request. Make sure your email is active — you'll also need to verify your phone number with a code sent to it." },
          { text: "A bank specialist will contact you to verify the provided information." },
          { text: "After successful verification and approval, you'll receive an SMS with a promo code and credit limit, usable only in Team e-Shop." },
          { text: "Return to Team e-Shop. Your basket stays active for 1.5 hours — after that you'll need to add the products again." },
          { text: 'On the Order Processing page, enter the phone number used for the credit application, choose "Credit" as payment method, and enter the promo code in the "VTB code" field, then click Apply. Delivery and any tariff-related charges are not covered by the credit and must be paid separately.' },
          { text: "After successful processing, our specialist will contact you for order delivery or pick-up and agreement arrangement." },
        ],
        note: "CREDIT OBLIGATION IS NOT CONSIDERED TO BE VALID BEFORE SIGNING THE CREDIT AGREEMENT!",
      },
      {
        q: "What if I refuse to use the credit funds?",
        a: "Credit is considered to be provided and valid only after receiving the product and signing the required documentation. In any other case you will not have any financial obligation.",
      },
      {
        q: "What if the approved credit limit is not covering the entire basket cost?",
        a: "If the credit only partially covers your purchase, the remaining difference can be paid by any other available method — cash or online transfer at service offices, or to the courier upon delivery.",
      },
    ];

    const faqRight = [
      {
        q: "How to use the credit received?",
        a: 'For VTB, use the confirmation code in the "VTB code" field on the Order Processing page (valid for 15 days). For EVOCABANK and ACBA Bank, wait for our specialist to contact you once your application has been reviewed — if approved, you\'ll be instructed on delivery.',
      },
      {
        q: "How I can be informed about my request status?",
        a: "For VTB, results are shared in your personal online account and by SMS within 24 hours (excluding bank non-working days). For EVOCABANK and ACBA Bank, our specialists will inform you of the results within 24 hours (excluding bank non-working days).",
      },
      {
        q: "What can I buy with a credit in Team e-Shop?",
        a: "With VTB you can buy any smartphone, accessory, or device worth over 30,000 AMD, plus nice numbers (VTB-only). With EVOCABANK, any smartphone(s) worth over 50,000 AMD. With ACBA Bank, any smartphone(s) worth over 26,000 AMD.",
      },
      {
        q: "What are the credit terms?",
        a: "Terms vary by bank. VTB Armenia shows your approved terms and credit limit in your personal online account (vtb.am). EVOCABANK and ACBA Bank credit terms are published on the Credit Terms page.",
      },
    ];

    const navigate = useNavigate();
    // ...
return (
  <>
    {header()}

    <div className='mt-[100px] w-full min-h-[500px] grid grid-cols-1 md:grid-cols-2 bg-[#083f58]'>
      <N2
        src='https://www.telecomarmenia.am/images/block_with_text/1/16510468752809.png'
        h1='Online credit'
        p='Online credit enables you to make purchases from online shop (e-Shop) by paying with credit.'
        button='e-Shop'
        col="text-white"
      />
    </div>

    <div className='w-full h-auto bg-[#083f58]'>
      <N1 arr={arr1} h1='How to get online credit? (EVOCABANK)' />
    </div>

    <div className='w-full h-auto bg-[#083f58]'>
      <N1 arr={arr1acba} h1='How to get online credit? (Acba bank)' />
    </div>

    <div className='w-full h-auto bg-[#083f58]'>
      <N1 arr={arr2} h1='How to get online credit (VTB BANK)' />
    </div>

    <div className='w-full min-h-[500px] grid grid-cols-1 md:grid-cols-2'>
      <N2
        src='https://www.telecomarmenia.am/images/block_with_text/1/16510468889316.png'
        h1='Nice numbers'
        p='Nice numbers available by online credit with VTB bank'
        button='Buy now'
        col="text-[#083f58]"
      />
    </div>

    <Faq leftItems={faqLeft} rightItems={faqRight} />
    <Footer />
  </>
);
}
export default OnlineCredit