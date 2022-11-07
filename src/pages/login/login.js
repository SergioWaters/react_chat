import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../api/firebase";
import { FormComp } from '../../components/';
import { useState } from "react";
import { Link } from "react-router-dom";
import { getProfile } from '../../store/profile/thunks';
import { useDispatch } from "react-redux";

const loginForm = [
  {
    value: 'email',
    attr: 'email',
  },
  {
    value: 'password',
    attr: 'password',
  },
]

export const LoginPage = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState('');

  const onSubmit = async (form) => {
    setError("Waiting...");
    try {
      const login = await signInWithEmailAndPassword(auth, form.email, form.password);
      console.log(login.user.uid)
      dispatch(getProfile(login.user.uid))
    } catch (error) {
      setError(error.message);
      return
    }
    setError('You logged')
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Log in</h1>
      {error && <h3>{error}</h3>}
      <FormComp elementsArr={loginForm} onSubmit={onSubmit} />
      <Link to="/signup">Do not have an account yet? Signup.</Link>
    </div>
  )
}