import classes from "./index.module.css";
import {LocationIcon} from "./LocationIcon";

const googleMapsPin = 'https://goo.gl/maps/S8mPnrwrdkCafCxd8'

export const LocationLink = () => {
  return (
    <a className={classes.locationLink} target="_blank" rel="noopener noreferrer" href={googleMapsPin}>
      <span className={classes.locationBox}>
        <span>
          <LocationIcon/>
        </span>
        <span>
          Level Coworking Cafe
          <br/>
          11 Rue de l'École Polytechnique,
          <br/>
          75005 Paris, France
        </span>
      </span>
    </a>
  );
};
