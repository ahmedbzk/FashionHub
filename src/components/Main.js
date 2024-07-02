import React, { useEffect,useState  } from 'react';
import './Main.scss';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import products from '../data/products.json'; 
import categories from '../data/categories.json'; 
import model from '../data/model.json'; 
import ratings from '../data/ratings.json'; 
import brand from '../data/brand.json'; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BsSuitHeart,BsFillStarFill,BsStarHalf,BsStar } from 'react-icons/bs';
import { Badge } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import InputGroup from 'react-bootstrap/InputGroup';
import PriceRange from '../components/PriceRange.js';
import SizeRange from '../components/SizeRange.js';
import PaginationComponent from './Pagination.js'

// STARS COUNT
const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const totalStars = fullStars + (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(<BsFillStarFill key={i} className='star' />);
  }
  
  if (hasHalfStar) {
    stars.push(<BsStarHalf key={fullStars} className='star' />);
  }

  for (let i = totalStars; i < 5; i++) {
    stars.push(<BsStar key={i} className='star' />);
  }

  return stars;
};

// CATEGORİES COUNT
const calculateCategoryCounts = () => {
  const counts = {};

  products.forEach(product => {
    if (counts[product.category]) {
      counts[product.category]++;
    } else {
      counts[product.category] = 1;
    }
  });

  return counts;
};

// BRANDS COUNT
const calculateBrandCounts = () => {
  const counts = {};

  products.forEach(product => {
    if (counts[product.brand]) {
      counts[product.brand]++;
    } else {
      counts[product.brand] = 1;
    }
  });

  return counts;
};

// RATİNGS COUNT
const calculateRatingsCounts = () => {
  const counts = {};

  products.forEach(product => {
    if (counts[product.ratingId]) {
      counts[product.ratingId]++;
    } else {
      counts[product.ratingId] = 1;
    }
  });

  return counts;
};

// MODEL COUNT
const calculateModelCounts = () => {
  const counts = {};

  products.forEach(product => {
    if (counts[product.modelId]) {
      counts[product.modelId]++;
    } else {
      counts[product.modelId] = 1;
    }
  });

  return counts;
};



