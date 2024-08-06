'use client';

import React, { useEffect } from "react";
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import styles from '../../styles/google-login.module.css'; 

interface GoogleLoginPopupProps {
  onSuccess: () => void;  // Callback when login is successful
  onClose: () => void;    // Callback to close the popup
}

const GoogleLoginPopup: React.FC<GoogleLoginPopupProps> = ({ onSuccess, onClose }) => {
  const session = useSession();
  const supabase = useSupabaseClient(); 
  const { isLoading } = useSessionContext();


  if (isLoading) {
    return <></>;
  }

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar',
        redirectTo: 'http://localhost:3000/guestListPage'
      }
    });
    if (error) {
      alert("Error logging in to Google provider with Supabase");
      console.log(error);
  } else {

    //onSuccess()
  }
  }



  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.header}>
          <h2>Sign in with Google</h2>
          <button className={styles.closeButton} onClick={onClose}>X</button>
        </div>
        <div className={styles.content}>
          <button onClick={googleSignIn} className={styles.googleButton}>
            <img src="google-logo.png" alt="Google logo" className={styles.googleLogo} />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoogleLoginPopup;
