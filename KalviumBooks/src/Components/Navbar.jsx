import { useContext, useLayoutEffect } from "react";
import LogoImg from "./../assets/Logo.png";
import { AppContext } from "../ParentContext";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
  useLayoutEffect(()=>{
    const UserData = localStorage.getItem("User")
    if(UserData){
      setIsLoggedIn(true)
    }
  },[])
  const LogOutHandle = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("User")
    toast.success("Logged Out Successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <>
      <ToastContainer />
      <div className="navbar">
        <div>
          <Link to={"/"}>
            <img src={LogoImg} alt="" className="logo" />
          </Link>
        </div>
        <div>
          {isLoggedIn ? (
            <button
              className="button"
              onClick={() => {
                LogOutHandle();
              }}
            >
              Log Out
            </button>
          ) : (
            <Link to={"/register"}>
              <button className="button">Sign Up</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
