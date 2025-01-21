import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import LoginImg from '../assets/loginImg.gif'
import { allProjectApi } from '../Service/allApi'

function Projects() {

  const [token, setToken] = useState("")

  const [allProject, setAllProject] = useState([])

  const [searchKey, setSearchKey] = useState("")

  const getAllProject = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem('token')
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await allProjectApi(searchKey, reqHeader)
      // console.log(result.data);
      setAllProject(result.data)
    }
  }


  console.log(token);
  console.log(allProject);
  console.log(searchKey);

  useEffect(() => {
    getAllProject()
  }, [searchKey])

  useEffect(() => {
    getAllProject()
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem('token'))
    }
  }, [])

  return (
    <>
      <div>
        <Header />
        <h3 className='text-center mt-4'>All Projects</h3>


        {!token ?
          <div className="mt-5">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6 d-flex justify-content-center align-items-center flex-column">
                  <img src={LoginImg} alt="No Image" className='w-75' />
                  <h4>Please <Link to={'/login'}>Login</Link> to see more Projects </h4>
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>
          </div>

          :

          <div className="mt-5">
            <div className="container">
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4 d-flex">
                  <input onChange={(e) => setSearchKey(e.target.value)} type="text" placeholder='Technologies' className='form-control shadow' />
                  <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "lightgray", marginTop: "10px", marginLeft: "30px" }} />
                </div>
                <div className="col-md-4"></div>
              </div>
            </div>

            <div className="container mt-5 p-1">
              <div className="row">
                {allProject?.map((item) => (
                  <div className="col-md-3 mt-3"><ProjectCard project={item} /></div>
                ))
                }
              </div>
            </div>
          </div>}

      </div>
    </>
  )
}

export default Projects