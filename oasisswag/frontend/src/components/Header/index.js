import classes from "./index.module.css"
import logo from "../../images/logo.svg"
import wallet from "./images/wallet.svg"
import {Button} from "../Button";
import {useWeb3} from "../../providers/Web3Provider";
import {ErrorMessage} from "../ErrorMessage";

export const Header = () => {
  const {connectWallet, addSapphireNetworkToMetamask, state} = useWeb3()
  const {isMetamaskInstalled, networkError, selectedAddress} = state;

  const navigateToMetamask = () => {
    window.open("https://metamask.io/");
  }

  return (
    <header className={classes.header}>
      <div className={classes.logoContainer}>
        <img className={classes.logo} src={logo} alt="Logo"/>
      </div>
      <div className={classes.headerContent}>
        <div className={classes.headerContentLeft}>
          <h1 className={classes.headerTitle}>OASIS<br/> SWAG WHEEL</h1>
          <h2 className={classes.headerSubTitle}>
            Spin the wheel and our Sapphire native RNG will determine which swag item you won.
          </h2>
          {!isMetamaskInstalled &&
            <Button onClick={navigateToMetamask}>
              <>
                <img src={wallet} alt="Wallet"/>
                <span>Install metamask</span>
              </>
            </Button>
          }
          {isMetamaskInstalled && !selectedAddress &&
            <>
              <Button onClick={connectWallet}>
                <>
                  <img src={wallet} alt="Wallet"/>
                  <span>Connect Wallet</span>
                </>
              </Button>
              <br/>
              <br/>
              <Button onClick={addSapphireNetworkToMetamask}>
                Add network
              </Button>
              <br/>
              <br/>
              {networkError && <ErrorMessage>{networkError}</ErrorMessage>}
              <br/>
            </>
          }
          {selectedAddress && <Button disabled className={classes.connected} showArrow={false}>
            Connected
          </Button>}
        </div>
        <div className={classes.headerContentRightDesktop}></div>
        <div className={classes.headerContentRightMobile}>
          <div className={classes.headerContentRight}></div>
        </div>
      </div>
    </header>
  )
}