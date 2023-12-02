import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';

const { Content } = Layout;

const AdminLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <>
            <Toaster />
            <Layout>
                <Sidebar />
                <Layout>
                    <Navbar />
                    <Content className="!w-full bg-white mt-16">
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
