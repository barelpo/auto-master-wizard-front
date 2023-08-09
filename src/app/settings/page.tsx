'use client'

import { Button, Stack, TextField, Typography } from "@mui/material";
import { useAuth, useAuthDispatch } from "../../../context/authContext";
import { useState } from "react"




const handleSubmit = () =>{

}

const Settings = () => {

  const auth = useAuth()
  const authDispatch = useAuthDispatch()

   const [firstName, setFirstName] = useState<string>('')
   const [lastName, setLastName] = useState<string>('')
   const [email, setEmail] = useState<string>('')

  return(
    <div style = {{justifyContent: 'center', alignItems: 'center'}}>
      <Stack spacing={10} direction='column' justifyContent='center' alignItems='center'>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} direction="column" justifyContent="center" alignItems="center"
            sx={{maxWidth: "700px", margin: "auto", marginTop: "130px"}}>
            <Typography
              variant="h5"
              noWrap
              sx={{
                mb: '35px',
                display: { md: 'flex' },
                fontFamily: 'cursive',
                fontWeight: 700,
                color: 'royalblue',
                textDecoration: 'none',}}>
              Update Personal Details
            </Typography>
            <TextField 
              id="outlined-basic" 
              label={`First name: ${auth?.user?.firstName}`}
              variant="outlined"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField 
              id="outlined-basic" 
              label={`Last name: ${auth?.user?.lastName}`}
              variant="outlined"
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField 
              id="outlined-basic" 
              label={`E-mail: ${auth?.user?.email}`} 
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button variant="outlined" type="submit">Confirm</Button>
          </Stack>
        </form>
      </Stack>
    </div>
  )
}

export default Settings;

