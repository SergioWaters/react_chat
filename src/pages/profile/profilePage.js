import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../../store/profile";
import { FormComp } from '../../components';
import styles from './index.module.css';
import { auth } from "../../api/firebase";
import { useEffect } from "react";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const {
    profile,
    errorUpdate,
    pendingUpdate } = useSelector((s) => s.profile);

  useEffect(() => {
    if (!profile.email)
      dispatch(getProfile(auth.currentUser.uid))
  }, [dispatch, profile])

  const profileForm = () => {
    return [
      {
        attr: 'email',
        value: profile.email,
        label: 'email'
      },
      {
        attr: 'displayName',
        value: profile.displayName,
        label: 'nickname'
      },
      {
        attr: 'photoURL',
        value: profile.photoURL,
        label: 'link to photo'
      },
      {
        attr: 'phoneNumber',
        value: profile.phoneNumber,
        label: 'phone number'
      }
    ]
  }

  const onSubmit = (form) => {
    if (form) {
      const updatedUser = {
        ...form, uid: profile.uid
      }
      dispatch(updateProfile(updatedUser))
    }
  };

  return (
    <div className={styles.wrapper}>

      <h1>Edit profile</h1>

      {errorUpdate && <h3>{errorUpdate.message}</h3>}
      {pendingUpdate && <h3>Waiting...</h3>}

      <FormComp elementsArr={profileForm()} onSubmit={onSubmit} />

    </div>)
};