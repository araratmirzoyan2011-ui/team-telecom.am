import { header as Header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { N2 } from '../Components/style2.jsx';
import { N3 } from '../Components/style5.jsx';
import { N1 } from '../Components/style1.jsx';
import { Faq } from '../Components/Faq.jsx';

const arr1 = [
    ["https://www.telecomarmenia.am/images/block_with_icons_icons/1/16818933940398.png", "Choose a nice number from eShop, view subscription terms and add to basket."],
    ["https://www.telecomarmenia.am/images/block_with_icons_icons/1/16818933940648.png", `On order processing stage activate "Subscription" checkbox and review your order.`],
    ["https://www.telecomarmenia.am/images/block_with_icons_icons/1/16818933940919.png", "Our specialist will contact you to confirm all the details and process number registration."],
    ["https://www.telecomarmenia.am/images/block_with_icons_icons/1/16818933941239.png", "Await your number to be delivered and activated."],
];

export const faqLeft = [
    {
        q: "Be Free on special terms",
        a: "Here you can place the detailed terms and conditions regarding the Be Free special offer."
    }
];

export const faqRight = [
    {
        q: "Additional information",
        a: "Here you can place additional rules, descriptions, or conditions related to the package."
    }
];

function Subscription() {
   
    return (
        <>
            <Header />

            <div className='w-full min-h-[500px] flex items-center justify-center'>
                <N2
                    src="https://www.telecomarmenia.am/images/block_with_text/1/16832074487761.png"
                    h1='Buy Number by Subscription'
                    p="Get a nice number only just by subscribing to our services"
                    col="text-[#01415f]"
                    button="e-Shop"
                />
            </div>
            <div className='w-full h-auto bg-[#083f58] py-8'>
                <N1 arr={arr1} h1='How to Buy Number by Subscription?' />
            </div>
            <div className='w-full min-h-[500px] flex items-center justify-center bg-[#01415f]'>
                <N2
                    src="https://www.telecomarmenia.am/images/block_with_text/1/16832074143841.png"
                    h1='Nice numbers'
                    p="Nice numbers available by online credit with VTB bank"
                    col="text-white"
                    button="Buy now"
                />
            </div>


            <Faq leftItems={faqLeft} rightItems={faqRight} title='Terms' />
            
            <Footer />
        </>
    );
}

export default Subscription;