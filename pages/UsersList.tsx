import { BooleanField, Datagrid, DateField, EmailField, List, TextField, SearchInput } from 'react-admin'
import { generalStyles } from '../styles/General'

const postFilters = [<SearchInput className="installers-search" style={generalStyles.search} source="q" alwaysOn />]

const UsersList = (props: any) => (
  <List {...props}
    actions={null}
    exporter={false}
    hasBulkActions={false}
    filters={postFilters}>
    <Datagrid rowClick="edit">
      <EmailField source="email" />
      <BooleanField source="email_verified" />
      <TextField source="phone_number" />
      <BooleanField source="phone_number_verified" />
      {/* <AgentGroupField source="groups[0].GroupName" label="Role" /> */}
      <DateField source="UserCreateDate" label="User Since" />
      <TextField source="id" />
    </Datagrid>
  </List>
)
export default UsersList
