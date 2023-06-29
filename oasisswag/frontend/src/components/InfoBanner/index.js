import classes from "./index.module.css"
import {InfoMessage} from "../InfoMessage";
import {Button} from "../Button";

export const InfoBanner = () => {
  const navigateToRiddle = () => {
    window.open("https://oasisprotocol.org/riddle");
  }

  return (
    <>
      <div className={classes.divider}/>
      <div className={classes.InfoBanner}>
        <div className={classes.InfoBannerContainer}>
          <InfoMessage>Are you attending EthCC 6?</InfoMessage>
          <InfoMessage small>Get a coupon at our booth, solve the blockchain riddle and earn ROSE!</InfoMessage>
          <Button variant="secondary" className={classes.secondary} onClick={navigateToRiddle}>
            Solve the riddle and earn ROSE!
          </Button>
        </div>
      </div>
    </>
  )
}
