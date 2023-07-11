import classes from "./index.module.css"
import {ArrowLeftIcon} from "./ArrowLeftIcon";

const variantMap = {
  'primary': classes.ButtonPrimary,
  'secondary': classes.ButtonSecondary
}

export const Button = ({className, onClick, children, disabled, showArrow = true, variant = 'primary', fullWidth}) =>
  <button
    className={[className, classes.Button, ...(disabled ? [classes.ButtonDisabled] : []),...(fullWidth ? [classes.FullWidth] : []), variantMap[variant]].join(' ')}
    onClick={onClick}>
    {children}
    {showArrow && <ArrowLeftIcon/>}
  </button>
