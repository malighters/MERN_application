import { FormEvent } from "react"

const InputField = ({ label, type, value, htmlFor, handleChange }: { label: string, type:string, value: string, htmlFor:string, handleChange: (e: FormEvent) => void }) => {
  return (
    <div className='fprm-row'>
      <label htmlFor={htmlFor} className='form-label'>{label}</label>
      <input type={type} value={value} name={htmlFor} onChange={handleChange} className='form-input' />
    </div>
  )
}
export default InputField