import classes from "./index.module.css"
import {InfoMessage} from "../InfoMessage";
import {Button} from "../Button";
import {CTAWithIcon} from "../CTAWithIcon";
import paris from "./images/paris.png";

export const InfoBanner = () => {
  const navigateToClaimYourSpot = () => {
    window.open("https://oasisprotocol.org/riddle");
  }

  return (
    <>
      <div className={classes.infoBanner}>
        <div className={classes.infoBannerContainer}>
        <div className={classes.infoBannerContent}>
          <img className={classes.paris} src={paris} alt="Paris"/>
          <InfoMessage className={classes.header}>Are you attending EthCC 6?</InfoMessage>
          <p className={classes.infoMessage}>
            Join leaders in Web3 at the Oasis Rendezvous during the conference! Experience the launch of new Oasis
            technologies, networking with developers, and the Privacy4Web3 hackathon!
          </p>
          <div className={classes.ctas}>
            <CTAWithIcon header="When?" icon="event">
            <span>
              July 19, 2023
              <br/>
              9 AM to 7 PM
            </span>
            </CTAWithIcon>
            <CTAWithIcon header="Where?">
            <span>
              Level Coworking Cafe
              <br/>
              11 Rue de l'École Polytechnique,
              <br/>
              75005 Paris, France
            </span>
            </CTAWithIcon>
          </div>

          <p className={classes.buttonCaption}>
            All attendees <b>must</b> register in advance.
          </p>
          <Button variant="secondary" className={classes.secondary} onClick={navigateToClaimYourSpot} fullWidth showArrow={false}>
            Claim Your Spot
          </Button>
        </div>
        </div>
      </div>
    </>
  )
}
