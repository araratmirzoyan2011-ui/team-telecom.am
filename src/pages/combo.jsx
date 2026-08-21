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

function HomeCombo() {
    const handleJoin = (pkg) => {
        alert(`Joining ${pkg.heading}`);
    };

    return (
        <>
            <Header />

            {bgimg("https://www.telecomarmenia.am/images/sliders_block_slides/1/17494570057719.png")}
            
            <div className='w-full min-h-[500px] flex items-center justify-center bg-[#024566]'>
                <N2
                    src="https://www.telecomarmenia.am/images/block_with_text/1/17788403748713.jpeg"
                    h1='Connect Internet and TV online'
                    p="Send an ONLINE REQUEST and we will connect Your COMBO service package within 5 working days. Connectivity and setup of the Wi-FI device are FREE all over the country."
                    col="text-white"
                />
            </div>

            <div className='w-full flex justify-center mt-[40px]'>
                <h1 className='text-[48px] font-bold text-gray-800'>Choose Your COMBO</h1>
            </div>
            
            <div className='w-4/5 mx-auto min-h-[500px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px] my-10'>
                {comboPackagesData.map((pkg) => {
                    if (pkg.isCustom) {
                        return (
                            <div key={pkg.id} className="w-full max-w-[340px] bg-[#003d5b] text-white rounded-lg shadow-lg flex flex-col justify-between p-8 text-center border border-gray-200">
                                <div>
                                    <h2 className="text-2xl font-bold">{pkg.title}</h2>
                                    <p className="mt-4 text-gray-200">{pkg.description}</p>
                                </div>
                                <div className="mt-6">
                                    <a href={pkg.linkTo} className="inline-block bg-[#ff4d4f] hover:bg-[#ff7875] text-white font-bold py-3 px-12 rounded-full transition-colors cursor-pointer">
                                        {pkg.buttonText}
                                    </a>
                                </div>
                            </div>
                        );
                    }
                    return (
                        <PackageCard 
                            key={pkg.id} 
                            packageData={pkg} 
                            onJoin={() => handleJoin(pkg)} 
                        />
                    );
                })}
            </div>

            <N3
                src='https://www.telecomarmenia.am/images/block_with_text/1/17761517712737.png'
                h1='Be Free at a special price'
                p='Become a subscriber of one of the COSMO or COMBO packages and get up to 3 SIM cards at special rates'
            />

            <div className="w-full bg-[#024566] py-16 px-4">
                <div className='w-full flex justify-center text-white text-[32px] md:text-[48px] mb-[40px] text-center'>
                    <h1>Get Be Free packages at a special price</h1>
                </div>
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap justify-center items-stretch gap-6">
                        <TariffCards />
                    </div>
                </div>
            </div>

            <div className='w-full min-h-[500px] flex justify-center items-center'>
                <N8
                    h1='Send a request'
                    p='Check maximal speed of home Internet by sending a request․'
                    button='Join'
                    col="text-[#01425f]"
                />
            </div>

            <div className='w-full h-auto bg-[#083f58] py-8'>
                <N1 arr={arr1} h1='TeamTV' />
            </div>

            <Faq leftItems={faqLeft} rightItems={faqRight} title='Terms' />
            
            <Footer />
        </>
    );
}

export default HomeCombo;