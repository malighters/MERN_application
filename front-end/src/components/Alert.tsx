const Alert = ({text}:{text:string}) => {
  return (
    <div className='alert alert-danger'>
      {text}
    </div>
  )
}
export default Alert