import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import AddItem from './AddItem.jsx'

describe('AddItem', () => {
  test('Lisäyslomake lähettää tiedot, kun vaadittavat kentät on täytetty', async () => {

    // Alustetaan testauskirjaston käyttäjäinteraktiot.
    const user = userEvent.setup()

    // Muodostetaan kulutyyppi-lista.
    const typelist = ['Auto','Sähkö','Vakuutus']

    // Lomakkeelle syötettävät tiedot.
    const formdata = {
      type: typelist[1],     // kulutyyppi-listan toinen alkio
      amount: 543.21,
      paymentDate: '2023-11-01',
      receiver: 'Caruna Oy'
    }

    // Muodostetaan lomakekäsittelijää simuloiva funktio.
    // Testin kannalta riittää, että nähdään kuinka monta
    // kertaa funktiota kutsuttiin ja millä arvolla.
    const handleItemSubmit = vi.fn(() => true)

    // Renderöidään komponentti.
    render(<AddItem onItemSubmit={handleItemSubmit} 
                    typelist={typelist} />, {wrapper: BrowserRouter} )
    
    // Valitaan kulutyyppi ja tarkistetaan, että
    //  - listasta on valittu oikea valinta ja 
    //  - lisäysnappi on disabloitu.
    await user.selectOptions(screen.getByLabelText('Kulutyyppi'), formdata.type)
    expect(screen.getByRole('option', {name: formdata.type}).selected).toBe(true)
    expect(screen.getByRole('button', {name: 'LISÄÄ'}).disabled).toBe(true)

    // Syötetään summa ja tarkistetaan, että
    //  - kentän arvo on sama kuin syötetty arvo ja 
    //  - lisäysnappi on disabloitu.
    await user.type(screen.getByLabelText('Summa'), formdata.amount.toString())
    expect(screen.getByLabelText('Summa')).toHaveValue(formdata.amount)
    expect(screen.getByRole('button', {name: 'LISÄÄ'}).disabled).toBe(true)
    
    // Syötetään maksupäivä ja tarkistetaan, että
    //  - kentän arvo on sama kuin syötetty arvo ja 
    //  - lisäysnappi on disabloitu.
    await user.type(screen.getByLabelText('Maksupäivä'), formdata.paymentDate)
    expect(screen.getByLabelText('Maksupäivä')).toHaveValue(formdata.paymentDate)
    expect(screen.getByRole('button', {name: 'LISÄÄ'}).disabled).toBe(true)
    
    // Syötetään saaja ja tarkistetaan, että
    //  - kentän arvo on sama kuin syötetty arvo ja 
    //  - lisäysnappi on aktiivinen.
    await user.type(screen.getByLabelText('Saaja'), formdata.receiver)
    expect(screen.getByLabelText('Saaja')).toHaveValue(formdata.receiver)
    expect(screen.getByRole('button', {name: 'LISÄÄ'}).disabled).toBe(false)

    // Painetaan lisäysnappia ja tarkistetaan, että
    //  - handleItemSubmit-funktiota on kutsuttu vain kerran ja
    //  - funktion parametrina saama olio sisältää samat tiedot
    //    kuin mitä lomakkeelle syötettiin.
    await user.click(screen.getByRole('button', {name: 'LISÄÄ'}))
    expect(handleItemSubmit).toHaveBeenCalledTimes(1);
    const submittedItem = handleItemSubmit.mock.lastCall.shift()
    expect(submittedItem).toMatchObject(formdata)

  })
})
