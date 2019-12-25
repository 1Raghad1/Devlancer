import React, { Component } from 'react'
import {Row,Col,Card} from 'react-bootstrap'
export default class hompagedown extends Component {
    render() {
        return (
          <>
        
                <div className="down">
            <h1 style={{ fontSize:"30px",paddingTop:"30px",marginRight:"100px" }}>Need work done?</h1>
<Row style={{boxshadow:"none" }}>
<Col > <Card border="light" style={{ marginLeft:"30px",width: '18rem' , backgroundColor:"transparent" , border:"none",}}>
  <Card.Img variant="top" src="https://i.ibb.co/L8PwZkM/Screen-Shot-1441-04-16-at-6-02-39-PM-copy.png" />
  <Card.Body>
    <Card.Title>Post a job</Card.Title>
    <Card.Text>
    It's easy. Simply post a job you need completed and receive competitive bids from freelancers within minutes.
    </Card.Text>
  </Card.Body>
</Card> </Col>
<Col> 
<Card border="light" style={{ marginLeft:"30px",width: '18rem' , backgroundColor:"transparent" , border:"none" }}>
  <Card.Img variant="top" src="https://i.ibb.co/X3wGqHp/pngtree-target-employee-icon-design-template-vector-isolated-png-image-856417.png" />
  <Card.Body>
    <Card.Title>Choose freelancers</Card.Title>
    <Card.Text>
    Whatever your needs, there will be a freelancer to get it done: from web design, mobile app development, virtual assistants, product manufacturing, and graphic design (and a whole lot more).
    </Card.Text>
  </Card.Body>
</Card> 
</Col>
<Col>
<Card border="light" style={{ marginLeft:"30px",width: '18rem' , backgroundColor:"transparent" , border:"none" }}>
  <Card.Img variant="top" src="https://i.ibb.co/89bt3dR/gpmy-safe-secure-payment-icon-copy.png" />
  <Card.Body>
    <Card.Title>Pay safely</Card.Title>
    <Card.Text>
    With secure payments and thousands of reviewed professionals to choose from, Freelancer.com is the simplest and safest way to get work done online.
    </Card.Text>
  </Card.Body>
</Card> 
</Col>
</Row>

            </div>
  <div className='down2' >
<h3 className='down2' style={{ fontSize:"30px",paddingTop:"30px"}} > our services :</h3>

<div className="box-wrap">
<Card className='box' style={{ width: '18rem' }}>
  <Card.Img variant="top" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" />
  <Card.Body>
    <Card.Title>Website development</Card.Title>
  </Card.Body>
</Card>
<Card className='box' style={{ width: '18rem' }}>
  <Card.Img variant="top" src="https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2011/05/mobile-apps.jpg" />
  <Card.Body>
    <Card.Title>mobile app</Card.Title>
  </Card.Body>
</Card>
</div>
</div>
         </>  
        )
    }
}
