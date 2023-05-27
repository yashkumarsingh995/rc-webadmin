import {
  TabbedShowLayout,
  Tab,
  TextField,
  Show,
  useGetList,
  FormTab,
  TabbedForm,
  required,
  TextInput,
  Edit,
} from 'react-admin'

export const PostShow = props => {
  const { data } = useGetList('posts',
    {
      pagination: { page: 1, perPage: 10 },
      sort: { field: 'published_at', order: 'DESC' },
    })
  return (
    // <Edit {...props}>
    <TabbedForm>
      <FormTab label="summary">
        <TextField label="Id" source="id" />
        <TextField source="title" />
        <TextInput label="Id" source='id' />
        <TextInput source="title" validate={required()} />
        <TextInput multiline source="teaser" validate={required()} />
      </FormTab>
    </TabbedForm>
    // </Edit>
  )
}
