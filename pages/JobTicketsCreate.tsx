import { SimpleForm, Create, Toolbar, SaveButton, useRecordContext } from 'react-admin'

import { formStyle } from '../styles/General';

const EditToolbar = props => {
  const record = useRecordContext();
  return (
    <Toolbar {...props}>
      <SaveButton style={formStyle.button} />
    </Toolbar>
  )
}

const UsersCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm sx={{fontFamily: 'Lato'}} toolbar={<EditToolbar />}>
      TODO: create new job ticket here
    </SimpleForm>
  </Create>
)
export default UsersCreate
