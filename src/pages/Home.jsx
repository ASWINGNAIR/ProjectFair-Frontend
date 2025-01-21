import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import image from '../assets/image.webp'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { homeProjectApi } from '../Service/allApi'

function Home() {

  const [isLogin, setIsLogin] = useState(false)

  const [homeProject, setHomeProject] = useState([])

  const getHomeProject = async () => {
    const result = await homeProjectApi()
    setHomeProject(result.data)
  }
  console.log(homeProject);


  useEffect(() => {
    getHomeProject()
    if (sessionStorage.getItem("token")) {
      setIsLogin(true)
    }
    else {
      setIsLogin(false)
    }
  }, [])

  return (
    <>
      <div className="bg-success p-5 mb-5" style={{ height: "700px" }}>
        <div className="container-fluid mt-5">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-6">
              <h1 className='text-light' style={{ fontSize: "70px " }}>Project Fair</h1>
              <p>One stop destination for all software development Projects</p>

              {isLogin == false ?
                <Link to={'/login'}><button className='btn text-light p-1 mt-3'>Get Started <FontAwesomeIcon icon={faArrowRight} /></button></Link>
                :
                <Link to={'/Dashboard'}><button className='btn text-light p-1 mt-3'>Manage Projects <FontAwesomeIcon icon={faArrowRight} /></button></Link>
              }
            </div>
            <div className="col-md-6 mt-4">
              <img className='w-75 p-3' src={image} alt="No image" />
            </div>
          </div>
        </div>
      </div>



      <div>
        <h1 className='text-center mt-5'>Explore our Projects</h1>
        <div className="container">
          <div className="row mt-5">
            {
              homeProject?.map((item) => (
                <div className="col-md-4"><ProjectCard project={item} /></div>
              ))
            }
          </div>
        </div>
        <Link to={'/Projects'} className='text-danger'><p className='text-center mt-5'>See more Projects...</p></Link>
      </div>

    </>
  )
}

export default Home