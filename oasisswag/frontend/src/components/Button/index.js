import classes from "./index.module.css"
import {ArrowLeftIcon} from "./ArrowLeftIcon";

const variantMap = {
  'primary': classes.ButtonPrimary,
  'secondary': classes.ButtonSecondary
}

export const Button = ({className, onClick, children, disabled, showArrow = true, variant = 'primary'}) =>
  <button
    className={[className, classes.Button, ...(disabled ? [classes.ButtonDisabled] : []), variantMap[variant]].join(' ')}
    onClick={onClick}>
    {children}
    {showArrow && <ArrowLeftIcon/>}
  </button>
