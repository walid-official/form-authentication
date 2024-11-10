import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithPopup } from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../../firebase/firebase.init";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();




  const handleSignUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth,provider)
    .then((result) => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    })
  }


  const handleSubmitForm = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const terms = e.target.terms.checked;

    console.log(email, password);

    setErrorMessage("");

    if(!terms){
      setErrorMessage('Please Accept out terms and condition');
      return;
    }


    if (password.length < 6) {
      setErrorMessage("you must commit 6 characters");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "At Least one upperCase one LowerCase one Number and min 6 digits"
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        setSuccessMessage("your Account is Successfully done");

        sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log("Verify Your Email Address");
        })


      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const handleForgetPassword = () => {
      console.log(emailRef.current.value);
      const email = emailRef.current.value;
      if(!email){
        console.log("Please Provide a Valid Email Address");
      }
      else{
        sendPasswordResetEmail(auth,email)
        .then(() => {
          alert("Reset Email Sent,Please Check Your Email Address")
        })
      }
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmitForm} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                ref={emailRef}
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="input input-bordered"
                required
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className=" absolute right-3 top-[54px]"
              >
                {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
              </button>
              <label className="label">
                <button onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </button>
              </label>

              <div className="form-control">
                <label className="label justify-start cursor-pointer">
                <input type="checkbox" name="terms" className="checkbox" />
                  <span className="label-text ml-4">Accept Your Terms and Condition</span>
                </label>
              </div>

            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign Up</button>
              <button onClick={handleSignUpWithGoogle} className="btn btn-primary my-2">Sign Up With Google</button>
            </div>
            {successMessage && (
              <p className="text-green-700">{successMessage}</p>
            )}
            {errorMessage && <p className="text-red-700">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
