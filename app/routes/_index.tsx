// routes/login.tsx
import { Button, Container, Typography } from '@mui/material';
import { json, redirect } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import TextInput from '~/components/TextInput';

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
};

export default function Index() {
  const data = useActionData();
  return (
    <Container sx={{ ...containerStyles }}>
      <img
        src='/assets/images/ipg-automotive-logo.svg'
        alt='logo'
        width={300}
      />
      <Form method='post' id='loginForm'>
        <TextInput id={'username'} label={'Username'} name={'username'} />
        <TextInput
          id={'password'}
          label={'Password'}
          name={'password'}
          type={'password'}
        />
        <Button type='submit' fullWidth variant='contained' color='primary'>
          Log In
        </Button>
      </Form>
      {data && <Typography>{data?.message}</Typography>}
    </Container>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const userCredentials = Object.fromEntries(formData);
  if (
    userCredentials.username === 'ipgautomotive' &&
    userCredentials.password === 'carmaker'
  ) {
    return redirect('/home-page');
  }
  return json({ message: 'Invalid user credentials!' });
}
