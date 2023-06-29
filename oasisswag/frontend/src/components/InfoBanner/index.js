import classes from "./index.module.css"
import {InfoMessage} from "../InfoMessage";
import {Button} from "../Button";
import {CTAWithIcon} from "../CTAWithIcon";

export const InfoBanner = () => {
  const navigateToRiddle = () => {
    window.open("https://oasisprotocol.org/riddle");
  }

  return (
    <>
      <div className={classes.InfoBanner}>
        <div className={classes.InfoBannerContainer}>
          <InfoMessage>Are you attending EthCC 6?</InfoMessage>
          <div className={classes.inlineDivider}/>

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

          <div className={classes.inlineDivider}/>

            <InfoMessage className={classes.infoBannerInfoMessage} small>
              Get a coupon at solve the blockchain riddle and earn ROSE!
            </InfoMessage>
            <Button variant="secondary" className={classes.secondary} onClick={navigateToRiddle}>
              Solve the riddle and earn ROSE!
            </Button>
          </div>
        </div>
      </>
      )
      }
