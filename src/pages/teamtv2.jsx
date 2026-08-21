import { header as Header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { N } from '../Components/stylei1.jsx';
import { N2 } from '../Components/style2.jsx';
import { Faq } from '../Components/Faq.jsx';
import { ph as Ph } from '../Components/ph';
import { useState } from 'react';
import { S1 } from '../Components/st1.jsx';
const arr2 = [
  { 
    img: "https://www.telecomarmenia.am/file_manager/cosmo/icons/2_icon.png", 
    title: "Catch-Up up-to 7 days", 
    text: "You will never miss your favorite TV programs and movies" 
  },
  { 
    img: "https://www.telecomarmenia.am/file_manager/cosmo/icons/3_icon.png", 
    title: "Huge Video Library", 
    text: "Large selection of movies, cartoons and TV series" 
  },
  { 
    img: "https://www.telecomarmenia.am/file_manager/cosmo/icons/4K_icon.png", 
    title: "TV box with 4K opportunity" 
  }
];

export const faqLeft = [
    {
        q: "What does it mean to purchase a number by subscription?",
        a: "Here you can place the detailed description of purchasing a number by subscription."
    },
    {
        q: "What are the conditions for purchasing a number by subscription?",
        a: "Here you can place the conditions regarding the subscription purchase."
    }
];

export const faqRight = [
    {
        q: "How to get a number by subscription?",
        a: "Here you can place instructions on how to get a number by subscription."
    },
    {
        q: "What happens if contract is terminated before the specified period?",
        a: "Here you can place details regarding early contract termination."
    }
];

function TeamTv2() {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <>
            <Header />

            <div className='mt-[100px]'></div>
            <N 
                src="https://www.telecomarmenia.am/file_manager/cosmo/img/iptv.png" 
                arr={arr2} 
            />

            <div className='w-full flex justify-center my-10'>
                <h2 className='text-[36px] font-bold text-[#024566]'>How to register in application?</h2>
            </div>

            <div className='w-[60%] mx-auto grid grid-cols-3 my-10 gap-6'>
                <Ph 
                    src="https://www.telecomarmenia.am/file_manager/teamtv/teamTV_1000x500.png" 
                    text="1. Download TeamTV application" 
                />
                <Ph 
                    src="https://www.telecomarmenia.am/file_manager/teamtv/profile.png"
                    text="2. Register dialing *818# request" 
                />
                <Ph 
                    src="https://www.telecomarmenia.am/file_manager/teamtv/play.png"
                    text="3. Watch for many movies and cartoons" 
                />
            </div>
            <div className='w-full min-h-[500px] flex items-center justify-center bg-[#01415f]'>
                            <N2
                                src="https://www.telecomarmenia.am/file_manager/teamtv/Team%20tv%20landing.jpg"
                                h1='TeamTV is available to everyone'
                                p="- Download and register in the TeamTV app
                                - Subscribe to any of the following tariff plans: teamTV Start, teamTV Public, teamTV Max
                                - Enjoy watching a variety of channels with TeamTV"
                                col="text-white"
                            />
                        </div>
                        <div className='w-full max-w-4xl mx-auto my-16 px-4'>
                <div className='flex justify-center mb-8'>
                    <h2 className='text-[36px] font-bold text-[#024566]'>Tariff plans</h2>
                </div>

                {/* Թաբերի (Tabs) կոճակները */}
                <div className='flex flex-col sm:flex-row bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden cursor-pointer'>
                    {/* Թաբ 1: For mobile */}
                    <div 
                        onClick={() => setActiveTab(0)}
                        className={`flex-1 flex items-center justify-center gap-6 py-6 px-8 transition-all ${
                            activeTab === 0 
                                ? 'bg-[#01425f] text-white' 
                                : 'bg-white text-[#01425f] hover:bg-gray-50'
                        }`}
                    >
                        <svg className={`w-10 h-10 ${activeTab === 0 ? 'text-white' : 'text-[#01425f]'}`} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.875 2.122L7.5 21h9l-.625-.621A3 3 0 0115 18.257V17.25m-6 0h6m-6 0H5.25A2.25 2.25 0 013 15V6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v8.25a2.25 2.25 0 01-2.25 2.25H9z" />
                        </svg>
                        <span className='text-xl font-medium'>For mobile</span>
                    </div>

                    {/* Թաբ 2: For mobile and Smart TV */}
                    <div 
                        onClick={() => setActiveTab(1)}
                        className={`flex-1 flex items-center justify-center gap-6 py-6 px-8 transition-all ${
                            activeTab === 1 
                                ? 'bg-[#01425f] text-white' 
                                : 'bg-white text-[#01425f] hover:bg-gray-50'
                        }`}
                    >
                        <svg className={`w-10 h-10 ${activeTab === 1 ? 'text-white' : 'text-[#01425f]'}`} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                        </svg>
                        <span className='text-xl font-medium'>For mobile and Smart TV</span>
                    </div>
                </div>

                {/* Թաբերի տակ փոխվող բովանդակությունը (Պլանները) */}
                <div className='mt-8 bg-white rounded-lg shadow-sm border border-gray-100 p-6'>
                    {activeTab === 0 ? (
                        <div className='text-center py-6 text-lg text-[#01425f] font-medium border-b border-gray-200'>
                            teamTV Start
                        </div>
                    ) : (
                        <>
                            <div className='text-center py-6 text-lg text-[#01425f] font-medium border-b border-gray-200'>
                                teamTV Public
                            </div>
                            <div className='text-center py-6 text-lg text-[#01425f] font-medium border-b border-gray-200'>
                                teamTV Max
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className='mt-[100px] w-full min-h-[500px] grid grid-cols-1 md:grid-cols-2 bg-[#01415f]'>
                 <S1
                src='https://www.youtube.com/embed/ZqXUbLS1dRw' 
                h1='New TeamTV guideline'
                p='- New design
                - Channels list by genres and opportunity to watch 2 channels simultaneously
                - Creation of favorite films list
                - Search of particular programs
                - Devices management'
                col="text-white"
/>
                </div>
            <Faq leftItems={faqLeft} rightItems={faqRight} title='FAQ' />
            
            <Footer />
        </>
    );
}

export default TeamTv2;