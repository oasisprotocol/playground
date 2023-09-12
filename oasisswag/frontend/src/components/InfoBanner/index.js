import classes from "./index.module.css"
import {InfoMessage} from "../InfoMessage";
import {Button} from "../Button";
import {CTAWithIcon} from "../CTAWithIcon";
import berlin from "./images/berlin.svg";

export const InfoBanner = () => {
  const navigateToClaimYourSpot = () => {
    window.open("https://www.dappcon.io/livestream");
  }

  return (
    <>
      <div className={classes.infoBanner}>
        <div className={classes.infoBannerContainer}>
          <div className={classes.infoBannerContent}>
            <div className={classes.infoBannerCol}>
              <InfoMessage className={classes.header}>Are you attending Dappcon 2023?</InfoMessage>
              <p className={classes.infoMessage}>
                Join us in Berlin for a week of privacy workshops, fireside chats, and networking events with thousands
                of crypto developers, creators and advocates.
              </p>
              <div className={classes.ctas}>
                <CTAWithIcon header="When?" icon="event">
            <span>
              September 10 to 15
            </span>
                </CTAWithIcon>
                <CTAWithIcon header="Where?">
                  <a
                    href="https://www.google.com/maps/place/Radialsystem/@52.5103112,13.4286967,15z/data=!4m6!3m5!1s0x47a84e3900263f87:0xf3893f5141a5c0fc!8m2!3d52.5103112!4d13.4286967!16s%2Fg%2F1231fxmk?sa=X&ved=2ahUKEwiH19LhjeaAAxWwXkEAHX8UDCUQ_BJ6BAhQEAA&ved=2ahUKEwiH19LhjeaAAxWwXkEAHX8UDCUQ_BJ6BAhjEAg&entry=tts&shorturl=1">
                  <span>
                    Radialsystem, Berlin
                  </span>
                  </a>
                </CTAWithIcon>
              </div>
            </div>
            <div className={classes.infoBannerCol}>
              <img className={classes.berlin} src={berlin} alt="Berlin"/>
              <Button variant="secondary" className={classes.secondary} onClick={navigateToClaimYourSpot}
                      showArrow={false}>
                Tune in Live
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
