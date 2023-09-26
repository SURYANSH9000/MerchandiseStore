import React from 'react';
import { auth } from '../../firebaseConfig';

const SignOut = () => {
  const signOut = async () => {
    try {
      await auth.signOut();
      // Redirect or perform actions upon successful sign out
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <div>
      <h2>Sign Out</h2>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

export default SignOut;
