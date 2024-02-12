
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Coins from './components/Coin.jsx';
import Exchanges from './components/Exchanges.jsx';
import CoinsDetail from './components/CoinDetail.jsx';
import Footer from './components/Footer.jsx';
function App() {
  return (
    <Router>
      <Header/> 
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/coins" element={<Coins/>}/>
        <Route path="/exchanges" element={<Exchanges/>}/> 
        <Route path="/coin/:id" element={<CoinsDetail/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export const server=`https://api.coingecko.com/api/v3`;
export default App;
