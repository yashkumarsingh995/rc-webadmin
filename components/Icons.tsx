import SvgIcon from '@mui/material/SvgIcon';

import { ReactComponent as DashboardSvg } from '../assets/images/icon-dash--green.svg';
import { ReactComponent as CompanySvg } from '../assets/images/icon-companies--green.svg';
import { ReactComponent as CalendarSvg } from '../assets/images/icon-calendar--green.svg';
import { ReactComponent as CustomerSvg } from '../assets/images/icon-user--green.svg';
import { ReactComponent as AdminSvg } from '../assets/images/icon-account--green.svg';
import { ReactComponent as JobSvg } from '../assets/images/icon-job--green.svg';
import { ReactComponent as ReportSvg } from '../assets/images/icon-report--green.svg';
import { ReactComponent as SettingsSvg } from '../assets/images/icon-settings--green.svg';
import { ReactComponent as EditSvg } from '../assets/images/icon-edit--green.svg';
import { ReactComponent as MessagesSvg } from '../assets/images/icon-messages--green.svg';
import { ReactComponent as NetworkSvg } from '../assets/images/icon-network--green.svg';
import { ReactComponent as CloseSvg } from '../assets/images/icon-close-red.svg';
import { ReactComponent as CheckSvg } from '../assets/images/icon-solid-check.svg';

const iconStyles = {
  muiIcon: {
    fontSize: 33,
    margin: '0 5px 0 -5px',
  },
  smallIcon: {
    width: 25,
    height: 25,    
  },
}
export const DashboardIcon = () => <SvgIcon sx={iconStyles.muiIcon}><DashboardSvg /></SvgIcon>
export const CompanyIcon = () => <SvgIcon sx={iconStyles.muiIcon}><CompanySvg /></SvgIcon>
export const CalendarIcon = () => <SvgIcon sx={iconStyles.muiIcon}><CalendarSvg /></SvgIcon>
export const CustomerIcon = () => <SvgIcon sx={iconStyles.muiIcon}><CustomerSvg /></SvgIcon>
export const AdminIcon = () => <SvgIcon sx={iconStyles.muiIcon}><AdminSvg /></SvgIcon>
export const JobTicketIcon = () => <SvgIcon sx={iconStyles.muiIcon}><JobSvg /></SvgIcon>
export const ReportIcon = () => <SvgIcon sx={iconStyles.muiIcon}><ReportSvg /></SvgIcon>
export const SettingsIcon = () => <SvgIcon sx={iconStyles.muiIcon}><SettingsSvg /></SvgIcon>
export const EditIcon = () => <SvgIcon sx={iconStyles.muiIcon}><EditSvg /></SvgIcon>
export const MessagesIcon = () => <SvgIcon sx={iconStyles.muiIcon}><MessagesSvg /></SvgIcon>
export const NetworkIcon = () => <SvgIcon sx={iconStyles.muiIcon}><NetworkSvg /></SvgIcon>
export const CloseIcon = () => <SvgIcon sx={iconStyles.smallIcon}><CloseSvg /></SvgIcon>
export const CheckIcon = () => <SvgIcon sx={iconStyles.smallIcon}><CheckSvg /></SvgIcon>