import { Paper } from '@mui/material';

interface LegendItem {
  title: string,
  border: string,
  background: string,
}

const CalendarLegend = ( {legend}: {legend: LegendItem[]} ) => {

  return (
    <Paper>
      <div style={{ display: 'flex', padding: '10px', justifyContent: 'space-evenly' }}>
          {legend.map((item, index) => (
            <div key={`${index}-legend-div`} style={{ display: 'flex' }}>
              <div style={{ width: '25px', height: '25px', borderRadius: '50%', background: item.background, border: item.border, margin: '0 5px' }}>
              </div>
              <div>
                {item.title}
              </div>
            </div>
          ))}
        </div>
    </Paper>
  );
}

export default CalendarLegend;