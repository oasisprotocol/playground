import classes from "./index.module.css"
import {InfoMessage} from "../InfoMessage";
import {Button} from "../Button";

export const ConsensusInfo = () => {
  const navigateToRiddle = () => {
    window.open("https://oasisprotocol.org/riddle");
  }

  return (
    <>
      <div className={classes.divider}/>
      <div className={classes.ConsensusInfo}>
        <div className={classes.ConsensusInfoContainer}>
          <InfoMessage>Are you attending Consensus 2023?</InfoMessage>
          <InfoMessage small>Get a coupon at our booth, solve the blockchain riddle and earn ROSE!</InfoMessage>
          <Button className={classes.secondary} onClick={navigateToRiddle}>
            Solve the riddle and earn ROSE!
          </Button>
        </div>
      </div>
    </>
  )
}