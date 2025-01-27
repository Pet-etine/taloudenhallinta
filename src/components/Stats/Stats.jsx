import styles from './Stats.module.scss'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, LabelList, Legend, Pie, PieChart, Cell } from 'recharts'
import randomColor from 'randomcolor'

function Stats(props) {
  const locale = "fi-FI";
  const numberFormat = new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' });

  const linedata = props.data.map(
    (item) => ({
      date: new Date(item.paymentDate).getTime(),
      amount: item.amount
    })
  );

  const reducer = (resultData, item) => {
    const index = resultData.findIndex(arrayItem => arrayItem.type === item.type);
    if (index >= 0) {
      resultData[index].amount += item.amount;
    } else {
      resultData.push({ type: item.type, amount: item.amount });
    }
    return resultData;
  }

  const piedata = props.data.reduce(reducer, []);
  const piecolors = randomColor({
    count: piedata.length,
    seed: 'siemenluku',
    luminosity: 'dark'
  });

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
            {piedata.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={piecolors[index]} />
            ))}
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