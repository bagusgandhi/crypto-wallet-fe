import React from 'react';
import { Layout, Button } from "antd";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { useDashboardStore } from '../store/dashboard';
import { logout } from '../services/authService';

const { Header } = Layout;

const Navbar: React.FC = () => {
    const { collapsed, setCollapsed } = useDashboardStore()

    return (
        <Header
            className="!bg-white !shadow-md  !px-4 !py-4"
        >
            <div className='flex justify-between items-center'>
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed()}
                />

                <Button
                    type="text"
                    danger
                    icon={<LogoutOutlined />}
                    onClick={() => logout()}
                >
                    Logout
                </Button>
            </div>
        </Header>
    )
}

export default Navbar;
