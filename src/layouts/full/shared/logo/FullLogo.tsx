// import Logo from "/src/assets/images/logos/logo.svg";
import LogoIcon from 'src/assets/logo.png'
import { Link } from "react-router";
const FullLogo = () => {
  return (
    <Link to={"/"}>
      <img src={LogoIcon} alt="logo" className="block" />
    </Link>
  );
};

export default FullLogo;
