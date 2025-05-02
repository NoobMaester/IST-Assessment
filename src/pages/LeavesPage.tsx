import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Space from 'antd/lib/space';
import axios, { AxiosError } from 'axios';

interface LeaveData {
    id: number;
    employeeId: string;
    startDate: string;
    endDate: string;
    leaveType: string;
    status: string;
    reason: string;
}

const LeavesPage: React.FC = () => {
    const [leaves, setLeaves] = useState<LeaveData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    
    const columns: ColumnsType<LeaveData> = [
        {
            title: 'Employee ID',
            dataIndex: 'employeeId',
            key: 'employeeId',
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
        },
        {
            title: 'Leave Type',
            dataIndex: 'leaveType',
            key: 'leaveType',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            key: 'reason',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: LeaveData) => (
                <Space>
                    <Button 
                        type="primary" 
                        onClick={() => handleApprove(record.id)}
                    >
                        {`Approve`}
                    </Button>
                    <Button 
                        type="primary" 
                        danger 
                        onClick={() => handleReject(record.id)}
                    >
                        {`Reject`}
                    </Button>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8080/api/leaves');
            setLeaves(response.data);
        } catch (err) {
            const error = err as AxiosError;
            console.error('Failed to fetch leaves:', error.message);
            message.error('Failed to fetch leaves');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: number) => {
        try {
            await axios.put(`http://localhost:8080/api/leaves/${id}/approve`);
            message.success('Leave approved successfully');
            fetchLeaves();
        } catch (err) {
            const error = err as AxiosError;
            console.error('Failed to approve leave:', error.message);
            message.error('Failed to approve leave');
        }
    };

    const handleReject = async (id: number) => {
        try {
            await axios.put(`http://localhost:8080/api/leaves/${id}/reject`);
            message.success('Leave rejected successfully');
            fetchLeaves();
        } catch (err) {
            const error = err as AxiosError;
            console.error('Failed to reject leave:', error.message);
            message.error('Failed to reject leave');
        }
    };

    return (
        <div style={{ padding: '24px' }}>
            <h1>Leave Requests</h1>
            <Table
                columns={columns}
                dataSource={leaves}
                loading={loading}
                rowKey={(record) => record.id.toString()}
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default LeavesPage;