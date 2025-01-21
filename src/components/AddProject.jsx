import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { addProjectApi } from '../Service/allApi';
import { ToastContainer } from 'react-bootstrap';
import { addResponseContext } from '../Context/ContextShare';

function AddProject() {
  const [show, setShow] = useState(false);

  const { setAddResponse } = useContext(addResponseContext)

  const [preview, setPreview] = useState("")

  const [token, setToken] = useState("")
  console.log(token);

  const [key, setKey] = useState(1)


  const [projectDetails, setProjectDetails] = useState({
    title: "",
    language: "",
    github: "",
    website: "",
    overview: "",
    projectImage: ""
  })
  console.log(projectDetails);


  const handleFile = (e) => {
    setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })
  }
  useEffect(() => {
    if (projectDetails.projectImage) {
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  }, [projectDetails.projectImage])


  const handleClose = () => {
    setShow(false)
    handleCancel()
  }
  const handleShow = () => setShow(true);

  const handleCancel = () => {
    setProjectDetails({
      title: "",
      language: "",
      github: "",
      website: "",
      overview: "",
      projectImage: ""
    })
    setPreview("")
    if (key == 1) {
      setKey(0)
    }
    else {
      setKey(1)
    }
  }

  const handleAdd = async () => {
    const { title, language, github, website, overview, projectImage } = projectDetails
    if (!title || !language || !github || !website || !overview || !projectImage) {
      toast.info('Please fill the form completely')
    }
    else {
      //append -> to create reqHeader
      // if the request contain upload content the request body should be created with the help of append method, present in the form-data class.Inshort request body should be a form data. 
      const reqBody = new FormData
      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("github", github)
      reqBody.append("website", website)
      reqBody.append("overview", overview)
      reqBody.append("projectImage", projectImage)

      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await addProjectApi(reqBody, reqHeader)
        console.log(result);

        if (result.status == 200) {
          alert('Project added successfully')
          setTimeout(() => {
            handleClose()
          }, 2000)

          setAddResponse(result)

        }
        else if (result.status == 406) {
          alert(result.response.data)
          handleCancel()
        }
        else {
          alert('Something went wrong')
          handleClose()
        }

      }
      else {
        alert('Please Login')
      }
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
  }, [])

  return (
    <>
      <button onClick={handleShow} className='btn btn-success rounded-0'>Add Projects</button>

      <Modal centered size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="projectImage">
                  <input type="file" id='projectImage' className='d-none' key={key} onChange={(e) => handleFile(e)} />
                  <img src={preview ? preview : "https://media.istockphoto.com/id/1436405248/vector/upload-document-file-transfer-concept-backup-data-document-save-on-storage-technology-cloud.jpg?s=612x612&w=0&k=20&c=bvSNTz6L2WDldZiTFTMwxaL4X3Z7JflBbvkELlCcLEw="} alt="No image" className='w-100' />
                </label>
              </div>
              <div className="col-md-6">
                <div className='mt-3'><input type="text" placeholder='Title' className='form-control' value={projectDetails.title} onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} /></div>
                <div className='mt-3'><input type="text" placeholder='Language' className='form-control' value={projectDetails.language} onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} /></div>
                <div className='mt-3'><input type="text" placeholder='Github' className='form-control' value={projectDetails.github} onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} /></div>
                <div className='mt-3'><input type="text" placeholder='Website' className='form-control' value={projectDetails.website} onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} /></div>
                <div className='mt-3'><textarea rows={5} placeholder='Overview' className='form-control' value={projectDetails.overview} onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })} ></textarea></div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning me-3" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add Project
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position='top-center' autoClose={2000} theme='colored' />

    </>
  )
}

export default AddProject