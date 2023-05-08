import classes from "./index.module.css"

export const InfoMessage = ({children, onClick, pointer = false, small = false}) => {
  return (
    <div style={{cursor: pointer ? 'pointer' : 'default'}} onClick={onClick}
         className={[classes.InfoMessage, ...(small ? [classes.small] : [])].join(' ')}>
      {children}
    </div>
  )
}