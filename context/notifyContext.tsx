"use client"

import {createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect, useContext} from "react";
import { INotifyData } from "../types/intefaces";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const INITIAL_NOTIFICATION: INotifyData = {
  msg: "",
  status: ""
}

const NotifyContext = createContext<INotifyData | null>(null)
const SetNotifyContext = createContext<Dispatch<SetStateAction<INotifyData>>>(()=>{})

export const useNotifier = () => {
  return useContext(SetNotifyContext)
}

export const NotificationProvider = ({children,}: {children : ReactNode}) =>{
  const [notification, setNotification] = useState<INotifyData>(INITIAL_NOTIFICATION)

  useEffect(() =>{
    if (notification.status === 'success') {
      toast.success(notification.msg)
    }
  }, [notification])

  return(
    <NotifyContext.Provider value={notification}>
      <SetNotifyContext.Provider value={setNotification}>
        {children}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </SetNotifyContext.Provider>
    </NotifyContext.Provider>
  )
}