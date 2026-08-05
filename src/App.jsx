
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
function App() {
  return (
    <BrowserRouter>
      <div className="content">
        <Routes>
          <Route path="/page1" element={<Main />} />
          <Route path="/business" element={<Busines />} />
          <Route path="/ej3" element={<Shop />} />
          <Route path="/" element={<Main />} />
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;