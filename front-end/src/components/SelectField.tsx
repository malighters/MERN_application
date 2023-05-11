import { FormEvent } from "react"

const SelectField = ({
    label, 
    name, 
    value,
    list, 
    handleChange 
  } : {
    label: string, 
    name: string, 
    value:string, 
    list: string[], 
    handleChange: (e: FormEvent) => void 
  }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className='form-label'>{label}</label>  
      <select     
        name={name}
        value={value}
        onChange={handleChange}
        className="form-select"
      >
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          )
        })}
      </select>
    </div>
  )
}
export default SelectField;