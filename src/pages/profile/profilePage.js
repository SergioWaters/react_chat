import { useDispatch, useSelector } from "react-redux";
import {
  // getProfile, 
  updateProfile
} from "../../store/profile";
import { FormComp } from '../../components';
// import { auth } from "../../api/firebase";
import { useEffect, useState } from "react";
import { profileForm } from './lib'
import styles from './index.module.css';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const {
    profile,
    errorUpdate,
    pendingUpdate } = useSelector((s) => s.profile);
  const [message, setMessage] = useState('Hello ' + profile?.displayName)

  // useEffect(() => {
  //   const id = auth.currentUser.uid
  //   dispatch(getProfile(id))
  // }, [dispatch, profile]);

  useEffect(() => {
    pendingUpdate && setMessage('Waiting...');
    const mess = errorUpdate.message || 'Something went wrong';
    errorUpdate && setMessage(mess);
  }, [errorUpdate, pendingUpdate])

  const onSubmit = (form) => {
    if (Object.values(form).length) {
      const updatedUser = {
        ...form, uid: profile.uid
      }
      dispatch(updateProfile(updatedUser))
    }
  };

  return (
    <div className={styles.wrapper}>

      <h1>Edit profile</h1>

      <h3> {message} </h3>

      <FormComp elementsArr={profileForm(profile)} onSubmit={onSubmit} />

    </div>)
};