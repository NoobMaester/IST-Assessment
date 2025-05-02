// components/columns.ts
import { ColumnDef, Row } from "@tanstack/react-table"
import { LeaveRequest } from "./types"
import { Button } from "@/components/ui/button"

export const columns = (
  onUpdateStatus: (id: string, status: string) => void,
  role: string
): ColumnDef<LeaveRequest>[] => [
  {
    accessorKey: "employeeId",
    header: "Employee ID",
  },
  {
    accessorKey: "type",
    header: "Type",
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
    accessorKey: "reason",
    header: "Reason",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status
      const base = "px-2 py-1 text-xs font-medium rounded"
      const color =
        status === "Approved"
          ? "bg-green-100 text-green-700"
          : status === "Rejected"
          ? "bg-red-100 text-red-700"
          : "bg-yellow-100 text-yellow-700"

      return <span className={`${base} ${color}`}>{status}</span>
    },
  },
  ...(role === "admin"
    ? [
        {
          id: "actions",
          header: "Actions",
          cell: ({ row }: { row: Row<LeaveRequest> }) => (
            <div className="space-x-2">
              <Button
                variant="default"
                size="sm"
                onClick={() => onUpdateStatus(row.original._id, "Approved")}
              >
                Approve
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onUpdateStatus(row.original._id, "Rejected")}
              >
                Reject
              </Button>
            </div>
          ),
        },
      ]
    : []),
]
