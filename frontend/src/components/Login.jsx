import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contacts/AuthProvider";
import googleLogo from "../assets/google-logo.svg";
import bgImage from "../assets/bg.png";

const Login = () => {
  const { login, signUpWithGmail } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const from = "/admin/dashboard/manage";

  //login using email & password
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    login(email, password)
      .then((result) => {
        // Signed in
        const user = result.user;
        console.log("Navigating to:", from);
        navigate(from, { replace: true });
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
        // ..
      });
  };

  //login using google
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="h-screen md:flex">
      <div
        className="flex md:w-full justify-center py-10 items-center bg-white"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <div
          className="absolute inset-0 z-10"
          style={{
            background: "linear-gradient(to top, #71717a , #164e63)",
            opacity: "0.7",
            mixBlendMode: "normal",
          }}
        ></div>
        <form
          className="bg-[#15172b] z-10 rounded-md p-10"
          onSubmit={handleLogin}
        >
          <h1 className="text-white text-center font-bold text-2xl mb-1">
            Hello Admin!
          </h1>
          <p className="text-sm font-normal text-white text-center mb-7">
            Login here
          </p>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 border-stone-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 ml-2 outline-none border-none rounded-md"
              autoComplete="off"
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl border-stone-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 ml-2 outline-none border-none rounded-md"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </div>
          {errorMessage ? (
            <p className="text-red-500 text-base">
              email or password is incorrect
            </p>
          ) : (
            ""
          )}
          <button
            type="submit"
            className="block w-full bg-blue-600  hover:bg-yellow-300 hover:text-red-800 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 transition delay-75 ease-in-out"
          >
            Login
          </button>
          {/* <button */}
          {/*   onClick={handleRegister} */}
          {/*   className="block w-full bg-red-800 hover:bg-yellow-300 hover:text-red-800 mt-4 py-2 rounded-2xl text-white font-semibold mb-2" */}
          {/* > */}
          {/*   <img src={gLogo} className="w-6 h-6 inline-block" /> */}
          {/*   Login with Google */}
          {/* </button> */}

          {/*<p className="text-sm ml-2 text-white text-center cursor-pointer">*/}
          {/* Already had an account?{" "} */}
          {/*<Link */}
          {/* to="/sign-up" */}
          {/* className="text-blue-400 hover:text-yellow-300 underline font-semibold" */}
          {/*> */}
          {/*Signup */}
          {/*</Link> */}
          {/*. */}
          {/*</p> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
