import React from 'react'
import { Container, Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { login } from '../action/userAction'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/loader'

const FormScreens = () => {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin
    
     const redirect = location.search ? location.search.split('=')[1] : '/'

  React.useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email,password))
    }

    return (
     <>
            <Container>
                <Row className='justify-conten-md-center'>
      <Col xs={12} md={6}>
    
                        <h1>Sign In</h1>
                        {loading && <Loader />}
                        {
                            error && alert('User Not Authorized')
                        }
                        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
              <Form.Label> Email </Form.Label>
                    <Form.Control
                        type='email'
                        value={email}
                        placeholder='Enter Registered Email'
                        onChange={(event) => setEmail(event.target.value)}
                    >    
              </Form.Control>
                </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label> Password </Form.Label>
                    <Form.Control
                        type='text'
                        value={password}
                        placeholder='Enter Password'
                        onChange={(event) => setPassword(event.target.value)}
                    >    
              </Form.Control>
                </Form.Group>
                
                <Button type='submit' variant='primary'>Sign In</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    If not Register
                  <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register Here</Link>
                </Col>
                        </Row>
                          </Col>        
      </Row>
            </Container>
            </>
  )
}

export default FormScreens
