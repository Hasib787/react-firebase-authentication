import { useState } from "react";
import "./App.css";
import initializeAuthentication from "./Firebase/firebase.initialize";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

initializeAuthentication();

function App() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSingIn, setIsSingIn] = useState(false);
  const [error, setError] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleIsLoggedIn = (e) => {
    setIsSingIn(e.target.checked);
  };
  const handleRegistration = (e) => {
    e.preventDefault();
    // if (password.length < 8) {
    //   setError("Password should be at least 8 ");
    //   return;
    // }
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError("password must contain 2 upper case");
      return;
    }

    if (isSingIn) {
      handleSingIn();
      setError("");
    } else {
      handleSignUp();
      setError("");
    }
    console.log(email, password);
  };

  const handleSingIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        verifyEmail();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then((result) => {});
  };

  return (
    <div className="m-5">
      <div>
        <form onSubmit={handleRegistration}>
          <h3 className="text-primary">
            {isSingIn ? "Sign In" : "Registration"}
          </h3>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              onBlur={handleChangeEmail}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              onBlur={handleChangePassword}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <div className="mb-3 form-check">
            <input
              onChange={handleIsLoggedIn}
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Already LoggedIn
            </label>
          </div>
          <div className="text-danger">
            <p>{error}</p>
          </div>
          <button type="submit" className="btn btn-primary">
            {isSingIn ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
