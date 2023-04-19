import {useState} from "react";
import wheel from './images/wheel.png'
import wheelOuter from './images/wheel-outer.svg'
import wheelText from './images/wheel-text.svg'
import classes from "./index.module.css"

export const Wheel = () => {
  const [spin, setSpin] = useState(false)

  const startSpin = () => {
    if (spin) {
      return
    }

    setSpin(true)
  }

  const endSpin = () => {
    setSpin(false)
  }

  return (
    <div className={classes.wheelContainer}>
      <div className={classes.wheel} onClick={startSpin}>
        <img draggable={false} onAnimationEnd={endSpin}
             className={[classes.wheelOuter, ...[spin ? [classes.animateOuter] : []]].join(' ')}
             src={wheelOuter} alt="Wheel lines"/>
        <img draggable={false} className={[classes.wheelInner, ...[spin ? [classes.animateInner] : []]].join(' ')}
             src={wheel}
             alt="Wheel"/>
        <img draggable={false} className={[classes.wheelText, ...[spin ? [classes.fadeOut] : [classes.fadeIn]]].join(' ')}
             src={wheelText} alt="Click to spin"/>
      </div>
    </div>
  )
}