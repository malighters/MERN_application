import { FormEvent, useContext } from "react"
import { AppContext } from "../../context/appContext"
import Alert from "../../components/Alert"
import InputField from "../../components/InputField"
import SelectField from "../../components/SelectField"
import Wrapper from "../../assets/wrappers/DashboardPage"

const AddPig = () => {

  const currentDate = new Date();

  const { isLoading, isEditing, showAlert, displayAlert, pigTag, pigBirthDate, pigNote, pigBreed, pigBreedTypes, pigGender, pigGenderTypes, handleChange, changeValues, createPig } = useContext(AppContext)

  const handlePigInput = (e: FormEvent) => {
    const data = e.target as HTMLInputElement;
    const name = data.name;
    const value = data.value;
    handleChange?.({name, value});
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!pigTag) {
      displayAlert?.();
      return;
    }

    if (isEditing) {
      return;
    }

    createPig?.();
  }

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'Edit pig' : 'Add pig'}</h3>
        {showAlert && <Alert />}

        <div className="form-center">
          <InputField 
            type="text" 
            label="Pig tag" 
            value={pigTag} 
            htmlFor="pigTag" 
            handleChange={handlePigInput} 
          />

          <SelectField 
            label="Pig gender"   
            name="pigGender"    
            value={pigGender}
            list={pigGenderTypes}
            handleChange={handlePigInput} 
          />

          <SelectField 
            label="Pig breed"   
            name="pigBreed"    
            value={pigBreed}
            list={pigBreedTypes}
            handleChange={handlePigInput} 
          />

          <div className="form-row">
            <label htmlFor="birth_date" className='form-label'>Birth date</label>   

            <input 
              type="date" 
              name="pigBirthDate" 
              value={pigBirthDate}
              min="2020-01-01"
              max={currentDate.toISOString().slice(0, 10)}
              className="form-input"
              onChange={handlePigInput} 
            />
          </div>

          <InputField 
            type="text" 
            label="Note" 
            value={pigNote} 
            htmlFor="pigNote" 
            handleChange={handlePigInput} 
          />

          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Submit
            </button>

            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault();
                changeValues?.();
              }}
            >
              Clear
            </button>
          </div>

        </div>        
      </form>
    </Wrapper>
  )
}
export default AddPig