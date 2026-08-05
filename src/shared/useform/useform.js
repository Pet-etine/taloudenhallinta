import { useState } from 'react'
/**
 * @typedef  {Object} useFormObject
 * @property {function} handleChange
 *           Lomakekentän onChange-käsittelijä.
 * @property {function} handleSubmit
 *           Lomakkeen onSubmit-käsittelijä.
 * @property {function} resetValues
 *           Alustaa lomakkeen tiedot alkutilanteeseen.
 * @property {function} setValues
 *           Lomaketietojen päivitysfunktio, tätä ei normaalisti tarvita.
 * @property {Object} values
 *           Lomakkeen tiedot.
 */

/**
 * React Hook, joka huolehtii lomakekenttien muutoksista ja 
 * lomaketietojen lähetyksestä.
 * 
 * @example
 * import useForm from './useform.js'
 *
 * // Määritellään lomakkeen lähetyksen käsittelijä.
 * const submit = () => {
 *   console.log(values)
 * }
 *
 * // Määritellään lomakkeen alkutilanne.
 * const initial = { word: 'sana' }
 *
 * // Alustetaan useForm-käsittelijä.
 * const {values, handleChange, handleSubmit } = useForm(submit, initial, false)
 *
 * // Renderöidään lomake, joka käyttää useForm-hooksia.
 * return (
 *   <form onSubmit={handleSubmit}>
 *     <input type='input' name='word' value={values.word} onChange={handleChange} />
 *     <button type='submit'>LÄHETÄ</button>
 *   </form>
 * )
 * 
 * @param   {function} callback
 *          Lomakekäsittelijä, jota kutsutaan kun lomakkeen tiedot lähetetään.
 * @param   {Object} [initialState = {} ]
 *          Lomakekenttien alkuarvot.
 * @param   {boolean} [resetOnSubmit = true]
 *          Alustetaanko lomake alkutilanteeseen tietojen lähetyksen yhteydessä.
 * @returns {useFormObject}
 *          Lomakekäsittelijän funktiot ja lomakkeen tiedot.
 */

const useForm = (callback, initialState={}, resetOnSubmit=true) => {

  // Esitellään useState-hooks, johon käyttäjän lomakkeelle
  // syöttämä tieto tallennetaan.
  const [values, setValues] = useState(initialState)

  
  // Syötekäsittelijä, joka tallentaa kentän tiedot
  // sen nimellä state-muuttujaan.
  const handleChange = (event) => {
    // Tallennetaan kenttään syötetty arvo ja kentän 
    // nimi välimuuttujiin.
    const value = event.target.value
    const key = event.target.name
    // Tallennetaan uusi arvo state-muuttujaan.
    // Hakasulkeilla avaimeksi määritetään muuttujan arvo. 
    setValues(prevValues => ({...prevValues, [key]: value}))
  }

    
  // Submit-käsittelijä, joka estää oletustoiminnan ja 
  // kutsuu määriteltyä callback-funktiota. 
  // Alustaa tarvittaessa lomaketiedot alkutilanteeseen.
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault()
    }
    callback()
    if (resetOnSubmit) resetValues()
  }

    
  // Funktio, joka palauttaa lomakkeen tiedot alkutilanteeseen.
  const resetValues = () => {
    setValues(initialState)
  }

    
  // Palauta luonnin yhteydessä sekä käsittelijät että
  // tilamuuttuja.
  return {
    handleChange,
    handleSubmit,
    resetValues,
    setValues,
    values
  }

  
  }
  
  export default useForm
  