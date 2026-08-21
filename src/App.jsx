
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Main from "./pages/page1";
import Busines from "./pages/busines";
import Shop from "./pages/ej3";
import About from "./pages/about-us";
import "./App.css";
import NewsPage from './pages/new-page';
import Paymanner from "./pages/paymanner";
import Connections from "./pages/conmus";
import News from "./pages/news"
import Carrer from "./pages/carrer";
import Hphone from "./pages/home-phone";
import Login from "./pages/login";
import User from "./pages/user";
import Applicate from "./pages/Applications";
import TeamTv from "./pages/TeamTv";
import MyTeam from "./pages/MyTeam";
import TeamPay from "./pages/TeamPay";
import TeamEnergy from "./pages/TeamEnergy";
import { imp } from "./Components/input";
import ResultsAndReporting from "./pages/res";
import Sus from "./pages/sus";
import Tosh from "./pages/Tosh";
import TermandCon from "./pages/TermandCon";
import Security from "./pages/Security";
import Mobile from "./pages/Mobile";
import Corporate from "./pages/Corporate";
import M2M from "./pages/M2m";
import CorEth from "./pages/CorEthCon";
import Coverage from "./pages/Coverage";
import DeliveryTable from "./pages/deliveryTerm";
import UsfullDoc from "./pages/UsfullDoc";
import CreditTable from "./pages/Creditterm";
import BranchesMap from "./pages/ServiceCenters";
import CoverageMap from "./pages/MobNetwork";
import Internet from "./pages/InternetArias";
import Parthner from "./pages/Parthners";
import Parthners2 from "./pages/Parthners2";
import Sales from "./pages/Sales";
import Policy from "./pages/Privacy-Policy";
import Code from "./pages/region-code";
import IC from "./pages/intelect-comunication";
import CostControl from "./pages/Cost-Control"
import OnlineCredit from "./pages/Online-Credit";
import MobileID from "./pages/Mobile-Id";
import SMS from "./pages/SMS";
import InternetTV from "./pages/Internet-and-Tv";
import ForSmartphone from "./pages/forSmartphones";
import PcTablet from "./pages/ForPcTablet";
import Payment from "./pages/PaymentService";
import Entertainment from "./pages/Entertainment";
import CallSecurity from "./pages/calls-security";
import HomePhone2 from "./pages/home-phone2";
import InternationalCalls from "./pages/international-calls";
import Useful from "./Components/useful-information";
import Services from "./pages/services";
import Combo from "./pages/combo-tariffs";
import HomeCombo from "./pages/combo";
import Subscription from "./pages/subscription";
import TeamTv2 from "./pages/teamtv2";
import Koreez from "./pages/Koreez";
import Gfn from "./pages/gfn-games";
import TeamBonus from "./pages/team-bonus";
import Mobibattle2 from "./pages/mobibattle";
function App() {
  return (
    <BrowserRouter>
      <div className="content">
        <Routes>
          <Route path="/page1" element={<Main />} />
          <Route path="/Internet-and-Tv" element={<InternetTV />} />
          <Route path="/mobibattle" element={<Mobibattle2 />} />
          <Route path="/services" element={<Services />} />
          <Route path="/useful-information" element={<Useful />} />
          <Route path="/team-bonus" element={<TeamBonus />} />
          <Route path="/gfn-games" element={<Gfn />} />
          <Route path="/teamtv2" element={<TeamTv2/>} />
          <Route path="/Entertainment" element={<Entertainment />} />
          <Route path="/Koreez" element={<Koreez />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/international-calls" element={<InternationalCalls />} />
          <Route path="/combo" element={<HomeCombo />} />
          <Route path="/combo-tariffs" element={<Combo />} />
          <Route path="/home-phone2" element={<HomePhone2 />} />
          <Route path="/calls-security" element={<CallSecurity />} />
           <Route path="/PaymentService" element={<Payment />} />
          <Route path="/ForPcTablet" element={<PcTablet />} />
          <Route path="/forSmartphones" element={<ForSmartphone />} />
          <Route path="/business" element={<Busines />} />
          <Route path="/Online-Credit" element={<OnlineCredit/>} />
          <Route path="/SMS" element={<SMS/>} />
          <Route path="/Mobile-Id" element={<MobileID/>} />
          <Route path="/ej3" element={<Shop />} />
          <Route path="/intelect-comunication" element={<IC/>} />
          <Route path="/" element={<Main />} />
          <Route path="/region-code" element={<Code />} />
          <Route path="/Cost-Control" element={<CostControl/>} />
          <Route path="/about-us" element={<About />} />
          <Route path="/news/:id" element={<NewsPage />} />
          <Route path="/paymanner" element={<Paymanner />} />
          <Route path="/conmus" element={<Connections />} />
          <Route path="/news" element={<News/>} />
          <Route path="/carrer" element={<Carrer/>} />
          <Route path="/home-phone" element={<Hphone/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/user" element={<User />} />
          <Route path="/Applications" element={<Applicate />} />
          <Route path="/TeamTv" element={<TeamTv />} />
          <Route path="/MyTeam" element={<MyTeam />} />
          <Route path="/TeamPay" element={<TeamPay />} />
          <Route path="/TeamEnergy" element={<TeamEnergy />} />
          <Route path="/res" element={<ResultsAndReporting />} />
          <Route path="/sus" element={<Sus />} />
          <Route path="/Tosh" element={<Tosh />} />
          <Route path="/TermandCon" element={<TermandCon />} />
          <Route path="/Security" element={<Security />} />
          <Route path="/Mobile" element={<Mobile />} />
          <Route path="/Corporate" element={<Corporate />} />
          <Route path="/M2m" element={<M2M/>} />
          <Route path="/CorEthCon" element={<CorEth/>} />
          <Route path="/Coverage" element={<Coverage/>} />
          <Route path="/deliveryTerm" element={<DeliveryTable/>} />
          <Route path="/UsfullDoc" element={<UsfullDoc/>} />
          <Route path="/Creditterm" element={< CreditTable/>} />
          <Route path="/ServiceCenters" element={< BranchesMap/>} />
          <Route path="/MobNetwork" element={< CoverageMap/>} />
          <Route path="/InternetArias" element={< Internet/>} />
          <Route path="/Parthners" element={< Parthner/>} />
          <Route path="/Parthners2" element={< Parthners2/>} />
          <Route path="/Sales" element={< Sales/>} />
          <Route path="/Privacy-Policy" element={<Policy/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;