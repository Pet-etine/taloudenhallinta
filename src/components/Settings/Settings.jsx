import styles from './Settings.module.scss';
import Button from '../../shared/buttons';
import { signOut, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

function Settings(props) {

  const logout = async () => {
    console.log("Logout button clicked");
    try {
      await signOut(props.auth);
      console.log("User logged out successfully");
      window.location.reload(); // Force a reload
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };

  const switchAccount = async () => {
    console.log("Switch Account button clicked");
    try {
      await signOut(props.auth); // Sign out the current user
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider); // Prompt login for a new account
      console.log("Switched to account:", result.user.email);
      window.location.reload();
    } catch (error) {
      console.error("Switch account error: ", error);
    }
  };

  return (
    <div className={styles.settings}>
      <h2>Settings</h2>
      <h3>Profile</h3>
      <div className={styles.settings_profile}>
        <div className={styles.settings_user}>
          <div><img src={props.user.photoURL} alt="User Avatar" /></div>
          <div>{props.user.displayName}<br />
            {props.user.email}</div>
        </div>
        <div>
          <Button primary onClick={logout}>Log Out</Button>
        </div>
      </div>

      <div className={styles.settings_actions}>
        <h3>Actions</h3>
        <Button primary onClick={switchAccount}>Switch Account</Button>
      </div>
    </div>
  );
}

export default Settings;
