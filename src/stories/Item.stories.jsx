import Item from '../components/Item'
import { MemoryRouter } from 'react-router-dom'

export default {
    title: 'Components/Item',
    component: Item,
    tags: ['autodocs'],
    decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
    argTypes: {
      data: { control: 'object' },
    }
  }
  export const Default = { 
    args: {
      data: {
        id:          "1",
        type:        "Sähkö",
        amount:      437.50,
        paymentDate: "2023-03-20",
        periodStart: "2022-12-01",
        periodEnd:   "2023-02-28",      
        receiver:    "Caruna Oy"      
      }
    }
  }
  
  export const OnlyRequiredData = {
    args: {
      data: {
        id:          "2",
        type:        "Puhelin",
        amount:      26.90,
        paymentDate: "2023-03-18",
        receiver:    "Elisa"
      }
    }  
  }
  