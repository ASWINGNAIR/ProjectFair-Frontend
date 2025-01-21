import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../Service/serviceUrl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProfileApi } from '../Service/allApi';
import Collapse from 'react-bootstrap/Collapse';

function Profile() {

  const [open, setOpen] = useState(false);

  const [updateStatus, setUpdateStatus] = useState({})

  const [preview, setPreview] = useState("")

  const [existingImg, setExistingImg] = useState("")

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    profile: "",
    linkedin: "",
    github: ""
  })
  console.log(userDetails);

  const handleFile = (e) => {
    setUserDetails({ ...userDetails, profile: e.target.files[0] })
  }


  useEffect(() => {
    if (userDetails.profile) {
      setPreview(URL.createObjectURL(userDetails.profile))
    }
  }, [userDetails.profile])
  console.log(preview);


  useEffect(() => {
    if (sessionStorage.getItem("existingUsers")) {
      const user = JSON.parse(sessionStorage.getItem("existingUsers"))
      console.log(user);

      setUserDetails({ ...userDetails, username: user.username, email: user.email, password: user.password, github: user.github, linkedin: user.linkedin })
      setExistingImg(user.profile)
    }
  }, [updateStatus])


  const handleUpdateProfile = async () => {
    const { username, email, password, profile, github, linkedin } = userDetails
    if (!github || !linkedin) {
      toast.info('Fill the form completely')
    }
    else {
      //api calls
      //reqBody
      const reqBody = new FormData()
      reqBody.append('username', username)
      reqBody.append('email', email)
      reqBody.append('password', password)
      reqBody.append('github', github)
      reqBody.append('linkedin', linkedin)
      preview ? reqBody.append('profile', profile) : reqBody.append('profile', existingImg)

      const token = sessionStorage.getItem("token")

      if (preview) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await updateProfileApi(reqBody, reqHeader)
        console.log(result);

        if (result.status == 200) {
          setUpdateStatus(result)
          toast.success('Profile updated successfully')
          sessionStorage.setItem("existingUsers", JSON.stringify(result.data))
        }
        else {
          toast.error('Something went wrong')
        }
      }
      else {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        const result = await updateProfileApi(reqBody, reqHeader)
        console.log(result);

        if (result.status == 200) {
          setUpdateStatus(result)
          toast.success('Profile updated successfully')
          sessionStorage.setItem("existingUsers", JSON.stringify(result.data))
        }
        else {
          toast.error('Something went wrong')
        }

      }
    }

  }

  return (
    <>
      <div className="p-4 shadow mt-4" onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
        <div className="d-flex justify-content-between">
          <h4>Profile</h4>
          <button onClick={() => setOpen(!open)}>
            {open == true ? <FontAwesomeIcon icon={faAngleUp} />
              :
              <FontAwesomeIcon icon={faAngleDown} />}
          </button>
        </div>
        <Collapse in={open}>
          <div>
            <div className='d-flex justify-content-center align-item-center flex-column'>
              <label htmlFor="profileImage" className='d-flex justify-content-center align-item-center'>
                <input onChange={(e) => handleFile(e)} type="file" id='profileImage' className='d-none' />

                {existingImg == "" ?
                  <img src={preview ? preview : "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"} alt="No image" style={{ width: "200px", height: "200px", borderRadius: "50%", marginBottom: "10px" }} />
                  :
                  <img src={preview ? preview : `${serverUrl}/upload/${existingImg}`} alt="No image" style={{ width: "200px", height: "200px", borderRadius: "50%", marginBottom: "10px" }} />
                }

              </label>
              <div>
                <div className='mb-3'><input onChange={(e) => { setUserDetails({ ...userDetails, github: e.target.value }) }} value={userDetails?.github} type="text" placeholder='Github' className='form-control' /></div>
                <div className='mb-4'><input onChange={(e) => { setUserDetails({ ...userDetails, linkedin: e.target.value }) }} value={userDetails?.linkedin} type="text" placeholder='LinkedIn' className='form-control' /></div>
                <div className='mb-3 text-center'><button onClick={handleUpdateProfile} className='btn btn-success w-75'>Update Profile</button></div>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
      <ToastContainer position='top-center' autoClose={2000} theme='colored' />
    </>
  )
}

export default Profile