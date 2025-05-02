// components/LeaveTable.tsx
import { columns } from "./columns"
import { DataTable } from "./ui/data-table"
import { LeaveRequest } from "./types"
import { useToast } from "../hooks/use-toast"

interface LeaveTableProps { 
  leaves: LeaveRequest[]
  setLeaves: React.Dispatch<React.SetStateAction<LeaveRequest[]>>
  token: string
  role: string
}

export default function LeaveTable({
  leaves,
  setLeaves,
  token,
  role,
}: LeaveTableProps) {
  const { toast } = useToast()

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`http://localhost:5001/api/leaves/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      })

      if (!res.ok) throw new Error("Request failed")
      const updated = await res.json()

      setLeaves((prev) =>
        prev.map((l) => (l._id === updated._id ? updated : l))
      )

      toast({ title: `Leave ${status}` })
    } catch (error) {
      console.error("Failed to update leave status:", error)
      toast({
        title: "Failed to update leave status",
        variant: "destructive",
      })
    }
  }

  return <DataTable columns={columns(updateStatus, role)} data={leaves} />
}
