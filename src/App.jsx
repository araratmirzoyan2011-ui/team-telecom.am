
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;