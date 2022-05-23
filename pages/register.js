import { List,ListItem, Typography,TextField ,Button} from '@mui/material'
import React,{useEffect,useContext,useState} from 'react'
import Layout from '../components/Layout'
import Link from '../src/Link'
import { useRouter } from 'next/router';
import axios from 'axios';
import { Store } from '../utils/store';

function Register() {

    const router = useRouter();
    const { redirect} = router.query
    const { state , dispatch} = useContext(Store)
    const { userInfo } =  state;
    useEffect(()=>{

        if(userInfo){
            router.push('/')
        }

    },[])
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
        const submitHandler = async ( e) =>{
            e.preventDefault();
            // alert("event handler workder")
            if(password !== confirmPassword){
                window.alert("passwords don't match");
                return;
            }
            // console.log(name,email,password)

            try {
                const {data} = await axios.post('/api/users/register',{
                  name,
                  email,
                  password,
                });
                console.log(data)
                dispatch({ type: 'USER_LOGIN', payload: data});
                Cookies.set('userInfo',JSON.stringify(data));
                router.push(redirect || '/');
              } catch (err) {
                // alert(err.response.data ? err.response.data.message : err.message);
                alert(err.response.data)
              }
            
        }

  return (
    <Layout title="register">
            <form onSubmit={submitHandler}>
                <Typography>Register</Typography>
                <List>
                    <ListItem>
                    <TextField
                        variant="outlined"
                        fullWidth
                        id="name"
                        label="Name"
                        inputProps={{ type: 'text' }}
                        onChange={(e) => setName(e.target.value)}
                        ></TextField>
                    </ListItem>
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
            <TextField
              variant="outlined"
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              inputProps={{ type: 'password' }}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Register
            </Button>
          </ListItem>
          <ListItem>
            Already have an account? &nbsp;
            <Link href={`/LogIn?redirect=${redirect || '/'}`} >
              Login
            </Link>
          </ListItem>
        </List>
      </form>
    </Layout>
  )
}

export default Register