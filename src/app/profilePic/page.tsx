"use client"

import * as React from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { styled } from '@mui/joy';
import { useState, ChangeEvent, useEffect} from "react"
import axios, { AxiosProgressEvent } from 'axios';
import { PROFILE_IMG_PRESIGNED_URL, PROFILE_IMG_UPLOAD_DONE_URL } from '../../../infra/urls';
import { Button, LinearProgress, Stack, Typography } from '@mui/material';
import { useAuth, useAuthDispatch } from '../../../context/authContext';
import { UserActionType } from '../../../types/intefaces';


const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;


export default function ProfilePic (){

  const [selectedFile, setFile] = useState<File>()
  const [inFlight, setInFlight] = useState(false)
  const [progress, setProgress] = useState(0)

  console.log('progress', progress)

  const authDisapcth = useAuthDispatch()
  const auth = useAuth()

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
      console.log('selection done')
    }
  }

  const handleUploadProgress = (progressEvent: AxiosProgressEvent) => {
    console.log('called progress', progressEvent.progress)
    if (progressEvent.progress) {
        setProgress(progressEvent.progress * 100)
    }
  }


  const handleFileUpload = async () => {
    try{
      let response = await axios.post(
        PROFILE_IMG_PRESIGNED_URL,
        {filename: selectedFile?.name}
      )

      console.log(response)
      const objectName = response.data.fields.key

      response = await axios.post(
        response.data.url,
        {
          ...response.data.fields,
          file: selectedFile
        },
        {headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: handleUploadProgress
      }
      )

      response = await axios.post(
        PROFILE_IMG_UPLOAD_DONE_URL,
        {object_name: objectName}
      )
      
      authDisapcth({
        type: UserActionType.Login,
        context: response.data
      })
      
    } catch (e){
      console.error(e)
    } finally{
      setProgress(0)
    }

  }

  useEffect(() => {
    handleFileUpload()
  }, [selectedFile])

  return(
    <div style = {{justifyContent: 'center', alignItems: 'center'}}>

      <Stack spacing={6} direction='column' justifyContent='center' alignItems='center' sx={{mt: '90px'}}>

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
          Update Profile Picture
        </Typography>

        <input 
          type="file" 
          accept="image/*"
          multiple={false}
          onChange={(e) => {
            handleFileSelect(e)
          }}
          disabled={inFlight}
          id='file-input'
          style={{display: 'none'}}/>

        <img style={{height: '280px'}} src={auth?.user?.imgUrl}/>
          
        <Button 
          variant='contained'
          color='primary'
          component = 'label'
          htmlFor = 'file-input'
          disabled={inFlight}> 
          Upload File 
          <FileUploadIcon sx={{ml: '8px'}}/>
        </Button>

        {progress > 0 && <LinearProgress variant='determinate' value={progress} sx={{width: '80%'}}/>}
      
      </Stack>
    </div>
  )
}