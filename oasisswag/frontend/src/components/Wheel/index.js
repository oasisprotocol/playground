import {useEffect, useState} from "react";
import wheel from './images/wheel.png'
import wheelOuter from './images/wheel-outer.svg'
import wheelSpinText from './images/wheel-spin-text.svg'
import wheelSpinFailedText from './images/wheel-failed-text.svg'
import wheelSpinWonText from './images/wheel-won-text.svg'
import wheelSpinWonCircle from './images/wheel-spin-won-circle.svg'
import classes from "./index.module.css"
import {useWeb3} from "../../providers/Web3Provider";
import {InfoMessage} from "../InfoMessage";
import {ErrorMessage} from "../ErrorMessage";
import {Button} from "../Button";
import {Spinner} from "../Spinner";

export const Wheel = () => {
  const {
    drawSwag,
    claimSwag,
    state: {selectedAddress, networkError, swag, contractAddressToken, swagTokenId, claimSwagLoading, claimSwagError}
  } = useWeb3()
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
    if (swag || networkError) {
      endSpin()
    }
  }, [swag, networkError])

  return (<div className={classes.wheelContainer}>
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
      {selectedAddress && swag &&
        <div className={[classes.wheelText, classes.fadeIn].join(' ')}>
          <div className={classes.wheelWonItemContainer}>
            <img className={classes.wheelWonItem} draggable={false} src={wheelSpinWonCircle} alt={swag.name}/>
            <img className={classes.wheelWonItem} draggable={false} src={swag.image} alt={swag.name}/>
          </div>
          <img className={classes.wheelWonItemText} draggable={false} src={wheelSpinWonText} alt="won!"/>
        </div>
      }
    </div>

    {selectedAddress && networkError && <>
      <InfoMessage pointer onClick={() => startSpin()}>Spin the wheel again</InfoMessage>
      <ErrorMessage>{networkError}!</ErrorMessage>
    </>
    }
    {selectedAddress && swag && <>
      <InfoMessage>Congratulations, you won a {swag.name}!</InfoMessage>
      <p className={classes.collectMessage}>Please collect it at our Oasis booth (923) at Consensus</p>
      <br/>
      <br/>
      {!swagTokenId && <Button disabled={claimSwagLoading} className={classes.secondary} onClick={claimSwag}>
        {claimSwagLoading && <Spinner />}
        Add Swag to your NFT collection
      </Button>}
      {claimSwagError && <ErrorMessage>Something went wrong! Try again!</ErrorMessage>}
      {swagTokenId &&
        <>
          <InfoMessage>NFT claimed!</InfoMessage>
          <p className={classes.collectMessage}>If it doesn't show up in your wallet, add it manually:</p>
          <p className={classes.collectMessage}>Contract address: <b>{contractAddressToken}</b></p>
          <p className={classes.collectMessage}>Token ID: <b>{swagTokenId}</b></p>
        </>
      }
    </>}
  </div>)
}
