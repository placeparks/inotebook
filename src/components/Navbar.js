import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Navigate , useNavigate } from 'react-router-dom';

export default function ColorSchemesExample() {

  let navigate = useNavigate();
const handleLogout = () => {
localStorage.removeItem('token');
navigate('/login');
}
    return(
      
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {!localStorage.getItem('token')?
            <>
             <form className="d-flex"> 
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
              </form>
            </>
            :
            <Nav.Link href="/login" onClick={handleLogout}>Log out</Nav.Link>
            }
          </Nav>
        </Container>
      </Navbar>

    </>
  );
}

