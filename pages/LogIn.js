import { Button, List, ListItem, TextField, Typography } from '@mui/material'
import React,{ useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Link from '../src/Link'
import { Store } from '../utils/store';
import axios from 'axios'
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';


function LogIn() {

  const router = useRouter();
  const { redirect } = router.query; // login?redirect=/shipping
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
    
    }
  }, []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submitHandler = async (e) => {
    e.preventDefault();   
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo',JSON.stringify(data));
      router.push(redirect ||  '/');

      // alert('succss login');
    } catch (err) {
      console.log(err)
      alert(err.response.data ? err.response.data.message : err.message);
    }
  };
  return (
      <Layout title="Login">
          <form  onSubmit={submitHandler}>
            <Typography  variant="h4">
          Login
            </Typography>
            <List>
                <ListItem>
                <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: 'email' }}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
                </ListItem>
                <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              inputProps={{ type: 'password' }}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Login
            </Button>
          </ListItem>
          <ListItem>
          
                  {"Don't have an account?"} &nbsp;
              <Link href="/register">Register</Link>
        
          </ListItem>
            </List>
          </form>
      </Layout>
  )
}

export default LogIn