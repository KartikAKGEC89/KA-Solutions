import React, { useState } from 'react'
import { Navbar, Container, Nav, NavDropdown, NavItem, Form, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../action/userAction'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout)
    navigate('/login')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`)
      setSearchQuery('')
    }
  }

  return (
    <header>
      <Navbar bg="primary" data-bs-theme="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>KA Solution</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo && userInfo.isAdmin === true ? (
                <NavDropdown title={userInfo.name} id="userName">
                  <LinkContainer to="/profile">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Profile
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/admin">
                    <Nav.Link>
                      <i className="fas fa-users"></i> User List
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/admin/product">
                    <Nav.Link>
                      <i className="fas fa-box"></i> Product List
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/order">
                    <Nav.Link>
                      <i className="fas fa-receipt"></i> Order List
                    </Nav.Link>
                  </LinkContainer>
                  <NavItem onClick={handleLogout}>
                    LogOut
                  </NavItem>
                </NavDropdown>
              ) : userInfo && userInfo.isAdmin === false ? (
                <>
                  <NavDropdown title={userInfo.name} id="userName">
                    <LinkContainer to="/profile">
                      <Nav.Link>
                        <i className="fas fa-user"></i> Profile
                      </Nav.Link>
                    </LinkContainer>
                    <NavItem onClick={handleLogout}>
                      LogOut
                    </NavItem>
                  </NavDropdown>
                  <Form className="d-flex" onSubmit={handleSearch}>
                    <Form.Control
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="text-black"
                    />
                    <Button type="submit" variant="outline-light" className="ms-2">
                      Search
                    </Button>
                  </Form>
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
