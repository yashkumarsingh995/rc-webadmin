import { useEffect, useState } from "react";
import { AmplifyImageField } from "react-admin-amplify";
import { TextField, TextInput, SelectInput, ImageField, useRecordContext } from 'react-admin'
import { Grid, MenuItem, Typography } from '@mui/material'
import styles from '../../styles/SettingsStyles'
import Api from "../../Api";
// import { getInstallerResourceFromS3 } from "../helpers/GetResouce";


const BioView = () => {
    const api = new Api()
    const rec = useRecordContext()
    const [profileImg, setProfileImg] = useState('')

    // console.log(rec)
    useEffect(() => {
        const getData = async () => {
            if (rec.bio.profile_img_url) {
                const img = await api.getResource(rec.bio.profile_img_url)
                if (img) {
                    setProfileImg(img)
                    console.log(img)
                }
            }
        }
        getData()
    }, [])

    const experienceOptions = [
        // { label: 'Years of Experience', value: 0 },
        { name: '1 year', id: '1' },
        { name: '2 years', id: '2' },
        { name: '3 years', id: '3' },
        { name: '4 years', id: '4' },
        { name: '5 or more years', id: '5+' },
    ]

    return (
        <Grid sx={styles.fixedWidthContainer}>
            <div style={styles.bioAddress}>
                <div style={{ display: 'flex', position: 'relative', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <TextField sx={{ fontWeight: "bold" }} source={'name'} />
                        <div>
                            <TextField source={'addressOne'} />
                        </div>
                        <div >
                            <TextField source={'city'} />,{"\u00A0"}
                            <TextField source={'state'} />{"\u00A0"}
                            <TextField source={'zip'} />
                        </div>
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                        {profileImg && <img src={profileImg} style={{ width: 120, height: 120, borderRadius: 120 }} />}
                    </div>
                </div>
            </div>
            <SelectInput label={'years of experience'} source="bio.yearsOfExperience" choices={experienceOptions} fullWidth={true} />
            <TextInput label={'user bio'} source={'bio.bio'} fullWidth={true} />
        </Grid>
    )
}

export default BioView
