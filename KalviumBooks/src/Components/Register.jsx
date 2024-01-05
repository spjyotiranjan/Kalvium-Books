import { useContext, useState } from "react";
import "./Register.css";
import eye from "./../assets/eye.png";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../ParentContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { setIsLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitSuccessful },
    reset,
    getValues
  } = useForm({
    mode:"all",
  });
  const password = watch("password");
  const formSubmitHandler = () => {
    setIsLoggedIn(true);
    const UserData = {
      FirstName: getValues("firstName"),
      LastName: getValues("lastName"),
      Email: getValues("email"),
      Password: getValues("password")
    }
    localStorage.setItem("User",JSON.stringify(UserData))
    setTimeout(() => {
      navigate("/");
    }, 4000);
    toast.success("Registered Successfully, ridirecting...", {
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
    <div>
      <ToastContainer />
      <div className="form">
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          {isSubmitSuccessful && (
            <div className="success">
              <p>Registration Successful</p>
            </div>
          )}
          <div>
            <label htmlFor="">Enter First Name</label>
            <input
              className="input"
              type="text"
              name="firstName"
              placeholder="ex. S P Jyotiranjan"
              {...register("firstName", {
                required: "Enter First Name",
                minLength: {
                  value: 4,
                  message: "Minimum 4 characters required",
                },
              })}
            />
            {errors.firstName && <p>{errors.firstName.message}</p>}
          </div>
          <div>
            <label htmlFor="">Enter Last Name</label>
            <input
              className="input"
              type="text"
              name="lastName"
              placeholder="ex. Sahoo"
              {...register("lastName", {
                required: "Enter Last Name",
              })}
            />
            {errors.lastName && <p>{errors.lastName.message}</p>}
          </div>
          <div>
            <label htmlFor="">Enter Email</label>
            <input
              className="input"
              type="text"
              name="email"
              placeholder="ex. jyotiranjan.sahoo@kalvium.community"
              {...register("email", {
                required: "Enter Email",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email not valid",
                },
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="">Enter Password</label>
            <div className="pass">
              <input
                className="input"
                type={show ? "text" : "password"}
                name="password"
                placeholder="ex. Sda%&#@8210dasd"
                {...register("password", {
                  required: "Enter Password",
                  minLength: {
                    value: 8,
                    message: "Password should be 8 characters long",
                  },
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[a-zA-Z]).{8,}$/,
                    message: "Password not valid",
                  },
                })}
              />
              <i>
                <img
                  className="eye"
                  onClick={()=>{
                    setShow(!show)
                  }}
                  style={{ filter: `invert(${show ? "0" : "0.4"})`,cursor:"pointer" }}
                  src={eye}
                  alt=""
                />
              </i>
            </div>
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <div>
            <label htmlFor="">Confirm Password</label>
            <div className="pass">
              <input
                className="input"
                type={confirmShow ? "text" : "password"}
                name="confirmPassword"
                placeholder="ex. Sda%&#@8210dasd"
                {...register("confirmPassword", {
                  required: "Confiirm Password",
                  validate: (value) => {
                    return value === password || "password doesn't match";
                  },
                })}
              />
              <i>
                <img
                  className="eye"
                  onClick={()=>{
                    setConfirmShow(!confirmShow)
                  }}
                  style={{ filter: `invert(${confirmShow ? "0" : "0.4"})`,cursor:"pointer" }}
                  src={eye}
                  alt=""
                />
              </i>
            </div>
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>
          <input type="submit" value={"Sign Up"} className="Submitbutton" />
          <button
            className="reset"
            onClick={() => {
              reset();
            }}
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
