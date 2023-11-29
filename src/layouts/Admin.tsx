import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const { Content } = Layout;

const AdminLayout: React.FC<{children: ReactNode}> = ({ children }) => {
    return (
        <>
            <Layout>
                <Sidebar />
                <Layout>
                <Navbar />
                    <Content className="!w-full bg-white">
                        <div>
                            {children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}

export default AdminLayout;
