import React, { useEffect, useRef } from 'react'
import useTransactionStore from '../store/transaction';
import { Card, Table, Tag, DatePicker, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Pagination from '../components/Pagination';
import ApexCharts from 'apexcharts';

const { RangePicker } = DatePicker;

interface ShowDetailProps {
    log: () => void;
    report: () => void;
}

const showDetail: React.FC<ShowDetailProps> = ({ log, report }) => {
    const {
        logByUser,
        transactionDetailUser,
        prevLogPageByUser,
        nextLogPageByUser,
        totalLogPageByUser,
        setLogPageByUser,
        logPageByUser,
        seriesByUser,
        dateByUser,
        transactionTypeByUser,
        setTransactionTypeByUser,
        setDateByUser,
    } = useTransactionStore();
    const chartRefByUser = useRef(null);

    useEffect(() => {

        if (chartRefByUser.current && seriesByUser) {
            const options = {
                series: [{
                    name: 'transfer',
                    data: seriesByUser ? seriesByUser[0]['data'].map((data: Array<any>) => data[0]) : []
                }, {
                    name: 'topup',
                    data: seriesByUser ? seriesByUser[1]['data'].map((data: Array<any>) => data[0]) : []
                }],
                chart: {
                    height: 320,
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
                    categories: seriesByUser ? [...seriesByUser[0]['data'].map((data: Array<any>) => data[1]), ...seriesByUser[1]['data'].map((data: Array<any>) => data[1])] : []
                },
                tooltip: {
                    x: {
                        format: 'dd/MM/yy HH:mm'
                    },
                },
                colors: ['#f07f06', '#bce8ad'],
            };
            const chart = new ApexCharts(chartRefByUser.current, options);
            chart.render();
            
            return () => {
                chart.destroy();
            };
        }
    }, [seriesByUser]);
    

    useEffect(() => {
        log();
        report();
    }, [logPageByUser, dateByUser, transactionTypeByUser]);


    const handlePrevPage = () => {
        prevLogPageByUser()
    }

    const handleNextPage = () => {
        nextLogPageByUser()
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

    return (
        <>
            <div className='flex flex-col gap-8'>
                <Card>
                    <div className='flex-col gap-8'>
                        <h3 className='mb-8 font-semibold'>
                            <Tag color={transactionDetailUser?.transaction_type === 'topup' ? 'green' : 'volcano'}>{transactionDetailUser?.transaction_type.toUpperCase()}</Tag>
                        </h3>
                        <div className='grid grid-cols-5 items-center'>

                            <div className='flex-col items-center'>
                                <small>Name</small>
                                <p>{transactionDetailUser?.full_name}</p>
                            </div>

                            <div className='flex-col items-center'>
                                <small>Username</small>
                                <p>{transactionDetailUser?.username}</p>
                            </div>

                            <div className='flex-col items-center'>
                                <small>amount</small>
                                <p>{transactionDetailUser?.amount}</p>
                            </div>

                            <div className='col-span-2 flex-col items-center'>
                                <small>date</small>
                                <p>{transactionDetailUser?.timestamp}</p>
                            </div>

                        </div>

                        {transactionDetailUser?.transaction_detail?.transfer_to ? (
                            <div className='col-span-2 flex-col items-center mt-4'>
                                <small>Transfer to</small>
                                <p>{transactionDetailUser?.transaction_detail?.transfer_to}</p>
                            </div>) : (<></>)}
                    </div>

                </Card>

                <Card>
                    <h3 className='mb-8 font-semibold'>Transaction History</h3>
                    <div className='flex items-center gap-4'>

                        <RangePicker onChange={(value) => setDateByUser(value)} />
                        <Select
                            defaultValue={null}
                            style={{ width: 200 }}
                            onChange={(value) => setTransactionTypeByUser(value)}
                            options={[
                                { value: null, label: 'Select Transaction Type' },
                                { value: 'topup', label: 'Topup' },
                                { value: 'transfer', label: 'Transfer' },
                            ]}
                        />
                    </div>
                    <div ref={chartRefByUser} className='my-4 !z-0'></div>
                    <Table
                        columns={columns}
                        dataSource={logByUser!}
                        pagination={false}
                    />
                    <Pagination
                        onPageChange={(page: number) => setLogPageByUser(page)}
                        totalPage={totalLogPageByUser}
                        page={logPageByUser} onNextPage={() => handleNextPage()}
                        onPrevPage={() => handlePrevPage()}
                    />
                </Card>

            </div >

        </>
    )
}

export default showDetail;
