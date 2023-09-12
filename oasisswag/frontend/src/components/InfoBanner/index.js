import classes from "./index.module.css"
import {InfoMessage} from "../InfoMessage";
import {Button} from "../Button";
import {CTAWithIcon} from "../CTAWithIcon";
import berlin from "./images/berlin.svg";
import {LocationLink} from "../LocationLink";

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
                  <LocationLink />
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
