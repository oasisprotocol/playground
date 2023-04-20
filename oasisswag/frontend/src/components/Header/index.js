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
      <img className={classes.logo} src={logo} alt="Logo"/>
      <div className={classes.headerContent}>
        <div className={classes.headerContentLeft}>
          <h1 className={classes.headerTitle}>OASIS<br /> SWAG WHEEL</h1>
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
              <Button onClick={addSapphireNetworkToMetamask}>
                Add network
              </Button>
              <br/>
              <br/>
              <Button onClick={connectWallet}>
                <>
                  <img src={wallet} alt="Wallet"/>
                  <span>Connect Wallet</span>
                </>
              </Button>
              <br/>
              {networkError && <ErrorMessage>{networkError}</ErrorMessage>}
            </>
          }
        </div>
        <div className={classes.headerContentRight}></div>
      </div>
    </header>
  )
}