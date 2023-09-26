import React, { useState } from 'react';
import { auth } from "../../firebaseConfig";
import { Link, useHistory } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function SignUp() {
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [successMsg, setSuccessMsg] = useState(""); // Add this state

  const handleSubmission = async () => {
    if (!values.email || !values.pass ) {
      setErrorMsg("Fill all fields");
      return;
    }
    if (values.pass.length < 6) {
      setErrorMsg('Length of password should be more than 6');
      return;
    }
    setErrorMsg("");
  
    setSubmitButtonDisabled(true);
    try {
      const emailExists = await auth.fetchSignInMethodsForEmail(values.email);

      if (emailExists.length > 0) {
        setErrorMsg('Account already exists with this email.');
        setSubmitButtonDisabled(false);
        return;
      }
      // Register the user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.pass
      );
      const user = userCredential.user;
  
      // Additional user data to be saved in Firestore
      const userData = {
        name: values.name,
        email: values.email, // You can also store the email if needed
        phone: values.phone,
      };
  
      // Define a reference to the user's document in Firestore
      // const userDocRef = doc(db, "users", user.uid);
  
      // Set the user data in Firestore
      // await setDoc(userDocRef, userData);
  
      setSubmitButtonDisabled(false);
      setSuccessMsg("Registration successful! You can now log in.");
      history.push("/login?registrationSuccess=true");
    } catch (err) {
      console.error(err);
      setSubmitButtonDisabled(false);
      setErrorMsg(err.message);
    }
  };
  
  

  return (
    <div className="login-container">
      <h2 className="login-heading">SignUp</h2>
      <input
        className="input-field"
        type="text"
        placeholder="Email"
        value={values.email}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, email: event.target.value }))
        } />
      <input
        className="input-field"
        type="password"
        placeholder="Password"
        value={values.password}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, pass: event.target.value }))
        } />
      <div className="button-container">
      <b className="error">{errorMsg}</b>
        <b className="success">{successMsg}</b>
        <button onClick={handleSubmission} disabled={submitButtonDisabled}>
          SignUp
        </button>
        <p>
          Already have an account?{" "}
          <span>
            <Link to="signin/">Sign In</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;