import "./Header.css";

const Header = (props) => {
  return (
    <div className="heading">
      <h2 className="underline">
        <span>{props.heading}</span>
      </h2>
    </div>
  );
};

export default Header;
