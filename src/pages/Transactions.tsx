import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import AdminLayout from '../layouts/Admin';
import { useDashboardStore } from '../store/dashboard';
import type { ColumnsType } from 'antd/es/table';

const Transactions: React.FC = () => {
  const { setSelectedMenu, showDetail, setshowDetail, setDetailKey, detailKey } = useDashboardStore();
  const [dataChart, setDataChart] = useState<any[]>([]); 

  useEffect(() => {
    setSelectedMenu("transactions");
  }, [])

  interface DataType {
    key: string;
    username: string;
    transaction_type: string;
    amount: number;
    timestamp: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Transaction',
      dataIndex: 'transaction_type',
      key: 'transaction_type',
      render: (text) => (
        <Tag color={text === 'topup' ? 'green' : 'volcano'} key={text}>
          {text.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Transaction Time',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (text) => <a>{new Date(text).toString()}</a>,
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      username: 'johndoe',
      amount: 32000,
      transaction_type: 'topup',
      timestamp: '2023-11-26 08:56:47.418',
    },
    {
      key: '2',
      username: 'johndoe',
      amount: -12000,
      transaction_type: 'transfer',
      timestamp: '2023-11-26 08:56:47.418',
    },

  ];


  return (
    <AdminLayout>
      <div className='flex'>
        <div className={`${showDetail ? 'w-1/2' : 'w-full'}`}>
          <h3 className='text-lg'>Transactions</h3>
          <div className='p-4'>
            <Table
              columns={columns}
              dataSource={data}
              onRow={(_record) => {
                return {
                  onClick: () => {
                    if (detailKey !== _record.key) {
                      setDetailKey(_record.key);
                      setshowDetail(true);
                    } else {
                      setDetailKey(null);
                      setshowDetail(!showDetail);
                    }
                    console.log(detailKey)
                  },
                };
              }}
            />
          </div>
        </div>

        {showDetail ? (
          <div className='bg-blue-50 p-4 w-1/2 h-screen'>

          </div>
        ) : (<></>)}


      </div>
    </AdminLayout>
  );
};


export default Transactions;