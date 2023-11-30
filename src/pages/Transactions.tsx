import React, { useEffect, useRef } from 'react';
import { Affix, Card, Select, Table, Tag } from 'antd';
import AdminLayout from '../layouts/Admin';
import { useDashboardStore } from '../store/dashboard';
import type { ColumnsType } from 'antd/es/table';
import { useTransactionLog, useTransactionReport } from '../services/transactionService';
import ApexCharts from 'apexcharts';
import useTransactionStore from '../store/transaction';
import Pagination from '../components/Pagination';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const Transactions: React.FC = () => {
  const { setSelectedMenu, showDetail, setshowDetail, setDetailKey, detailKey } = useDashboardStore();
  const { 
      series, 
      log, 
      nextLogPage, 
      prevLogPage, 
      logPage, 
      totalLogPage, 
      setLogPage, 
      date, 
      setDate, 
      transactionType,
      setTransactionType
     } = useTransactionStore();
  const chartRef = useRef(null);

  const fetchReport = async () => {
    try {
      await useTransactionReport();
    } catch (error) {
      console.log("error", error);
    }
  }

  const fetchLog = async () => {
    try {
      await useTransactionLog({ from: date && date.split('_')[0], to: date && date.split('_')[1], transaction_type: transactionType, page: logPage, limit: 10 });
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    setSelectedMenu("transactions");
    fetchReport();
    fetchLog()
  }, [logPage, date, transactionType])

  useEffect(() => {

    const options = {
      series: [{
        name: 'transfer',
        data: series ? series[0]['data'].map((data: Array<any>) => data[0]) : []
      }, {
        name: 'topup',
        data: series ? series[1]['data'].map((data: Array<any>) => data[0]) : []
      }],
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: series ? [...series[0]['data'].map((data: Array<any>) => data[1]), ...series[1]['data'].map((data: Array<any>) => data[1])] : []
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
    };


    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [series, showDetail]);


  const handlePrevPage = () => {
    prevLogPage()
  }

  const handleNextPage = () => {
    nextLogPage()
  }

  interface DataType {
    key: string;
    user: {
      id: string;
      username: string
    };
    transaction_type: string;
    amount: number;
    timestamp: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Username',
      dataIndex: 'user',
      key: 'user',
      render: (text) => <a>{text.username}</a>,
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

  console.log(date, transactionType)

  return (
    <AdminLayout>
      <div className='flex'>
        <div className={`${showDetail ? 'w-1/2' : 'w-full'}`}>
          <div className='p-8'>
            <h3 className='text-lg font-semibold pb-8'>Transactions</h3>
            <Card className='bg-blue-50'>
              <div className='flex gap-4 items-center'>
                <RangePicker onChange={(value) => setDate(value)}  />
                <Select
                  defaultValue={null}
                  style={{ width: 200 }}
                  onChange={(value) => setTransactionType(value)}
                  options={[
                    { value: null, label: 'Select Transaction Type' },
                    { value: 'topup', label: 'Topup' },
                    { value: 'transfer', label: 'Transfer' },
                  ]}
                />
              </div>
            </Card>
            <div ref={chartRef} className='my-4 !z-0'></div>
            <Table
              columns={columns}
              dataSource={log!}
              pagination={false}
              onRow={(_record) => {
                return {
                  onClick: () => {
                    if (detailKey !== _record.id) {
                      console.log(_record.user.id)
                      setDetailKey(_record.id);
                      setshowDetail(true);
                    } else {
                      setDetailKey(null);
                      setshowDetail(!showDetail);
                    }
                    // console.log(detailKey)
                  },
                };
              }}
            />
            <Pagination
              onPageChange={(page: number) => setLogPage(page)}
              totalPage={totalLogPage}
              page={logPage} onNextPage={() => handleNextPage()}
              onPrevPage={() => handlePrevPage()}
            />
          </div>
        </div>

        {showDetail ? (
          <Affix offsetTop={75} className='!bg-blue-50  w-1/2 z-20'>
            <div className='p-8'>
              <div className='flex gap-4'>

                <h4>Transaction Detail</h4>
              </div>

              <div className='flex gap-4'>

                <h4>Transaction History</h4>
              </div>
            </div>
          </Affix>
        ) : (<></>)}


      </div>
    </AdminLayout>
  );
};


export default Transactions;