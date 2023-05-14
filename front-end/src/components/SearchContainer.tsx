import { FormEvent, useContext } from "react";
import Wrapper from "../assets/wrappers/SearchContainer";
import { AppContext } from "../context/appContext";
import InputField from "./InputField";
import SelectField from "./SelectField";

const SearchContainer = () => {

  const { isLoading, search, searchBreed, searchGender, searchSort, searchSortOptions, pigGenderTypes, pigBreedTypes, handleChange, clearFilters} = useContext(AppContext);

  const handleSearch = (e: FormEvent) => {
    if(isLoading) return;
    const { name, value } = e.target as HTMLInputElement;
    handleChange?.({ name, value })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    clearFilters?.();
  }

  return (
    <Wrapper>
      <form className="form">
        <div className="form-center">
          <InputField label="Tag" type="text" value={search} htmlFor="search" handleChange={handleSearch} />
          <SelectField label="Gender" value={searchGender} name="searchGender" handleChange={handleSearch} list={['all', ...pigGenderTypes]} /> 
          <SelectField label="Breed" value={searchBreed} name="searchBreed" handleChange={handleSearch} list={['all', ...pigBreedTypes]} /> 
          <SelectField label="Sort" value={searchSort} name="searchSort" handleChange={handleSearch} list={searchSortOptions} /> 

          <button className="btn btn-block btn-danger" disabled={isLoading} onClick={handleSubmit}>Clear filters</button>
        </div>
      </form>
    </Wrapper>
    
  )
}
export default SearchContainer