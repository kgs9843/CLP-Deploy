import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Reward from "./pages/Reward";
import FoodProcess from "./pages/FoodProcess";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/reward" element={<Reward />} />
        <Route path="/foodProcess" element={<FoodProcess />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
      <BottomNav />
    </BrowserRouter>
  );
}
export default App;
