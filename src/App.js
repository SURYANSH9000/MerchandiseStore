import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import SignIn from './components/Auth/SignIn';
import SignOut from './components/Auth/SignOut';
import SignUp from './components/Auth/SignUp';
import MerchandiseList from './components/MerchandiseList';
import MerchandiseDetails from './components/MerchandiseDetails';
import { auth, firestore } from './firebaseConfig';
import Header from './components/Header';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser); // Set user if authenticated
      } else {
        setUser(null); // Set user to null if not authenticated
      }
    });

    return () => {
      unsubscribe(); // Cleanup the subscription when component unmounts
    };
  }, []);

  return (
    <Router>
      <Header />
      <Switch>
        {/* Route to Sign In */}
        <Route path="/signin" component={SignIn} />
        {/* Route to Sign Up */}
        <Route path="/signup" component={SignUp} />
        {/* Route to Merchandise List */}
        <Route
          path="/merchandise"
          exact
          render={() =>
            user ? (
              <MerchandiseList />
            ) : (
              <Redirect to="/signin" />
            )
          }
        />
        {/* Route to Merchandise Details */}
        <Route path="/merchandise/:id" component={MerchandiseDetails} />
        {/* Redirect to Merchandise List if no route matches */}
        <Route render={() => <Redirect to="/merchandise" />} />
      </Switch>
    </Router>
  );
}
export default App;
