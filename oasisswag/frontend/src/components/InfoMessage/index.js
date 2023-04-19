import classes from "./index.module.css"

export const InfoMessage = ({ children }) => {
  return (
    <div className={classes.InfoMessage}>
      {children}
    </div>
  )
}