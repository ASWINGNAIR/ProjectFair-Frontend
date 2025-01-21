import { commonApi } from "./commonApi"
import {serverUrl} from "./serviceUrl"

// register request
export const requestApi =async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/register`,reqBody,"")
}

// Login request
export const loginApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/login`,reqBody,"")
}

// add projects
export const addProjectApi = async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/add-project`,reqBody,reqHeader)
}

// get home projects
export const homeProjectApi = async()=>{
    return await commonApi('GET',`${serverUrl}/home-project`)
}

// get all projects
// query parameter - baseUrl?key = value
export const allProjectApi = async(searchKey,reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/all-project?search=${searchKey}`,"",reqHeader)
}

// get user projects
export const allUserProjectApi = async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/user-project`,"",reqHeader)
}

// remove user projects
export const removeUserProjectApi = async(id,reqHeader)=>{
   return await commonApi('DELETE',`${serverUrl}/remove-userproject/${id}`,{},reqHeader) 
}

// update user project
export const updateUserProjectApi = async(id,reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/update-userProject/${id}`,reqBody,reqHeader)
}

// update user profile 
export const updateProfileApi = async(reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/update-userProfile`,reqBody,reqHeader)
}

