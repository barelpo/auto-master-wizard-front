import axios from "axios"
import { PROFILE_IMG_PRESIGNED_URL } from "../../infra/urls"

const handleFileUpload = async () =>{
  let response = await axios.post(
    PROFILE_IMG_PRESIGNED_URL,
    {}
  )
}