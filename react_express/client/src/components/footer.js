import React, { Component } from 'react';
import '../assert/style.css';

class Footer extends Component{
    render(){
        return(
          <div>

              <footer className="ourfooter">

                  <div className="footer-copyright text-center py-3">© 2018 Copyright:
                      <a href="https://www.facebook.com/pasindu.weerasin"> Pasindu Weerasinghe</a>
                  </div>

              </footer>

          </div>
        );
    }
}
export default Footer;