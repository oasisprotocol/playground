import {LocationIcon} from "./LocationIcon";
import {EventIcon} from "./EventIcon";
import classes from "./index.module.css";

export const CTAWithIcon = ({icon = 'location', header, children}) => {
  return (
    <div className={classes.ctaWithIcon}>
      <div className={classes.icon}>
        {icon === 'location' && <LocationIcon className={classes.locationIcon}/>}
        {icon === 'event' && <EventIcon className={classes.eventIcon}/>}
      </div>
      <div>
        <div className={classes.header}>
          {header}
        </div>
        <div className={classes.content}>
          {children}
        </div>
      </div>
    </div>
  );
};
