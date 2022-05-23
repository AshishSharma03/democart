import React, { useContext,useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../utils/store';

function Shipping() {
    const router = useRouter();

    const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  
  useEffect(() => {
    if(!userInfo){
        // enqueueSnackbar("you need to login first",{variant: 'info'})
        router.push('/LogIn?redirect=/shipping'); 
    }
   
})
  return (
    <div>shipping</div>
  )
}

export default Shipping 