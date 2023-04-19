import {useEffect, useState} from "react";
import wheel from './images/wheel.png'
import wheelOuter from './images/wheel-outer.svg'
import wheelSpinText from './images/wheel-spin-text.svg'
import wheelSpinFailedText from './images/wheel-failed-text.svg'
import wheelSpinWonText from './images/wheel-won-text.svg'
import classes from "./index.module.css"
import {useWeb3} from "../../providers/Web3Provider";
import {InfoMessage} from "../InfoMessage";
import {ErrorMessage} from "../ErrorMessage";

export const Wheel = () => {
  const {drawSwag, state: {selectedAddress, networkError, swag}} = useWeb3()
  const [spin, setSpin] = useState(false)

  const startSpin = () => {
    if (spin || !selectedAddress || swag) {
      return
    }

    drawSwag()
    setSpin(true)
  }

  const endSpin = () => {
    setSpin(false)
  }

  useEffect(() => {
    if(swag || networkError) {
      endSpin()
    }
  }, [swag, networkError])

  return (
    <div className={classes.wheelContainer}>
      <div className={classes.wheel} onClick={startSpin}>
        <img draggable={false}
             className={[classes.wheelOuter, ...[spin ? [classes.animateOuter] : []]].join(' ')}
             src={wheelOuter} alt="Wheel lines"/>
        <img draggable={false} className={[classes.wheelInner, ...[spin ? [classes.animateInner] : []]].join(' ')}
             src={wheel}
             alt="Wheel"/>
        {selectedAddress && !networkError && !swag && <img draggable={false}
                                 className={[classes.wheelText, ...[spin ? [classes.fadeOut] : [classes.fadeIn]]].join(' ')}
                                 src={wheelSpinText} alt="Click to spin"/>}
        {selectedAddress && networkError && <img draggable={false}
                                 className={[classes.wheelText, classes.fadeIn].join(' ')}
                                 src={wheelSpinFailedText} alt="failed."/>}
        {selectedAddress && swag && <img draggable={false}
                                 className={[classes.wheelText, classes.fadeIn].join(' ')}
                                 src={wheelSpinWonText} alt="won!"/>}
      </div>

      {selectedAddress && networkError && <ErrorMessage>{networkError}!</ErrorMessage>}
      {selectedAddress && swag && <InfoMessage>Congratulations, you won {swag.name}!</InfoMessage>}
    </div>
  )
}