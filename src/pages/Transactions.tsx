import React, { useEffect, useRef } from 'react';
import { Affix, Card, Select, Table, Tag } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import AdminLayout from '../layouts/Admin';
import { useDashboardStore } from '../store/dashboard';
import type { ColumnsType } from 'antd/es/table';
import { useTransactionLog, useTransactionReport, useTransactionLogByUser, useTransactionReportByUser } from '../services/transactionService';
import ApexCharts from 'apexcharts';
import useTransactionStore from '../store/transaction';
import Pagination from '../components/Pagination';
import { DatePicker } from 'antd';
import ShowDetail from '../components/ShowDetail';
import toast from 'react-hot-toast';

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
    setTransactionType,
    transactionDetailUser,
    setTransactionDetailUser,
    logPageByUser,
    setLogPageByUser,
    transactionTypeByUser,
    dateByUser
  } = useTransactionStore();
  const chartRef = useRef(null);

  const fetchReport = async () => {
    try {
      await useTransactionReport({ from: date && date.split('_')[0], to: date && date.split('_')[1], transaction_type: transactionType });
    } catch (error: any) {
      toast.error("Something went wrong!");
    }
  }

  const fetchLog = async () => {
    try {
      await useTransactionLog({ from: date && date.split('_')[0], to: date && date.split('_')[1], transaction_type: transactionType, page: logPage, limit: 10 });
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  const fetchLogByUser = async () => {
    try {
      await useTransactionLogByUser({ user_id: transactionDetailUser?.user_id, from: dateByUser && dateByUser.split('_')[0], to: dateByUser && dateByUser.split('_')[1], transaction_type: transactionTypeByUser, page: logPageByUser, limit: 10 });
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  const fetchReportByUser = async () => {
    try {
      await useTransactionReportByUser({ user_id: transactionDetailUser?.user_id, from: dateByUser && dateByUser.split('_')[0], to: dateByUser && dateByUser.split('_')[1], transaction_type: transactionTypeByUser });
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  useEffect(() => {
    setSelectedMenu("transactions");
    fetchReport();
    fetchLog()
    setshowDetail(false)
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
        height: 450,
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
      colors: ['#f07f06', '#bce8ad'],
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

  useEffect(() => {
    if (transactionDetailUser) {
      fetchLogByUser()
      fetchReportByUser()
    }
  }, [transactionDetailUser])



  return (
    <AdminLayout>
      <div className='flex'>
        <div className={`${showDetail ? 'w-1/2' : 'w-full'}`}>
          <div className='p-8'>
            <h3 className='text-lg font-semibold pb-8'>Transactions</h3>
            <Card className='bg-blue-50'>
              <div className='flex gap-4 items-center'>
                <RangePicker onChange={(value) => setDate(value)} />
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
                      setDetailKey(_record.id);
                      setshowDetail(true);
                      setTransactionDetailUser({
                        transaction_id: _record.id,
                        amount: _record.amount,
                        transaction_type: _record.transaction_type,
                        transaction_detail: _record.transaction_detail,
                        timestamp: _record.timestamp,
                        username: _record.user.username,
                        user_id: _record.user.id,
                        full_name: _record.user.full_name
                      });
                      setLogPageByUser(1);
                    } else {
                      setDetailKey(null);
                      setshowDetail(!showDetail);
                      setLogPageByUser(1);
                    }
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
          <Affix offsetTop={75} className={`!bg-blue-50  w-1/2 z-20$`}>
            <div className='p-8 overflow-auto h-[calc(65%-100px)]'>
              <Affix>

                <div className='flex justify-end py-2 pr-8' >
                  <button onClick={() => setshowDetail(!showDetail)}><CloseOutlined /></button>
                </div>
              </Affix>
              <ShowDetail log={fetchLogByUser} report={fetchReportByUser} />
            </div>
          </Affix>
        ) : (<></>)}


      </div>
    </AdminLayout>
  );
};


export default Transactions;