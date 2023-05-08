import React, { useState } from 'react';

import styles from './CreatePasswordForm.module.css';
import { isValidPassword } from '../../../../utils/isValidatePassword';
import { Layout } from '../../../../ui-kit/Layout';

type Props = {
  onBack: () => void;
  onPasswordCreated: (password: string) => void;
};

export function CreatePasswordForm({ onBack, onPasswordCreated }: Props) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onPasswordCreated(password);
  };

  const isSubmitDisabled =
    !password || password !== confirmPassword || !isValidPassword(password);

  return (
    <Layout>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Create Password</h2>

        <p className={styles.desc}>Please enter a strong password</p>

        <label className={styles.label} htmlFor='password'>
          Password
        </label>
        <input
          id='password'
          type='password'
          value={password}
          onChange={handlePasswordChange}
          className={styles.input}
          data-testid='password'
        />
        <div></div>
        <label className={styles.label} htmlFor='confirmPassword'>
          Confirm Password
        </label>
        <input
          id='confirmPassword'
          type='password'
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className={styles.input}
          data-testid='confirmPassword'
        />
        <button
          type='submit'
          disabled={isSubmitDisabled}
          className={styles.button}
        >
          Create
        </button>
        <button onClick={onBack} className={styles.button}>
          Back
        </button>
      </form>
    </Layout>
  );
}
