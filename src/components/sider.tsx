import { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
    FileOutlined,
    UserOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import useCurrentUser from '../hooks/use-current-user';
import hasUserPrivilegeRights from '../utils/hasPrivilegeRights';

export default function Sider() {
    const [collapsed, onCollapse] = useState(false);
    const currentUser = useCurrentUser();
    const isPriviligeUser = hasUserPrivilegeRights(currentUser);
    const defaultSelectedKey = isPriviligeUser ? '1' : '2';

    return (
        <Layout.Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={[defaultSelectedKey]} mode="inline">
                <Menu.Item
                    key="1"
                    icon={<PieChartOutlined />}
                    disabled={!hasUserPrivilegeRights}
                >
                    Dashboard
                </Menu.Item>
                <Menu.Item key="2" icon={<UserOutlined />}>
                    User
                </Menu.Item>
                <Menu.Item key="3" icon={<FileOutlined />}>
                    Files
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    );
}
