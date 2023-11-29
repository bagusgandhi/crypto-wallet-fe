import React from 'react';
import { Layout, Menu, Affix } from "antd";
import {
    DashboardOutlined,
    UserOutlined,
    LineChartOutlined,
    DollarOutlined
} from '@ant-design/icons';
import { useDashboardStore } from '../store/dashboard';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
    const { collapsed, setSelectedMenu, selectedMenu } = useDashboardStore();

    return (
        <Affix offsetTop={0}>
            <Sider trigger={null} className="!h-screen border-r-2 border-black border-opacity-5 !bg-slate-50 z-20" collapsible collapsed={collapsed}>
                <div className="p-3 text-white text-lg bg-blue-400 justify-center m-3 rounded-md flex items-center gap-2">
                    <DollarOutlined />
                    {collapsed ? (<></>) : (<h3>Crypto Wallet</h3>)}
                </div>
                <Menu
                    className="!bg-transparent !py-4 !px-2 !border-0 text-black !hover:text-indigo-100"
                    defaultSelectedKeys={['dashboard']}
                    selectedKeys={[selectedMenu]}
                    theme="light"
                    items={[
                        {
                            key: 'dashboard',
                            icon: <DashboardOutlined />,
                            label: (<>
                                <Link to="/" onClick={() => setSelectedMenu("dashboard")}>
                                    Dashboard
                                </Link>
                            </>),
                        },
                        {
                            key: 'transactions',
                            icon: <LineChartOutlined />,
                            label: (<>
                                <Link to="/transactions" onClick={() => setSelectedMenu("transactions")} >
                                    Transactions
                                </Link>
                            </>),
                        },
                        {
                            key: 'user',
                            icon: <UserOutlined />,
                            label: (<>
                                <Link to="/users" onClick={() => setSelectedMenu("user")} >
                                    Users
                                </Link>
                            </>),
                        },
                    ]}
                />
            </Sider>
        </Affix>
    )
}

export default Sidebar;
