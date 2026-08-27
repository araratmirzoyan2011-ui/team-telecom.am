import { useNavigate } from 'react-router-dom';
import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { bgimg } from "../Components/bg.jsx";
import { HBorder } from "../Components/hborder.jsx";
import { HBorder2 } from "../Components/hborder2.jsx";
import { share } from '../Components/Share.jsx';

function Ussd() {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            {header()}
            {bgimg("https://www.telecomarmenia.am/images/menu/1/16509767646793.png")}

            <div className="mt-[-50px] h-[120px] bg-white shadow-xl rounded-2xl flex justify-center items-center w-4/5 ml-[10%] max-[1200px]:w-[90%] max-[1200px]:ml-[5%] max-[900px]:w-[94%] max-[900px]:ml-[3%] z-10 relative border border-gray-100 backdrop-blur-md bg-white/95">
                <HBorder 
                    url="https://www.telecomarmenia.am/files/icons/1/16510715800139/45x45.png" 
                    text="FAQ" 
                    onClickHandler={() => navigate('/faq')} 
                />
                <HBorder
                    url="https://www.telecomarmenia.am/files/icons/1/16510715205036/45x45.png" 
                    text="Device settings" 
                    onClickHandler={() => navigate('/device-settings')} 
                />
                <HBorder2
                    url="https://www.telecomarmenia.am/files/icons/1/16510717960323/45x45.png" 
                    text="Subscriber service" 
                    onClickHandler={() => navigate('/b2c-subscriber-service')} 
                />
                <HBorder 
                    url="https://www.telecomarmenia.am/files/icons/1/16510713241559/45x45.png" 
                    text="USSD codes and useful numbers" 
                    onClickHandler={() => navigate('/ussd-and-numbers')} 
                />
            </div>

            <div className="w-[80%] ml-[10%] mt-[60px] mb-[100px]">
                <h1 className="text-[40px] font-extrabold text-gray-900 mb-[40px] tracking-tight">USSD codes and useful numbers</h1>

                <h2 className="text-[22px] font-bold text-gray-800 mb-[20px] flex items-center gap-2">
                    <span className="w-2 h-6 bg-blue-600 rounded-full inline-block"></span>
                    Free Team Information Telephone numbers
                </h2>
                <div className="overflow-x-auto mb-[50px] bg-white shadow-lg rounded-2xl border border-gray-100">
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700">Customer Support Center (from "Team" mobile number)</td><td className="p-5 font-bold text-blue-600 text-right">100</td></tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700">Customer Support Center (from a fixed telephone number)</td><td className="p-5 font-bold text-blue-600 text-right">100 / 080000611</td></tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700">Customer support centre (calls from CIS and other countries, only for subscribers of "Team" network.)</td><td className="p-5 font-bold text-blue-600 text-right">+37480000612</td></tr>
                            <tr className="hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700">Customer support centre for calls from abroad. Please note, that the call is charged.</td><td className="p-5 font-bold text-blue-600 text-right">+37480000611</td></tr>
                        </tbody>
                    </table>
                </div>

                <h2 className="text-[22px] font-bold text-gray-800 mb-[20px] flex items-center gap-2">
                    <span className="w-2 h-6 bg-blue-600 rounded-full inline-block"></span>
                    Balance check and Account recharge
                </h2>
                <div className="overflow-x-auto mb-[50px] bg-white shadow-lg rounded-2xl border border-gray-100">
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700">Balance check for prepaid payment system subscribers</td><td className="p-5 font-bold text-blue-600 text-right">*102#</td></tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700">Account recharge for another subscriber from fixed telephone</td><td className="p-5 font-bold text-blue-600 text-right">080000696</td></tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700">Information about the activated services at the moment of inquiry</td><td className="p-5 font-bold text-blue-600 text-right">*110*09#</td></tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700">Information about the parameters of your current tariff plan</td><td className="p-5 font-bold text-blue-600 text-right">*110*05#</td></tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700">Giga package balance check</td><td className="p-5 font-bold text-blue-600 text-right">*203#</td></tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700">Mega package balance check</td><td className="p-5 font-bold text-blue-600 text-right">*215#</td></tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700">3GB package balance check</td><td className="p-5 font-bold text-blue-600 text-right">*217#</td></tr>
                            <tr className="hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700">Phone number</td><td className="p-5 font-bold text-blue-600 text-right">*525#</td></tr>
                        </tbody>
                    </table>
                </div>

                <h2 className="text-[22px] font-bold text-gray-800 mb-[20px] flex items-center gap-2">
                    <span className="w-2 h-6 bg-blue-600 rounded-full inline-block"></span>
                    USSD codes for prepaid subscribers
                </h2>
                <div className="overflow-x-auto mb-[50px] bg-white shadow-lg rounded-2xl border border-gray-100">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50/70 border-b border-gray-100 text-left">
                                <th className="p-5 font-semibold text-gray-600 italic">Name</th>
                                <th className="p-5 font-semibold text-gray-600 italic">Price (AMD)</th>
                                <th className="p-5 font-semibold text-gray-600 italic text-right">USSD activation code</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-100 bg-blue-50/40 font-bold text-blue-900"><td colSpan="3" className="p-4">Tariff plans</td></tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700 font-medium">Be Free 2500</td><td className="p-5 text-gray-600">2500</td><td className="p-5 text-blue-600 font-bold text-right">*710#</td></tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700 font-medium">Be Free 3200</td><td className="p-5 text-gray-600">3200</td><td className="p-5 text-blue-600 font-bold text-right">*702#</td></tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700 font-medium">Be Free 3500</td><td className="p-5 text-gray-600">3500</td><td className="p-5 text-blue-600 font-bold text-right">*708#</td></tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700 font-medium">Be Free 5000</td><td className="p-5 text-gray-600">5000</td><td className="p-5 text-blue-600 font-bold text-right">*703#</td></tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700 font-medium">Be Free Premium</td><td className="p-5 text-gray-600">8000</td><td className="p-5 text-blue-600 font-bold text-right">*709#</td></tr>
                            
                            <tr className="border-b border-gray-100 bg-blue-50/40 font-bold text-blue-900"><td colSpan="3" className="p-4">Интернет</td></tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700 font-medium">Giga 15</td><td className="p-5 text-gray-600">5000</td><td className="p-5 text-blue-600 font-bold text-right">*1115#</td></tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700 font-medium">Giga 10</td><td className="p-5 text-gray-600">3500</td><td className="p-5 text-blue-600 font-bold text-right">*1110#</td></tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700 font-medium">Giga 5</td><td className="p-5 text-gray-600">2000</td><td className="p-5 text-blue-600 font-bold text-right">*1105#</td></tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700 font-medium">Giga 2</td><td className="p-5 text-gray-600">1000</td><td className="p-5 text-blue-600 font-bold text-right">*1102#</td></tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700 font-medium">Giga 1</td><td className="p-5 text-gray-600">700</td><td className="p-5 text-blue-600 font-bold text-right">*1101#</td></tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700 font-medium">Mega 500</td><td className="p-5 text-gray-600">150</td><td className="p-5 text-blue-600 font-bold text-right">*1500#</td></tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700 font-medium">Mega 300</td><td className="p-5 text-gray-600">100</td><td className="p-5 text-blue-600 font-bold text-right">*1150#</td></tr>
                            <tr className="hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700 font-medium">3 GB</td><td className="p-5 text-gray-600">500</td><td className="p-5 text-blue-600 font-bold text-right">*4100#</td></tr>
                        </tbody>
                    </table>
                </div>

                <h2 className="text-[22px] font-bold text-gray-800 mb-[20px] flex items-center gap-2">
                    <span className="w-2 h-6 bg-blue-600 rounded-full inline-block"></span>
                    USSD codes for postpaid subscribers
                </h2>
                <div className="overflow-x-auto mb-[50px] bg-white shadow-lg rounded-2xl border border-gray-100">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50/70 border-b border-gray-100 text-left">
                                <th className="p-5 font-semibold text-gray-600 italic">Name</th>
                                <th className="p-5 font-semibold text-gray-600 italic">Price (AMD)</th>
                                <th className="p-5 font-semibold text-gray-600 italic text-right">USSD activation code</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-100 bg-blue-50/40 font-bold text-blue-900"><td colSpan="3" className="p-4">Internet</td></tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700 font-medium">Giga 15</td><td className="p-5 text-gray-600">5000</td><td className="p-5 text-blue-600 font-bold text-right">*1115#</td></tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700 font-medium">Giga 10</td><td className="p-5 text-gray-600">3500</td><td className="p-5 text-blue-600 font-bold text-right">*1110#</td></tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700 font-medium">Giga 5</td><td className="p-5 text-gray-600">2000</td><td className="p-5 text-blue-600 font-bold text-right">*1105#</td></tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700 font-medium">Giga 2</td><td className="p-5 text-gray-600">1000</td><td className="p-5 text-blue-600 font-bold text-right">*1102#</td></tr>
                            <tr className="hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700 font-medium">3 GB</td><td className="p-5 text-gray-600">500</td><td className="p-5 text-blue-600 font-bold text-right">*4100#</td></tr>
                        </tbody>
                    </table>
                </div>

                <h2 className="text-[22px] font-bold text-gray-800 mb-[20px] flex items-center gap-2">
                    <span className="w-2 h-6 bg-blue-600 rounded-full inline-block"></span>
                    Emergency services (free of charge call)
                </h2>
                <div className="overflow-x-auto mb-[50px] bg-white shadow-lg rounded-2xl border border-gray-100">
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700 font-medium">Fire department</td><td className="p-5 font-bold text-blue-600 text-right">101</td></tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700 font-medium">Police</td><td className="p-5 font-bold text-blue-600 text-right">102</td></tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700 font-medium">Ambulance</td><td className="p-5 font-bold text-blue-600 text-right">103</td></tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700 font-medium">Emergency Gas Service</td><td className="p-5 font-bold text-blue-600 text-right">104</td></tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700 font-medium">Rescue Service</td><td className="p-5 font-bold text-blue-600 text-right">112</td></tr>
                            <tr className="hover:bg-gray-50/80 transition-colors"><td className="p-5 text-gray-700 font-medium">Emergency response service</td><td className="p-5 font-bold text-blue-600 text-right">911 / 112</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="w-[200px] h-[60px] ml-[10%] flex flex-row items-center justify-around text-[rgb(44,43,43)] mb-[60px]">
                {share()}
            </div>
            
            <Footer />
        </div>
    );
}

export default Ussd;