import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';
import { DataTable } from '../components/ui/data-table';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';
import { LeaveRequest } from '../components/types';
import { ColumnDef } from '@tanstack/react-table';

const LeavesPage: React.FC = () => {
    const { token } = useAuth();
    const { toast } = useToast();
    const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    
    const fetchLeaves = React.useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5001/api/leaves', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLeaves(response.data);
        } catch (error) {
            console.error('Failed to fetch leaves:', error);
            toast({
                title: 'Failed to fetch leaves',
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    }, [token, toast]);

    useEffect(() => {
        fetchLeaves();
    }, [fetchLeaves]);
    
    const columns: ColumnDef<LeaveRequest>[] = [
        {
            accessorKey: "employeeId",
            header: "Employee ID",
        },
        {
            accessorKey: "startDate",
            header: "Start Date",
            cell: ({ row }) => new Date(row.original.startDate).toLocaleDateString(),
        },
        {
            accessorKey: "endDate",
            header: "End Date",
            cell: ({ row }) => new Date(row.original.endDate).toLocaleDateString(),
        },
        {
            accessorKey: "type",
            header: "Leave Type",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.original.status;
                const base = "px-2 py-1 text-xs font-medium rounded";
                const color =
                    status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700";
                return <span className={`${base} ${color}`}>{status}</span>;
            },
        },
        {
            accessorKey: "reason",
            header: "Reason",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="space-x-2">
                    <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleApprove(row.original._id)}
                    >
                        Approve
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleReject(row.original._id)}
                    >
                        Reject
                    </Button>
                </div>
            ),
        },
    ];

    const handleApprove = async (id: string) => {
        try {
            await axios.patch(`http://localhost:5001/api/leaves/${id}`, 
                { status: 'Approved' },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast({ title: 'Leave approved successfully' });
            fetchLeaves();
        } catch (error) {
            console.error('Failed to approve leave:', error);
            toast({
                title: 'Failed to approve leave',
                variant: 'destructive'
            });
        }
    };

    const handleReject = async (id: string) => {
        try {
            await axios.patch(`http://localhost:5001/api/leaves/${id}`, 
                { status: 'Rejected' },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast({ title: 'Leave rejected successfully' });
            fetchLeaves();
        } catch (error) {
            console.error('Failed to reject leave:', error);
            toast({
                title: 'Failed to reject leave',
                variant: 'destructive'
            });
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Leave Requests</h1>
            {loading ? (
                <div className="text-center py-4">Loading...</div>
            ) : (
                <DataTable
                    columns={columns}
                    data={leaves}
                />
            )}
        </div>
    );
};

export default LeavesPage;