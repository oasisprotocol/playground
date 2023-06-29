import classes from "./index.module.css"

export const InfoMessage = ({children, onClick, pointer = false, small = false, className}) => {
  return (
    <div style={{cursor: pointer ? 'pointer' : 'default'}} onClick={onClick}
         className={[classes.InfoMessage, ...(small ? [classes.small] : []), ...(className ? [className] : [])].join(' ')}>
      {children}
    </div>
  )
}
