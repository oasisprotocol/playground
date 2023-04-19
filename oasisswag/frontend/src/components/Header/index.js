import classes from "./index.module.css"
import logo from "../../images/logo.svg"
import wallet from "./images/wallet.svg"
import {Button} from "../Button";
import {useWeb3} from "../../providers/Web3Provider";

export const Header = () => {
  const {connectWallet, addSapphireNetworkToMetamask, state: {isMetamaskInstalled}} = useWeb3()

  const installMetamask = () => {
    window.open("https://metamask.io/");
  }

  return (
    <header className={classes.header}>
      <img className={classes.logo} src={logo} alt="Logo"/>
      <div className={classes.headerContent}>
        <h1 className={classes.headerTitle}>OASIS SWAG LOTTERY</h1>
        <h2 className={classes.headerSubTitle}>
          Spin the wheel and our Sapphire native RNG will determine which swag item you won.
        </h2>
        {!isMetamaskInstalled &&
          <Button onClick={installMetamask}>
            <>
              <img src={wallet} alt="Wallet"/>
              <span>Install metamask</span>
            </>
          </Button>
        }
        {isMetamaskInstalled &&
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
          </>
        }
      </div>
    </header>
  )
}