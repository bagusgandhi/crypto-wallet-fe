import React, { useEffect, useRef, useState } from 'react';
import { Affix, Button, Card, Select, Spin, Table, Tag } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import AdminLayout from '../layouts/Admin';
import { useDashboardStore } from '../store/dashboard';
import type { ColumnsType } from 'antd/es/table';
import { useTransactionLog, useTransactionReport } from '../services/transactionService';
import ApexCharts from 'apexcharts';
import useTransactionStore from '../store/transaction';
import { DatePicker } from 'antd';
import ShowDetail from '../components/ShowDetail';
import toast from 'react-hot-toast';
import { chartOptions } from '../utils/chart';
import { currencyIDR } from '../utils/currency';
import { dateFormat } from '../utils/date';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const Transactions: React.FC = () => {
  const { setSelectedMenu, showDetail, setshowDetail, setDetailKey, detailKey } = useDashboardStore();
  const [loading, setLoading] = useState<boolean>(true);
  const {
    series,
    log,
    date,
    setDate,
    transactionType,
    setTransactionType,
    transactionDetailUser,
    setTransactionDetailUser,
    setLogPageByUser,
    transactionTypeByUser,
    dateByUser,
    setLog,
    setLogByUser,
    pushLog,
    setSeries,
    setSeriesByUser
  } = useTransactionStore();
  const chartRef = useRef(null);

  const fetchReport = async () => {
    try {
      const param = { 
        from: date && date.split('_')[0], 
        to: date && date.split('_')[1], 
        transaction_type: transactionType,
      }

      const series = await useTransactionReport(param);
      setSeries(series);

    } catch (error: any) {
      toast.error("Something went wrong!");
    }
  }

  const fetchLog = async () => {
    try {
      const param = { 
        from: date && date.split('_')[0], 
        to: date && date.split('_')[1], 
        transaction_type: transactionType,
        limit: 10 
      }

      const logsData = await useTransactionLog(param);
      setLog(logsData);

    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  const fetchLogByUser = async () => {
    try {
      const param = { 
        from: dateByUser && dateByUser.split('_')[0], 
        to: dateByUser && dateByUser.split('_')[1], 
        transaction_type: transactionTypeByUser,
        user_id: transactionDetailUser?.user_id,
        limit: 10 
      }

      const logsDataByUser = await useTransactionLog(param);
      setLogByUser(logsDataByUser);

    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  const fetchReportByUser = async () => {
    try {
      const param = { 
        from: dateByUser && dateByUser.split('_')[0], 
        to: dateByUser && dateByUser.split('_')[1], 
        transaction_type: transactionTypeByUser,
      }

      const seriesDataByUser = await useTransactionReport(param);
      setSeriesByUser(seriesDataByUser);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }


  useEffect(() => {
    setSelectedMenu("transactions");

    fetchLog();
    fetchReport();
    setshowDetail(false)
  }, [date]);



  useEffect(() => {
    if (chartRef.current && series) {
      const chart = new ApexCharts(chartRef.current, chartOptions(series!));
      chart.render();
  
      return () => {
        chart.destroy();
      };
    }
  }, [series, showDetail]);

  useEffect(() => {
    setLoading(false)
  }, [log])

  const handleLoadMore = async () => {
    try {
      setLoading(true);
      setshowDetail(false);

      if(log){
        const cursorLog: string = log[log.length -1].timestamp;
        const nextLogs = await useTransactionLog({ cursor: cursorLog, transaction_type: transactionType, limit: 10 });
        pushLog(nextLogs)
      }

    } catch (error) {
      toast.error("Something went wrong!");
    }
  }
  
  const handleRangePicker  = async (value: any) => {
    try {
      setLoading(true);
      setDate(value);

      const dates = value ? value.map((date: string | number | Date | dayjs.Dayjs | null | undefined) => dayjs(date).format("YYYY-MM-DD")).join('_') : null

      const param = { 
        from: dates && dates.split('_')[0], 
        to: dates && dates.split('_')[1], 
        transaction_type: transactionType,
        limit: 10 
      }

      const logs = await useTransactionLog(param);
      const series = await useTransactionReport({...param, limit: undefined});

      setLog(logs);
      setSeries(series);

    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  const handleTransactionType  = async (value: string) => {
    try {
      setLoading(true);
      setTransactionType(value);
      
      const param = { 
        from: date && date.split('_')[0], 
        to: date && date.split('_')[1], 
        transaction_type: value,
        limit: 10 
      }

      const logs = await useTransactionLog(param);
      const series = await useTransactionReport({...param, limit: undefined});

      setLog(logs);
      setSeries(series);

    } catch (error) {
      toast.error("Something went wrong!");
    }
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
      render: (amount) => <a className={`${amount < 0 ? '!text-red-400' : ''}`}>{currencyIDR(amount)}</a>,
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
      render: (timestamp) => <a>{dateFormat(timestamp)}</a>,
    },
  ];

  useEffect(() => {
    if (transactionDetailUser) {
      fetchLogByUser()
      fetchReportByUser()
    }
  }, [transactionDetailUser])

  console.log(log);

  return (
    <AdminLayout>
      <div className='flex'>
        <div className={`${showDetail ? 'w-1/2' : 'w-full'}`}>
          <div className='p-8'>
            <h3 className='text-lg font-semibold pb-8'>Transactions</h3>
            <Card className='bg-blue-50'>
              <div className='flex gap-4 items-center'>
                <RangePicker onChange={handleRangePicker} />
                <Select
                  defaultValue={null}
                  style={{ width: 200 }}
                  onChange={handleTransactionType}
                  options={[
                    { value: null, label: 'Select Transaction Type' },
                    { value: 'topup', label: 'Topup' },
                    { value: 'transfer', label: 'Transfer' },
                  ]}
                />
              </div>
            </Card>
            <div ref={chartRef} className='my-4 !z-0'></div>
            <Spin spinning={loading}>
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

            </Spin>

            <div className='flex justify-center p-8'>
              {log?.length ? (
                  <Button loading={loading} type='primary' className='bg-blue-400' onClick={() => handleLoadMore()}>Load More</Button>
              ) : (<></>) }
            </div>
          </div>
        </div>

        {showDetail ? (
          <>
            <Affix offsetTop={75} className={`!bg-blue-50  w-1/2 z-20$`}>
              <div className='p-8 overflow-auto h-[calc(60%-200px)]'>
                <div className='flex justify-end py-2' >
                  <button className='text-red-400 font-bold' onClick={() => setshowDetail(!showDetail)}><CloseOutlined /></button>
                </div>
                <ShowDetail log={fetchLogByUser} report={fetchReportByUser} />
              </div>
            </Affix>
          </>
        ) : (<></>)}


      </div>
    </AdminLayout>
  );
};


export default Transactions;