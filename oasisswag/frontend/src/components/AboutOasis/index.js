import classes from "./index.module.css"
import aboutOasis from './images/about-oasis.png'

export const AboutOasis = () => {
  return (
    <div className={classes.AboutOasis}>
      <div className={classes.AboutOasisContainer}>
        <div className={classes.AboutOasisBg}>
          <div className={classes.AboutOasisContent}>
            <div>
              <h2 className={classes.AboutOasisHeader}>About Oasis</h2>
              <p className={classes.AboutOasisText}>
                Oasis is building the
                future of Web3. The Oasis Privacy Layer offers fully customizable privacy to every developer on any
                blockchain. Learn more at{' '}
                <a className={classes.AboutOasisLink} href="https://oasisprotocol.org" target="_blank" rel="noopener noreferrer">oasisprotocol.org</a>.
              </p>
            </div>
            <img className={classes.AboutOasisImage} src={aboutOasis} alt="About Oasis"/>
          </div>
        </div>
      </div>
    </div>
  )
}