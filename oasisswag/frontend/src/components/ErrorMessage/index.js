import classes from "./index.module.css"

export const ErrorMessage = ({ children }) => {
  return (
    <div className={classes.ErrorMessage}>
      {children}
    </div>
  )
}