import classes from "./index.module.css"
import {InfoMessage} from "../InfoMessage";
import {Button} from "../Button";
import computer from "./images/computer.png";

export const SolveRiddleBanner = () => {
  const navigateToRiddle = () => {
    window.open("https://oasisprotocol.org/riddle");
  }

  return (
    <>
      <div className={classes.solveRiddleBanner}>
        <div className={classes.solveRiddleBannerContainer}>
          <div className={classes.solveRiddleBannerContent}>
            <div className={classes.solveRiddleBannerCol}>
              <img className={classes.computer} src={computer} alt="Solve riddle"/>
            </div>
            <div className={classes.solveRiddleBannerCol}>
              <InfoMessage className={classes.infoMessage}>
                Get a coupon to solve the blockchain riddle and earn ROSE!
              </InfoMessage>
              <Button variant="secondary" className={classes.secondary} onClick={navigateToRiddle}
                      showArrow={false}>
                Solve the riddle and earn ROSE!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
