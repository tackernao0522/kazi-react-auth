export const PrimaryButton = (props) => {
  const Class = {
    primary: "btn btn-primary btn-block"
  }
  const { children } = props

  return (
    <button type="submit" className={Class.primary}>
      {children}
    </button>
  )
}
