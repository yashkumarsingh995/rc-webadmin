/* 
    Future ratings breakdown not yet needed
*/
// import { Rating, Typography } from '@mui/material'
// import React from 'react'
// import { Datagrid, FunctionField, List, TextField } from 'react-admin'

// // using hard coded data for ratings breakdown table for now...
// const settingsColumns = [
//     // { label: 'name', value: 'customer rating' },
//     // { label: 'type', value: 'type' },
//     { label: 'id', value: 'sub' },
//     { label: 'jobs', value: 'jobs' },
//     { label: 'state', value: 'state' },
//     { label: 'rating', value: 'rating' },
// ]

// const RatingsBreakdown = () => (
//     <Datagrid style={{ width: 300 }} >
//         {settingsColumns.map(col => (
//             <>
//                 <TextField key={col.label} label={col.label} source={col.value}/>
//             </>
//         ))}
//         <FunctionField
//             source={'rating'}
//             label="rating"
//             render={record => <Rating name="read-only" value={record.rating} readOnly />}
//         />
//     </Datagrid>
// )

// export default RatingsBreakdown
