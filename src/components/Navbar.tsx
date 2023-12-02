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
        <>
            <Header
                className="!bg-white !px-4 !py-4  z-20 border-b-2 border-black border-opacity-10 !fixed !w-full !top-0 "
            >
                <div className='flex justify-between items-center container'>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed()}
                    />

                    <Button
                        className='!fixed !right-0 mx-4'
                        type="text"
                        danger
                        icon={<LogoutOutlined />}
                        onClick={() => logout()}
                    >
                        Logout
                    </Button>
                </div>
            </Header>
        </>
    )
}

export default Navbar;
