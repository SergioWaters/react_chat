import { useDispatch, useSelector } from "react-redux";
import { } from "../../store/profile";
import { FormComp } from '../../components'
import styles from './index.module.css';

export const ProfilePage = (session) => {
  const dispatch = useDispatch();
  const {
    profile,
    errorUpdate,
    pendingUpdate } = useSelector((s) => s.profile);

  const profileForm = getProfileFarmElements(profile)

  const onSubmit = (form) => {
    if (form) {

    }
  };

  return (
    <div className={styles.wrapper}>

      <h1>Edit profile</h1>

      {errorUpdate && <h3>{errorUpdate.message}</h3>}
      {pendingUpdate && <h3>Waiting...</h3>}

      <FormComp elementsArr={profileForm} onSubmit={onSubmit} />


    </div>)
};

function getProfileFarmElements(user) {
  console.log(user)
  if (user) {
    return Object.entries(user).map(u => {
      return { value: u[1], attr: u[0] }
    })
  }
}