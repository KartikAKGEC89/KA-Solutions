import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../components/loader'
import {useDispatch, useSelector} from 'react-redux'
import { register } from '../action/userAction'

const RegisterScreens = () => {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, user } = userRegister
    

    React.useEffect(() => {
    if (user) {
      navigate('/login')
    }
    }, [navigate, user])
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(register(name, email,password))
    }
  return (
      <>
            <Container>
                <Row className='justify-conten-md-center'>
      <Col xs={12} md={6}>
    
                        <h1>Register</h1>
                        {loading && <Loader />}
                        {
                            error && alert('User Not Authorized')
                        }
                      <Form onSubmit={submitHandler}>
                          <Form.Group controlId='name'>
              <Form.Label> Name </Form.Label>
                    <Form.Control
                        type='text'
                        value={name}
                        placeholder='Enter Name'
                        onChange={(event) => setName(event.target.value)}
                    >    
              </Form.Control>
                </Form.Group>
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
                
                <Button type='submit' variant='primary'>Register</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    If already Register
                  <Link to='/login'>Login Here</Link>
                </Col>
                        </Row>
                          </Col>        
      </Row>
            </Container>
            </>
  )
}

export default RegisterScreens
