import React from 'react';
import githubLogo from '../media/GitHub-Mark-Light-32px.png';
import './Footer.css';

function Footer() {
  return (
    <footer>
      <a href="https://www.github.com" className="gitLink">
        <img src={githubLogo} alt="github logo" />
      </a>
      <p className="copyright">© 2020 Voldev. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
