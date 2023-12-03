import React, { useEffect, useRef, useState } from 'react'
import useTransactionStore from '../store/transaction';
import { Card, Table, Tag, DatePicker, Select, Spin, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import ApexCharts from 'apexcharts';
import { chartOptions } from '../utils/chart';
import { currencyIDR } from '../utils/currency';
import { dateFormat } from '../utils/date';
import toast from 'react-hot-toast';
import { useTransactionLog } from '../services/transactionService';

const { RangePicker } = DatePicker;

interface ShowDetailProps {
    log: () => void;
    report: () => void;
}

const showDetail: React.FC<ShowDetailProps> = ({ log, report }) => {
    const {
        logByUser,
        transactionDetailUser,
        seriesByUser,
        dateByUser,
        transactionTypeByUser,
        setTransactionTypeByUser,
        setDateByUser,
        pushLogByUser
    } = useTransactionStore();
    const chartRefByUser = useRef(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {

        if (chartRefByUser.current && seriesByUser) {
            const chart = new ApexCharts(chartRefByUser.current, chartOptions(seriesByUser!, 200));
            chart.render();

            return () => {
                chart.destroy();
            };
        }
    }, [seriesByUser]);

    const handleLoadMore = async () => {
        try {
            setLoading(true);

            if (logByUser) {
                const cursorLogByUser: string = logByUser[logByUser.length - 1].timestamp;
                const nextLogs = await useTransactionLog({ user_id: transactionDetailUser?.user_id, cursor: cursorLogByUser, transaction_type: transactionTypeByUser, limit: 10 });
                pushLogByUser(nextLogs)
            }

        } catch (error) {
            toast.error("Something went wrong!");
        }
    }

    useEffect(() => {
        log();
        report();
    }, [dateByUser, transactionTypeByUser]);

    useEffect(() => {
        setLoading(false)
    }, [logByUser])


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
                                <p>{currencyIDR(transactionDetailUser?.amount!)}</p>
                            </div>

                            <div className='col-span-2 flex-col items-center'>
                                <small>date</small>
                                <p>{dateFormat(transactionDetailUser?.timestamp!)}</p>
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
                    <h3 className='mb-8 font-semibold'>Transaction History From {transactionDetailUser?.full_name}</h3>
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
                    <Spin spinning={loading}>
                        <Table
                            columns={columns}
                            dataSource={logByUser!}
                            pagination={false}
                        />
                    </Spin>
                    <div className='flex justify-center p-8'>
                        {logByUser?.length ? (
                            <Button loading={loading} type='primary' className='bg-blue-400' onClick={() => handleLoadMore()}>Load More</Button>
                        ) : (<></>)}
                    </div>
                </Card>

            </div >

        </>
    )
}

export default showDetail;
