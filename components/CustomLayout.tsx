import { Layout, Sidebar } from 'react-admin';

import CustomAppBar from './CustomAppBar';
import Drawer from './Drawer';

const CustomLayout = (props) => <Layout
    {...props}
    appBar={CustomAppBar}
    menu={Drawer}
/>

export default CustomLayout;