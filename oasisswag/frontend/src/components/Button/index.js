import classes from "./index.module.css"
import arrowLeft from "./images/arrow-left.svg"

export const Button = ({ onClick, children }) => {
  return (
    <button className={classes.Button} onClick={onClick}>
      {children}
      <img src={arrowLeft} alt="Arrow left" />
    </button>
  )
}