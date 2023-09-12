import classes from "./index.module.css";
import {LocationIcon} from "./LocationIcon";

const googleMapsPin = 'https://www.google.com/maps/place/Radialsystem/@52.5103112,13.4286967,15z/data=!4m6!3m5!1s0x47a84e3900263f87:0xf3893f5141a5c0fc!8m2!3d52.5103112!4d13.4286967!16s%2Fg%2F1231fxmk?sa=X&ved=2ahUKEwiH19LhjeaAAxWwXkEAHX8UDCUQ_BJ6BAhQEAA&ved=2ahUKEwiH19LhjeaAAxWwXkEAHX8UDCUQ_BJ6BAhjEAg&entry=tts&shorturl=1'

export const LocationLink = ({withIcon = false, className}) => {
  return (
    <a className={[className, classes.locationLink].join(' ')} target="_blank" rel="noopener noreferrer" href={googleMapsPin}>
      <span className={classes.locationBox}>
        {withIcon && (<span>
          <LocationIcon/>
        </span>)}
        <span>
          Radialsystem, Berlin
        </span>
      </span>
    </a>
  );
};
