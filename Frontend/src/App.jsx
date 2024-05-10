import { Outlet } from "react-router-dom";
import { Navigation } from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Img from "../../uploads/Graduate.jpg"

function App() {
  return (
    <>
      <img src={"/uploads/Graduate.jpg"} alt="aaa" />
      <ToastContainer />
      <Navigation />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
}

export default App;
