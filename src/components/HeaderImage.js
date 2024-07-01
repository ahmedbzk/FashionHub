import React from 'react';
import './HeaderImage.scss';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

const Header = () => {
  return (
    // NAVBAR
    <div className='imageContainer'>
        <Row className='rowCss'>
          <Col md={6} style={{padding:' 0px 0px 0px 100px'}}>
            <div className='margin-bottom-top'>
              <span className='text'>Grab Up to 50% Off On Selected Headphone</span>
            </div>
            <div>
              <Button style={{backgroundColor:'#3A4980',color:'white',borderRadius:'50px',padding:'10px',paddingInline:'30px',border:'none'}}>Buy Now</Button>
            </div>
          </Col>
          <Col md={6} className='imageCol'>
            <Image src="/images/Headphone.png" />
          </Col>
        </Row>
    </div>
    
  );
};

export default Header;
