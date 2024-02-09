import githubLogo from "../assets/GitHub-Mark-Light-32px.png";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <a
        className="gitLink"
        href="https://github.com/voldev8/recipes-deploy"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={githubLogo} alt="github logo" />
      </a>
      <p className="copyright">© 2024 Voldev. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
