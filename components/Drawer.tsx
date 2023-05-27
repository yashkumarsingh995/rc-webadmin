import { Menu, DashboardMenuItem, MenuItemLink, useSidebarState, useResourceDefinitions } from 'react-admin';

import { rootAdmin } from '../static/Roots';
import { DashboardIcon } from '../components/Icons';

const selectedStyle = {
  color: '#fff',
  '&.RaMenuItemLink-active': {
    borderRadius: '0px 25px 25px 0px',
    borderRightColor: '#171F58',
    backgroundColor: '#3e4c7f',
    color: "#fff",
  }
}

const Drawer = (props) => {
  const resourcesDefinitions = useResourceDefinitions();
  const resources = Object.keys(resourcesDefinitions).map(name => resourcesDefinitions[name]);

  return (
    <Menu color="primary" {...props}>
      <DashboardMenuItem sx={selectedStyle} leftIcon={<DashboardIcon />} />
      {resources.map(resource => (
        <MenuItemLink
          sx={selectedStyle}
          key={resource.name}
          to={`${rootAdmin}/${resource.name}`}
          primaryText={
            (resource.options && resource.options.label) ||
            resource.name
          }
          leftIcon={
            resource.icon ? <resource.icon /> : <DashboardIcon />
          }
          onClick={props.onMenuClick}
        />
      ))}
    </Menu>
  )
}

export default Drawer

