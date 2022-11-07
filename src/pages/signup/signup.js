import {
  auth,
  firestore,
  // database,
  // storage
} from "../../api/firebase";
import { getErrorMessage, signUpForm } from './libs'
import { Link } from "react-router-dom";
import { FormComp } from "../../components";
import { useState } from "react";
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from "firebase/auth";

export const SignupPage = () => {
  const [error, setError] = useState('');

  const onSubmit = async ({
    email,
    password,
    displayName,
    photoURL,
    phoneNumber
  }) => {

    setError("Waiting...");
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(firestore, "users", res.user.uid), {
        uid: res.user.uid,
        email,
        displayName,
        photoURL,
        phoneNumber,
      });

      await setDoc(doc(firestore, "userChats", res.user.uid), {});

    } catch (error) {
      setError(getErrorMessage(error.message));
      return
    }
    setError('Success')
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Signup</h1>
      {error && <h3>{error}</h3>}
      <FormComp elementsArr={signUpForm} onSubmit={onSubmit} />
      <Link to="/login">Allready have an account? Log in.</Link>
    </div>
  )
}

// displayName: ""
// email: ""
// uid: ""
// photoURL: null
// phoneNumber: null

// isAnonymous: false
// accessToken: ""
// auth: {}
// emailVerified: false
// metadata: UserMetadata {createdAt: '1667500708933', lastLoginAt: '1667500708933', lastSignInTime: 'Thu, 03 Nov 2022 18:38:28 GMT', creationTime: 'Thu, 03 Nov 2022 18:38:28 GMT'}
// proactiveRefresh: ProactiveRefresh {user: UserImpl, isRunning: false, timerId: null, errorBackoff: 30000}
// providerData: [{…}]
// providerId: "firebase"
// reloadListener: null
// reloadUserInfo:{localId: 'pIQJ75w6xNhrNLhmjNCROwLInnq1', email: 'as@as.com', passwordHash: 'UkVEQUNURUQ=', emailVerified: false, passwordUpdatedAt: 1667500708933, …}
// stsTokenManager: StsTokenManager {refreshToken: 'AOEOulYedlkJWtuKx70VA2a_h4rlqCjkMv3JYNK6i7Pi3VEPaG…wWGtaa_cLtWY_76IrjVRpMnhVmFVRGE6doix5WNCYyovf9Oyw', accessToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImRjMzdkNTkzNjVjNjIyOG…3KzUwY993UloLRWlH3x18V4a4ZDnW6Zp3ZkUuVWviffLOHcew', expirationTime: 1667504309293}
// tenantId: null