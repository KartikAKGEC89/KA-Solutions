import React from 'react'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const Messages = () => {
  return (
    <>
      <ToastContainer className="position-static" style={{backgroundColor: 'red'}}>
      <Toast>
                  <Toast.Body style={{fontSize: '20px', fontWeight: 'bold'}}>Error Fetching Data </Toast.Body>
      </Toast>
    </ToastContainer> 
    </>
  )
}

export default Messages
