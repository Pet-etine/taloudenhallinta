import styles from './Stats.module.scss'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { LabelList, Legend, Pie, PieChart } from 'recharts'


function Stats(props) {
  const locale = "fi-FI"; // Move this line up
  const numberFormat = new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' });

  const linedata = props.data.map(
    (item) => ({
      date: new Date(item.paymentDate).getTime(),
      amount: item.amount
    })
  );
  const reducer = (resultData, item) => {
    // Selvitetään löytyykö käsittelyn alla olevan alkion kulutyyppi
    // jo tulostaulukosta.
    const index = resultData.findIndex(arrayItem => arrayItem.type === item.type)
    if (index >= 0) {
      // Kulutyyppi löytyy tulostaulukosta, kasvatetaan kokonaissummaa.
      resultData[index].amount = resultData[index].amount + item.amount
    } else {
      // Kulutyyppi ei löytynyt tulostaulukosta, lisätään se sinne.
      resultData.push({ type: item.type, amount: item.amount })
    }
    // Palautetaan tulostaulukko.
    return resultData
  }

  const piedata = props.data.reduce(reducer, [])


  return (
    <div className={styles.stats}>
      <h2>Tilastot</h2>
      <h3>Kulut aikajanalla</h3>
      <ResponsiveContainer height={350}>
        <LineChart data={linedata}>
          <Line dataKey='amount' />
          <XAxis type='number'
            dataKey='date'
            domain={['dataMin', 'dataMax']}
            tickFormatter={
              value => new Date(value).toLocaleDateString(locale)
            } />
          <YAxis />
          <Tooltip labelFormatter={
            value => new Date(value).toLocaleDateString(locale)
          }
            formatter={
              value => [numberFormat.format(value), "maksettu"]
            } />
        </LineChart>
      </ResponsiveContainer>
      <h3>Kulut kulutyypeittäin</h3>
      <ResponsiveContainer height={350}>
        <PieChart>
          <Pie data={piedata} dataKey='amount' nameKey='type'>
            <LabelList dataKey='amount'
              position='inside'
              formatter={
                value => numberFormat.format(value)
              } />
          </Pie>
          <Legend />
          <Tooltip formatter={value => numberFormat.format(value)} />
        </PieChart>

      </ResponsiveContainer>

    </div>
  )
}

export default Stats