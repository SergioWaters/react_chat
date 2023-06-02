import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../api/firebase";
import { FormComp } from '../../components/';
import { useState } from "react";
import { Link } from "react-router-dom";

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
  const [error, setError] = useState('');

  const onSubmit = async (form) => {
    setError("Waiting...");
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
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