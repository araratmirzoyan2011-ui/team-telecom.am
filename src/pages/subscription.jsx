import { collection, addDoc } from 'firebase/firestore';
import { db } from "../firebase.js";

import { header as Header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { bgimg } from "../Components/bg.jsx";
import { N2 } from '../Components/style2.jsx';
import PackageCard from '../Components/PackageCard.jsx';
import { N3 } from '../Components/style5.jsx';
import { N8 } from '../Components/stile8.jsx';
import { TariffCards } from '../Components/Tariff-Card.jsx';
import { N1 } from '../Components/N1-1.jsx';
import { Faq } from '../Components/Faq.jsx';

const arr1 = [
    ["https://www.telecomarmenia.am/images/block_with_icons_icons/1/16496614699749.png", "Catch-Up up-to 7 days"],
    ["https://www.telecomarmenia.am/images/block_with_icons_icons/1/1649661469994.png", "Huge Video Library"],
    ["https://www.telecomarmenia.am/images/block_with_icons_icons/1/1649661469994.png", "YouTube on TV"],
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

const comboPackagesData = [
    {
        id: "1", feeAmount: "9900", heading: "COMBO 4 9900",
        fixedInclusions: [{ icon: "wifi", text: "100 Mbps" }],
        mobileInclusions: [
            { icon: "beFree", text: "Be Free 5000" },
            { icon: "call", text: "3000 all-net min" },
            { icon: "internet", text: "Unlimited GB" },
            { icon: "teamTV", text: "150 channels" },
            { icon: "call", text: "180 fixed min" },
            { icon: "roaming", text: "200 MB Internet in roaming" }
        ]
    },
    {
        id: "2", feeAmount: "7500", heading: "COMBO 3 TV",
        fixedInclusions: [{ icon: "wifi", text: "50 Mbps" }],
        mobileInclusions: [
            { icon: "call", text: "Unlimited on-net calls" },
            { icon: "call", text: "100 on-net min" },
            { icon: "internet", text: "10 GB" },
            { icon: "teamTV", text: "80 channels" }
        ]
    },
    {
        id: "3", feeAmount: "6900", heading: "COMBO 2 6900",
        fixedInclusions: [{ icon: "wifi", text: "50 Mbps" }],
        mobileInclusions: [
            { icon: "beFree", text: "Be Free 3200" },
            { icon: "call", text: "1500 all-net min" },
            { icon: "internet", text: "40 GB" }
        ]
    },
    {
        id: "4", isCustom: true,
        title: "Didn't find your package?",
        description: "Explore all the available packages!",
        buttonText: "More",
        linkTo: "/all-packages"
    }
];

function Subscription() {
    const handleJoin = (pkg) => {
        alert(`Joining ${pkg.heading}`);
    };

    return (
        <>
            <Header />

            <div className='w-full min-h-[500px] flex items-center justify-center bg-[#024566]'>
                <N2
                    src="https://www.telecomarmenia.am/images/block_with_text/1/17788403748713.jpeg"
                    h1='Connect Internet and TV online'
                    p="Send an ONLINE REQUEST and we will connect Your COMBO service package within 5 working days. Connectivity and setup of the Wi-FI device are FREE all over the country."
                    col="text-white"
                />
            </div>
            <div className='w-full h-auto bg-[#083f58] py-8'>
                <N1 arr={arr1} h1='TeamTV' />
            </div>
            <N3
                src='https://www.telecomarmenia.am/images/block_with_text/1/17761517712737.png'
                h1='Be Free at a special price'
                p='Become a subscriber of one of the COSMO or COMBO packages and get up to 3 SIM cards at special rates'
            />


            <Faq leftItems={faqLeft} rightItems={faqRight} title='Terms' />
            
            <Footer />
        </>
    );
}

export default Subscription;