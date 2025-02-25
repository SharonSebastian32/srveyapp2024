import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFrownOpen,
  faTired,
  faSadCry,
  faGrin,
  faDizzy,
  faHeart,
  faAngry,
} from "@fortawesome/free-solid-svg-icons";

const iconMap = {
  "fas fa-frown-open": faFrownOpen,
  "fas fa-sad-cry": faSadCry,
  "fas fa-tired": faTired,
  "fas fa-grin": faGrin,
  "fas fa-dizzy": faDizzy,
  "fas fa-heart": faHeart,
  "fas fa-angry": faAngry,
  "far fa-angry": faAngry,
};

const IconComponent = ({ iconName, color, size = "1.4em" }) => {
  const icon = iconMap[iconName];
  return icon ? (
    <FontAwesomeIcon icon={icon} style={{ color, fontSize: size }} />
  ) : null;
};

export default IconComponent;
