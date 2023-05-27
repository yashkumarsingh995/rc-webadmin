import styles from '../../styles/SettingsStyles'
import { SelectInput, TextField } from 'react-admin'

const ServiceArea = () => {
  const fields = [
    { id: '10', name: '10 Miles' },
    { id: '25', name: '25 Miles' },
    { id: '50', name: '50 Miles' },
    { id: '75', name: '75 Miles' },
    { id: '100', name: '100 Miles' },
    { id: '200', name: '200 Miles' },
  ]

  return (
      <div style={styles.serviceAreaFlex}>
        <div style={styles.bioAddress}>
          <TextField sx={{ fontWeight: "bold" }} source={'name'} />
          <div>
            <TextField source={'addressOne'} />
          </div>
          <div>
            <TextField source={'city'} />,{"\u00A0"}
            <TextField source={'state'} />{"\u00A0"}
            <TextField source={'zip'} />
          </div>
        </div>
        <SelectInput label={'years of experience'} source="serviceArea.radius" choices={fields} fullWidth={true} />
      </div>
  )
}

export default ServiceArea