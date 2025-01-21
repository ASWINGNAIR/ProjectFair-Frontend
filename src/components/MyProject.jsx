import React, { useContext, useEffect, useState } from 'react'
import AddProject from '../components/AddProject'
import EditProject from '../components/EditProject'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faGlobe, faTrash } from '@fortawesome/free-solid-svg-icons'
import { allUserProjectApi, removeUserProjectApi } from '../Service/allApi'
import { Link } from 'react-router-dom'
import { addResponseContext, editProjectResponse } from '../Context/ContextShare'

function MyProject() {

  const [userProject, setUserProject] = useState([])

  const [removeStatus, setRemoveStatus] = useState({})

  const { addResponse } = useContext(addResponseContext)

  const { editResponse } = useContext(editProjectResponse)

  const getUserProject = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem('token')
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await allUserProjectApi(reqHeader)
      // console.log(result.data);
      setUserProject(result.data)
    }
  }
  console.log(userProject);

  const handleDelete = async (id) => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem('token')
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await removeUserProjectApi(id, reqHeader)
      console.log(result);
      if (result.status == 200) {
        setRemoveStatus(result)
        alert('Project Deleted Successfully')
      }
      else {
        alert('Something Went Wrong')
      }
    }

  }



  useEffect(() => {
    getUserProject()
  }, [addResponse, removeStatus, editResponse])

  return (
    <>
      <div className=' p-5 shadow mt-4'>
        <div className="d-flex justify-content-between">
          <h3>My Project</h3>
          <AddProject />
        </div>
        {
          userProject?.length > 0 ?
            userProject?.map((item) => (
              <div className='p-3 bg-light mt-4 rounded d-flex align-item-center justify-content-between'>
                <h5>{item.title}</h5>
                <div className='d-flex mt-2'>
                  <EditProject projects={item} />
                  <Link to={item?.github} target='_blank'><FontAwesomeIcon icon={faGithub} className='me-4 text-warning' /></Link>
                  <Link to={item?.website} target='_blank'><FontAwesomeIcon icon={faGlobe} className='me-4 text-success' /></Link>
                  <FontAwesomeIcon onClick={() => handleDelete(item?._id)} icon={faTrash} className='me-4 text-danger' />
                </div>
              </div>
            ))

            :

            <h4 className='text-center text-warning mt-5'>No Project added</h4>
        }
      </div>
    </>
  )
}

export default MyProject