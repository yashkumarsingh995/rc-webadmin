import { AppBar, usePermissions } from 'react-admin'
import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import adminLogo from '../assets/images/rc-logo-admin.png'
import supportLogo from '../assets/images/rc-logo-support.png'
import installerLogo from '../assets/images/logo-installers.png'
import { Breadcrumb } from '../reducers/breadcrumbs'
import officialColors from '../styles/Colors'
import { isAdmin, isSupport } from '../Permissions'

const mapStateToProps = (state: any) => ({ breadcrumbs: state.breadcrumbs })

const Bread = connect(
  mapStateToProps,
  null,
)((props: any) => {
  const { breadcrumbs, className } = props

  return (
    <Breadcrumbs aria-label="Breadcrumb" className={className}>
      <Link
        style={{ color: '#FFF', textTransform: 'uppercase' }}
        component={RouterLink}
        to={breadcrumbs.main.link}
      >
        {breadcrumbs.main.name}
      </Link>
      {breadcrumbs.sub &&
        breadcrumbs.sub.map((crumb: Breadcrumb) => (
          // sub breadcrumbs shouldn't be a link
          <Typography style={{ color: '#FFF', textTransform: 'uppercase' }} key={crumb.link}>
            {crumb.name}
          </Typography>
        ))}
    </Breadcrumbs>
  )
})

const CustomAppBar = ({ classes, ...props }) => {
  const { permissions = [] } = usePermissions()

  const appBarStyle = {
    backgroundColor: isAdmin(permissions) ? officialColors.darkBlue : officialColors.green,
    color: isAdmin(permissions) ? officialColors.white : officialColors.darkBlue
  }
  const logoWrapperStyle = {
    backgroundColor: officialColors.darkBlue,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'absolute' as const,
    top: 0,
    width: '240px',
    zIndex: -1
  }

  const renderLogo = permissions => {
    if (permissions) {
      if (isAdmin(permissions)) {
        return adminLogo
      } else if (isSupport(permissions)) {
        return supportLogo
      }
    }
    return installerLogo
  }

  return (
    <AppBar {...props} className="h-16 py-2" style={appBarStyle}>
      <div style={logoWrapperStyle}>
        <img src={renderLogo(permissions)} className="h-12" />
      </div>
      <span className="flex-1" />
      {/* <Bread /> */}
      {/* TODO: any toolbar */}
    </AppBar>
  )
}

export default CustomAppBar
