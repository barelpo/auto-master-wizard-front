'use client'

import { FormEvent, useState } from "react"
import axios from "axios"
import { GOOGLE_AUTH_URL, LOGIN_URL, USER_DATA_URL } from "../../../infra/urls"
import { useAuth, useAuthDispatch } from "../../../context/authContext"
import { redirect } from "next/navigation"
import { ACCESS_TOKEN } from "../../../infra/const"
import { UserActionType } from "../../../types/intefaces"
import { GoogleLogin } from '@react-oauth/google';
import { useNotifier } from "../../../context/notifyContext"
import { Button, Stack, TextField } from "@mui/material"


interface ITokens{
  access: string,
  refresh: string
}

export default function Login (){
  
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const authDispatch = useAuthDispatch()
  const auth = useAuth()
  const notifier = useNotifier()

  if (auth?.user) {
    redirect('/')
  }

  const handleSubmit = async (e: FormEvent) =>{
    e.preventDefault()
    try{
      let response = await axios.post (LOGIN_URL, {username: email, password})
      const tokens: ITokens = response.data
      localStorage.setItem(ACCESS_TOKEN, tokens.access)

      response = await axios.get(
        USER_DATA_URL, 
        {headers: {Authorization: `Bearer ${tokens.access}`}})
      
      authDispatch({type: UserActionType.Login, context: response.data})
      
    }catch (error){
      console.error(error)
    }
  }
  
  return(


    <div style = {{justifyContent: 'center', alignItems: 'center'}}>
      <Stack spacing={10} direction='column' justifyContent='center' alignItems='center'>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} direction="column" justifyContent="center" alignItems="center"
            sx={{maxWidth: "700px", margin: "auto", marginTop: "150px"}}>
            <TextField 
              id="outlined-basic" 
              label="E-mail" 
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}/>
            <TextField 
              type="password"
              id="outlined-basic" 
              label="Password" 
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}/>
            <Button variant="outlined" type="submit">Login</Button>
          </Stack>
        </form>

        <GoogleLogin
          onSuccess={async credentialResponse => {
            console.log(credentialResponse);

            try{
              const response = await axios.post(GOOGLE_AUTH_URL, {google_jwt: credentialResponse.credential})
              authDispatch({type: UserActionType.Login, context: response.data})
              localStorage.setItem(ACCESS_TOKEN, response.data.access)
              notifier({'msg': 'You have successfuly logged in', 'status': 'success'})

            }catch (error){

            }
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />;
      </Stack>
    </div>
  )
}