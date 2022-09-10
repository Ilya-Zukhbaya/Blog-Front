import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispacth = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values) => {
    const data = await dispacth(fetchRegister(values));

    if (!data.payload) {
      return alert('Cannot register');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <TextField
          className={styles.field}
          label="Полное имя"
          fullWidth
          error={Boolean(errors.fullName?.message)}
          {...register('fullName', { required: 'Enter your Full Name' })}
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          fullWidth
          error={Boolean(errors.email?.message)}
          {...register('email', { required: 'Enter your Email' })}
        />
        <TextField
          className={styles.field}
          label="Пароль"
          type="password"
          fullWidth
          error={Boolean(errors.email?.message)}
          {...register('password', { required: 'Enter your password' })}
        />
        <Button disabled={isValid} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