const Main = () => {
  useEffect(() => {
    const cCounts = calculateCategoryCounts();
    setCategoryCounts(cCounts);

    const bCounts = calculateBrandCounts();
    setBrandCounts(bCounts);

    const rCounts = calculateRatingsCounts();
    setRatingsCounts(rCounts);

    const mCounts = calculateModelCounts();
    setModelCounts(mCounts);
    
  }, []);

  // MODEL
  const [modelCounts, setModelCounts] = useState({}); 

  // CATEGORİES
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [categoryCounts, setCategoryCounts] = useState({}); 
  const visibleCategories = showMoreCategories ? categories : categories.slice(0, 6);
  const toggleShowMoreCategories = () => {
    setShowMoreCategories(!showMoreCategories);
  };
  const handleCategoryToggle = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

 
  // BRAND
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [showMoreBrand, setShowMoreBrand] = useState(false);
  const [brandCounts, setBrandCounts] = useState({}); 
  const visibleBrand = showMoreBrand ? brand : brand.slice(0, 5);
  const toggleShowMoreBrands = () => {
    setShowMoreBrand(!showMoreBrand);
  };
  const handleBrandToggle = (brandId) => {
    if (selectedBrand.includes(brandId)) {
      setSelectedBrand(selectedBrand.filter(id => id !== brandId));
    } else {
      setSelectedBrand([...selectedBrand, brandId]);
    }
  };

  // RATİNGS
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [ratingsCounts, setRatingsCounts] = useState({}); 
  const handleRatingToggle = (ratingId) => {
    if (selectedRatings.includes(ratingId)) {
      setSelectedRatings(selectedRatings.filter(id => id !== ratingId));
    } else {
      setSelectedRatings([...selectedRatings, ratingId]);
    }
  };


  // PRİCE
  const [selectedMinPrice, setSelectedMinPrice] = useState(0);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(2000);
  const handlePriceChange = (min, max) => {
    setSelectedMinPrice(min);
    setSelectedMaxPrice(max);
  };

  // SİZE
  const [selectedMinSize, setSelectedMinSize] = useState(0);
  const [selectedMaxSize, setSelectedMaxSize] = useState(50);
  const handleSizeChange = (min, max) => {
    setSelectedMinSize(min);
    setSelectedMaxSize(max);
  };

 
  // FİLTER
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesBrand = selectedBrand.length === 0 || selectedBrand.includes(product.brand);
    const matchesRating = selectedRatings.length === 0 || selectedRatings.includes(product.ratingId);
    const matchesPrice = product.price >= selectedMinPrice && product.price <= selectedMaxPrice;
    const matchesSize = product.size >= selectedMinSize && product.size <= selectedMaxSize;
    return matchesCategory && matchesBrand && matchesRating && matchesPrice && matchesSize;
  });  


  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // CLEAR FİLTER
  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrand([]);
    setSelectedRatings([]);
    setSelectedMinPrice(0);
    setSelectedMaxPrice(2000);
    setSelectedMinSize(0);
    setSelectedMaxSize(50);
  };

  return (
    <main className="main">
      <Row>
        {/* FİLTERS */}
        <Col md={3}>
          <Row>
            <Col md={6} xs={6} className='margin30down' >
              <span className='spanCss' style={{fontSize:'x-large'}}> Filters </span>
            </Col>
            <Col md={6} xs={6} className='colRight margin30down' >
              <Button bg='' className='buttonClear' onClick={handleClearFilters}>Clear All</Button>
            </Col>
          </Row>
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            {/* CATEGORİES */}
            <Accordion.Item eventKey="0">
              <Accordion.Header >
                <span className='spanCss' style={{fontSize:'x-large'}}> Category </span>
              </Accordion.Header>
              <Accordion.Body>
                {visibleCategories.map((category) => (
                  <InputGroup key={category.id} className='colCenterLeft'>
                    <InputGroup.Text style={{ border: 'none', backgroundColor: 'transparent' }}>
                      <Form.Check
                        type="checkbox"
                        id={`checkbox-${category.id}`}
                        style={{ cursor: 'pointer'}}
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => handleCategoryToggle(category.id)}
                      />
                    </InputGroup.Text>
                    <span className='categoryText'>{category.name}</span>
                    <span className='categoryCountText'>({categoryCounts[category.id] || 0})</span>
                  </InputGroup>
                ))}
                <Button variant="link" onClick={toggleShowMoreCategories} style={{color:'#6440FB'}}>
                  {showMoreCategories ? 'Show less' : 'Show more'}
                </Button>
              </Accordion.Body>
            </Accordion.Item>

            {/* Ratings */}
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <span className='spanCss' style={{fontSize:'x-large'}}> Ratings </span>
              </Accordion.Header>
              <Accordion.Body>


              {ratings.map((rating) => (
        <InputGroup key={rating.id} className='colCenterLeft'>
          <InputGroup.Text style={{ border: 'none', backgroundColor: 'transparent' }}>
            <Form.Check
              type="radio"
              id={`radio-${rating.id}`}
              style={{ cursor: 'pointer' }}
              checked={selectedRatings.includes(rating.id)}
              onChange={() => handleRatingToggle(rating.id)}
            />
          </InputGroup.Text>
          <BsFillStarFill className='star' />
          <BsFillStarFill className='star' />
          <BsFillStarFill className='star' />
          <BsFillStarFill className='star' />
          <BsFillStarFill className='star' />
          <span className='categoryText'>{rating.name}</span>
          <span className='categoryCountText'>({ratingsCounts[rating.id] || 0})</span>
        </InputGroup>
      ))}

              </Accordion.Body>
            </Accordion.Item>

            {/* Brands */}
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <span className='spanCss' style={{fontSize:'x-large'}}> Brand </span>
              </Accordion.Header>
              <Accordion.Body>
                {visibleBrand.map((brand) => (
                  <InputGroup key={brand.id} className='colCenterLeft'>
                    <InputGroup.Text style={{ border: 'none', backgroundColor: 'transparent' }}>
                      <Form.Check
                        type="checkbox"
                        id={`checkbox-${brand.id}`}
                        style={{ cursor: 'pointer' }}
                        checked={selectedBrand.includes(brand.id)}
                        onChange={() => handleBrandToggle(brand.id)}
                      />
                    </InputGroup.Text>
                    <span className='categoryText'>{brand.name}</span>
                    <span className='categoryCountText'>({brandCounts[brand.id] || 0})</span>
                  </InputGroup>
                ))}
                 <Button variant="link" onClick={toggleShowMoreBrands} style={{color:'#6440FB'}}>
                  {showMoreBrand ? 'Show less' : 'Show more'}
                </Button>
              </Accordion.Body>
            </Accordion.Item>

            {/* Price */}
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <span className='spanCss' style={{fontSize:'x-large'}}> Price </span>
              </Accordion.Header>
              <Accordion.Body>
                        
              <PriceRange min={0} max={2000}  onChange={handlePriceChange}/>


              </Accordion.Body>
            </Accordion.Item>

            {/* Size */}
            <Accordion.Item eventKey="4">
              <Accordion.Header>
                <span className='spanCss' style={{fontSize:'x-large'}}> Size </span>
              </Accordion.Header>
              <Accordion.Body>
              <SizeRange min={0} max={50} onChange={handleSizeChange}/>

              </Accordion.Body>
            </Accordion.Item>



        </Accordion>
        </Col>

        {/* ITEM LİST */}
        <Col md={9}>
          <Row>
            <Col md={6} xs={6}  className='colCenterLeft margin30down'>
              <span className='spanCss'> Showing {currentProducts.length} Result from total {products.length} </span>
            </Col>
            <Col md={6} xs={6} className='colRight margin30down'>
              <Form.Select className='form_select'>
                <option>Popularity</option>
                <option value="1">Popularity</option>
                <option value="2">Popularity</option>
                <option value="3">Popularity</option>
              </Form.Select>
            </Col>
              {currentProducts.map((product) => (
                <Col md={4} xs={6} key={product.id} style={{marginBottom:'30px'}}>
                  <Card className='cardCss'>
                    {/* FAVOURİ ICON */}
                    <Badge pill bg='' className='favouriIconAlign'>
                      <div className="icon-container">
                        <BsSuitHeart className="favouriIcon" strokeWidth={0.2}/>
                      </div>
                    </Badge>
             
                    <Card.Img variant="top" src={product.image} className='background-image'/>
            
                    <Card.Body>
                      <Card.Title className='textFont'>
                        <div className='spaceBetween'>
                          <span className='normalText'>
                            {product.name}
                          </span>
                          <span className='boldText'>
                            ₹{product.price} 
                          </span>
                        </div>
                        <div>
                        <span style={{ fontSize: '14px', fontWeight: '400', color: '#98A2B3' }}>
                            ({modelCounts[product.modelId] || 0}) types of shoes available
                        </span>
                        </div>
                        </Card.Title>
                      <Card.Text>
                      {renderStars(product.ratings)} <span style={{fontSize:'small',color:'#98A2B3'}}>(121)</span>
                      </Card.Text>
                      <Row>
                        <Col md='6' style={{display:'grid'}}>
                          <Button className='buttonAddCard'>Add to Cart</Button>
                        </Col>
                        <Col md='6' style={{display:'grid'}}>
                          <Button className='buttonAddShortlist'>Add Shortlist</Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                
              ))}
            <Col md={12} xs={12} className='columnCenter'>
            <PaginationComponent
              products={filteredProducts}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />            
            </Col>
          </Row>
        </Col>
        
      </Row>
    </main>
  );
};

export default Main;