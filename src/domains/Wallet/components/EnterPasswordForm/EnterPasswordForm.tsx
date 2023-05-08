import React, { useState } from 'react';

import styles from './EnterPasswordForm.module.css';
import { isPasswordCorrect } from '../../../../storage';

type Props = {
  onBack: () => void;
  onPasswordConfirmed: (password: string) => void;
};

export function EnterPasswordForm({ onBack, onPasswordConfirmed }: Props) {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(event.target.value);
    setPasswordError(false);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (isPasswordCorrect(confirmPassword)) {
      onPasswordConfirmed(confirmPassword);
    } else {
      setPasswordError(true);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          id='confirmPassword'
          type='password'
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className={styles.input}
          data-testid='confirmPassword'
        />
        {passwordError && (
          <p className={styles.error}>
            The password you entered is not correct
          </p>
        )}
        <div>
          <button
            type='submit'
            className={styles.button}
            disabled={!confirmPassword}
          >
            Enter
          </button>
          <button onClick={onBack} className={styles.button}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
