import React, { Component } from 'react'
import {Icon} from 'semantic-ui-react'
import './homepage.css'
// import '/Users/sarakhaled/Desktop/SEI/projects/P4/frontend/src/homePage/homepage.css'
import { Container } from 'react-bootstrap'
export default class footer extends Component {
    render() {
        return (
            <div className='footer'>
      
            <footer className="page-footer font-small mdb-color pt-4">

           
            <div className ="  text-center text-md-left">
          
            
              <div className="d-flex justify-content-around row text-center text-md-left mt-3 pb-3">
                <hr className="w-100 clearfix d-lg-none"/>
          
                <p>  <Icon disabled name='language' /> English - US (International)</p>
                <p className="text-center text-md-left">© 2019 Copyright:
                    <a href="https://mdbootstrap.com/education/bootstrap/">
                      <strong>DevlancerTeam</strong>
                    </a>
                  </p>
                  <div className="col-md-5 col-lg-4 ml-lg-0">
          
                
          <div className="text-center text-md-right">
            <ul className="list-unstyled list-inline">
              <li className="list-inline-item">
                <a className="btn-floating btn-lg rgba-white-slight mx-1">
                 <Icon disabled name='facebook' />
                </a>
              </li>
              <li className="list-inline-item">
                <a className="btn-floating btn-lg rgba-white-slight mx-1">
                 <Icon disabled name='google plus g' />
                </a>
              </li>
              <li className="list-inline-item">
                <a className="btn-floating btn-lg rgba-white-slight mx-1">
                 <Icon disabled name='twitter' />
                </a>
              </li>
              <li className="list-inline-item">
                <a className="btn-floating btn-lg rgba-white-slight mx-1">
           <Icon disabled name='linkedin' />
                </a>
              </li>
              <li className="list-inline-item">
                <a className="btn-floating btn-lg rgba-white-slight mx-1">
                  <Icon disabled name='github' />
                </a>
              </li>
            </ul>
          </div>
  
        </div>
              </div>
          
              <div className="row d-flex align-items-center">
          
                
                <div className="col-md-7 col-lg-8">
          
                
          
                </div>
               
       
                
          
              </div>
            
          
            </div>
         
          
          </footer>
          </div>
        )
    }
}
