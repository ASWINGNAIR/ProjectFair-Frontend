import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import LockImg from '../assets/lockImg.png'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, requestApi } from '../Service/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginResponseContext } from '../Context/ContextShare'

function Auth({ register }) {

  const {setLoginResponse} = useContext(loginResponseContext)

  const navigate = useNavigate()

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })
  console.log(userDetails);

  const handleRegister = async () => {
    const { username, email, password } = userDetails
    if (!username || !email || !password) {
      toast.info('Fill the Form')
    }
    else {
      const result = await requestApi(userDetails)
      console.log(result);
      if (result.status == 200) {
        toast.success('Registration successfull')

        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        navigate('/login')
      }
      else if (result.status == 406) {
        toast.warning(result.response.status)
      }
      else {
        toast.error('Something went wrong')
      }
    }
  }


  const handleLogin = async () => {
    const { email, password } = userDetails
    if (!email || !password) {
      toast.info('Please fill the form completely')
    }
    else {
      const result = await loginApi({ email, password })
      console.log(result);
      if (result.status == 200) {
        toast.success('Login Successfull')
        setLoginResponse(true)

        sessionStorage.setItem("existingUsers", JSON.stringify(result.data.existingUsers))
        sessionStorage.setItem("token", result.data.token)

        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        setTimeout(() => {
          navigate('/')
        }, 2000)

      }
      else if (result.status == 406) {
        toast.warning(result.response.status)
      }
      else {
        toast.error('Something went wrong')
      }
    }
  }

  return (
    <>


      <div className='container'>
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10" style={{ marginTop: "150px" }}>
            <Link to={'/'} style={{ textDecoration: "none" }}><p className='text-warning'><FontAwesomeIcon icon={faArrowLeft} className='me-1 ' />Back Home</p></Link>
            <div className='w-100 bg-success' style={{ height: "auto" }}>
              <div className="row">
                <div className="col-md-6">
                  <img className='w-50' src={LockImg} alt="No image" style={{ marginTop: "90px", marginLeft: "70px" }} />
                </div>
                <div className="col-md-6">
                  <p className='fs-3 text-light text-center mt-5'><FontAwesomeIcon icon={faStackOverflow} />Project Fair</p>

                  {!register ? <p className='fs-4 text-center text-light'>Sign In to Your Account</p>
                    :
                    <p className='fs-4 text-center text-light'>Sign Up to Your Account</p>}

                  {register && <div className='mb-3 pe-5 ps-5 md:ps-0'>
                    <input type="text" placeholder='Username' className='form-control rounded-0' onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} />
                  </div>}


                  <div className='mb-3 pe-5 ps-5 md:ps-0'>
                    <input type="text" placeholder='Email ID' className='form-control shadow rounded-0' onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} />
                  </div>

                  <div className='mb-3 pe-5 ps-5 md:ps-0'>
                    <input type="password" placeholder='Password' className='form-control shadow mt-3 rounded-0' onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} />
                  </div>

                  {!register ? <div className='pe-5 mb-3 ps-5 md:ps-0'>
                    <button type='button' className='btn btn-warning form-control rounded-0' onClick={handleLogin}>Login</button>
                    <p className='mt-3 '>New User?click Here to <Link to={'/Register'} className='text-danger' >Register</Link></p>
                  </div>
                    :
                    <div className='pe-5 ps-5 md:ps-0'>
                      <button type='button' className='btn btn-warning form-control rounded-0' onClick={handleRegister}>Register</button>
                      <p className='mt-3'>Already a User?click Here to <Link to={'/login'} className='text-danger' >Login</Link></p>
                    </div>}

                </div>
              </div>
            </div>
          </div>
          <div className="col-1"></div>
        </div>
      </div>

      <ToastContainer position='top-center' autoClose={2000} theme='colored' />

    </>
  )
}

export default Auth