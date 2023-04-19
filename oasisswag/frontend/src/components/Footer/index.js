import classes from "./index.module.css"
import footerLogo from './images/footer-logo.svg'

export const Footer = () => {
  return (
    <>
      <div className={classes.footerDivider}/>
      <div className={classes.footer}>
        <div>
          <img className={classes.footerLogo}
               src={footerLogo}
               alt="Footer logo"/>
        </div>
        <div className={classes.dividerVertical}/>
        <a href="https://oasisprotocol.org/terms-of-use" className={classes.footerLink}>Terms of Use</a>
        <div className={classes.dividerVertical}/>
        <a href="https://oasisprotocol.org/privacy-policy" className={classes.footerLink}>Privacy Policy</a>
        <div className={classes.dividerVertical}/>
        <div className={classes.footerText}>Copyright © 2023 Oasis Protocol Foundation. All rights reserved.</div>
      </div>
    </>
  );
}
