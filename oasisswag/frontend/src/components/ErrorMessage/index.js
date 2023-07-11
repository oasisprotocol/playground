import classes from "./index.module.css"

export const ErrorMessage = ({children, className}) => {
  return (
    <div className={[...(className ? [className] : []), classes.ErrorMessage].join(' ')}>
      {children}
    </div>
  )
}
