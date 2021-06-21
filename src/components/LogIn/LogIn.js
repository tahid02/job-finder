import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ProcessPayment from "./ProcessPayment";
import axios from "axios";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// main component
const LogIn = () => {
  const { setLoggedInUser } = useContext(UserContext);
  const [createEmployerAccount, setCreateEmployerAccount] = useState(false);
  const [employerData, setEmployerData] = useState(null);
  const [accountTypePrice, setAccountTypePrice] = useState(["premium", 30]);
  const [employerDetails, setEmployerDetails] = useState({});

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const onSubmit = (data) => setEmployerData(data);

  // get which type of account is employer selecting ... basic/standard/premier
  const handleAccountType = (accountType) => {
    if (accountType === "premium") {
      setAccountTypePrice(["premium", 30]);
    } else if (accountType === "standard") {
      setAccountTypePrice(["standard", 20]);
    } else {
      setAccountTypePrice(["basic", 10]);
    }
  };

  // get employer payment information using stripe payment method
  const handlePaymentSuccess = (paymentId) => {
    if (employerData && paymentId) {
      console.log("employer data", employerData);
      const employerAllInfoJoined = {
        employerData,
        accountTypePrice,
        paymentId,
      };
      console.log("pay clicked", employerAllInfoJoined);
      setEmployerDetails(employerAllInfoJoined);
    } else {
      alert("please fill the data");
    }
  };

  // sign up with google
  const handleSignUp = (provider) => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("logged in user ", user);

        const { displayName, email, photoURL } = user;
        if (createEmployerAccount) {
          updateEmployerInfo(email);
        } else {
          updateJobSeekerInfo(email);
        }
        const signedInUser = { name: displayName, email, photoURL };
        setLoggedInUser(signedInUser);
        history.replace(from);
        console.log(signedInUser);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("error from google", errorMessage);
      });
  };

  //storing user all information in database if he/she is an employer
  const updateEmployerInfo = (email) => {
    const employerInfoWithEmail = {
      email,
      employerDetails,
      role: "employer",
    };
    console.log(employerInfoWithEmail);
    postUserInfo(employerInfoWithEmail);
  };

  const updateJobSeekerInfo = (email) => {
    const jobSeekerInfoWithEmail = {
      email,
      role: "jobSeeker",
    };
    postUserInfo(jobSeekerInfoWithEmail);
  };

  const postUserInfo = (userInformation) => {
    axios
      .post(
        "https://frozen-shelf-53269.herokuapp.com/userInfo",
        userInformation
      )
      .then((res) => {
        console.log("employerInfoWithEmail", res);
      })
      .catch((error) => console.log("error employerInfoWithEmail", error));
  };

  return (
    <div className="text-center">
      <div>
        join as :
        <button onClick={() => setCreateEmployerAccount(true)}>employer</button>
        <button onClick={() => setCreateEmployerAccount(false)}>
          job seeker
        </button>
      </div>
      {createEmployerAccount && (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("employer_name", { required: true })}
              placeholder="Job Title"
            />
            {errors.employer_name && (
              <span className="error">employer_name is required</span>
            )}

            <input
              {...register("company_name", { required: true })}
              placeholder="Job Title"
            />
            {errors.company_name && (
              <span className="error">company name is required</span>
            )}

            <input type="submit" value="save" />
          </form>
          <div>
            <div>
              <p>service type</p>
              <select
                style={{ padding: "0px", height: "40%", width: "" }}
                onChange={(e) => handleAccountType(e.target.value)}
              >
                <option className="  text-dark">premium</option>
                <option className="  text-dark">standard</option>
                <option className="text-dark">basic</option>
              </select>
              <div>account Price : {accountTypePrice[1]}</div>
            </div>
            <ProcessPayment
              handlePayment={handlePaymentSuccess}
              employerData={employerData}
            />
          </div>
        </div>
      )}

      <h4>sign in with google </h4>
      <button
        onClick={() => {
          handleSignUp(googleProvider);
        }}
        className="btn btn-outline-success px-3"
      >
        Log in
      </button>
    </div>
  );
};

export default LogIn;
