import React from 'react';
import './Header.scss';
import { Navbar, Nav} from 'react-bootstrap';
import { BsHandbag, BsBell } from 'react-icons/bs';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

import { Badge } from 'react-bootstrap';

const Header = () => {
  return (
    // NAVBAR
    <Navbar bg="light" expand="lg" >
      <Navbar.Brand href="#" className='navbar-brand-italic'>FashionHub</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarText" />
      <Navbar.Collapse id="navbarText">
        <Nav className="mr-auto">
          <Nav.Link href="#" className="nav-item active navbar-brand-items">Category</Nav.Link>
          <Nav.Link href="#" className="nav-item navbar-brand-items">Brand</Nav.Link>
          <Nav.Link href="#" className="nav-item navbar-brand-items">Contact</Nav.Link>
          <Nav.Link href="#" className="nav-item navbar-brand-items">FAQ's</Nav.Link>

        </Nav>
        <div className="navbar-text-right ">
            {/* HANDBAG */}
            <Badge pill bg="" style={{backgroundColor: 'rgba(245, 241, 238, 1)'}} >
              <div className="icon-container">
                <BsHandbag className="iconHandBag" />
              </div>
              <div className='handBagCount'>3</div>
            </Badge>

            {/* NOTİFİCATİON */}
            <Badge pill bg="" style={{backgroundColor: 'rgba(238, 239, 248, 1)'}} >
              <div className="icon-container">
                <BsBell className="iconNotification" />
              </div>
              <div className='bellCount'></div>
            </Badge>

            {/* ACCOUNT */}
            <Row style={{marginRight:'0px'}}>
              <Col xs={4} md={4} style={{width:'auto'}}>
                <Row>
                  <Badge bg="" style={{marginLeft: '15px', marginTop: '-3px'}}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden' }}>
                      <Image src="/images/Scarlet.png" roundedCircle className='images'/>
                    </div>
                  </Badge>
                </Row>
              </Col>
              <Col xs={8} md={8}>
                <Row>
                  <Col xs={12} md={12} style={{width:'auto'}}>
                    <span style={{fontSize:'small'}}>
                      Good Morning!
                    </span>
                  </Col>
                  <Col xs={12} md={12} style={{width:'auto'}}>
                    <span style={{fontWeight:'bold',color:'#0d3356', fontSize:'medium'}}>
                      Scarlet Johnson
                    </span>
                  </Col>
                </Row>
              </Col>
            </Row>


        </div>
      </Navbar.Collapse>
    </Navbar>
    
  );
};

export default Header;
