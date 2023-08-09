'use client'

import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react"
import { IUserData, UserActionType } from "../types/intefaces"
import { GoogleOAuthProvider } from '@react-oauth/google'

const authReducer = (userData: IUserData, action: {type: UserActionType, context: any}) =>{
  switch (action.type){
    case UserActionType.Login:
      const responseData =   action.context
      const newData:IUserData = {
        user: {
          id: responseData.id,
          firstName: responseData.first_name,
          lastName: responseData.last_name,
          email: responseData.email,
          username: responseData.username
        }
      }
    
      return newData
    case UserActionType.Logout:
      return {user: null} 
  }

}


const AuthContext = createContext<IUserData | null>(null)
const AuthDispatchContext = createContext<Dispatch<{ type: UserActionType; context: any; }>>(()=>{})

export const useAuth = () =>{
  return useContext(AuthContext)
}

export const useAuthDispatch = () =>{
  return useContext(AuthDispatchContext)
}

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [auth, authDispatch] = useReducer(authReducer, {user: null})

  return(

    <GoogleOAuthProvider clientId='350644933433-e7fjnb3gfukr75ftd33pmn3t8obf35h9.apps.googleusercontent.com'>
      <AuthContext.Provider value={auth}>
        <AuthDispatchContext.Provider value={authDispatch}>
          {children}
        </AuthDispatchContext.Provider>
      </AuthContext.Provider>
    </GoogleOAuthProvider>
  )
}