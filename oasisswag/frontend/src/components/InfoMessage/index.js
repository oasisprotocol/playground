import classes from "./index.module.css"

export const InfoMessage = ({ children, onClick, pointer = false }) => {
  return (
    <div style={{ cursor: pointer ? 'pointer' : 'default' }} onClick={onClick} className={classes.InfoMessage}>
      {children}
    </div>
  )
}