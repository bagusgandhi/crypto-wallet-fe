import React from 'react';
import { Layout, Button, Affix } from "antd";
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
        <Affix offsetTop={0} className='z-30'>
            <Header
                className="!bg-white !px-4 !py-4  w-full z-20 border-b-2 border-black border-opacity-10"
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
        </Affix>
    )
}

export default Navbar;
