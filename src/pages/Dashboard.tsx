const Dashboard = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to your Dashboard</h2>
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Leave Management</h3>
            <p className="text-gray-600">Here you can view and manage your leave requests.</p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Available Leave</h4>
              <p className="text-gray-600">Check your leave balance and history</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Apply for Leave</h4>
              <p className="text-gray-600">Submit new leave requests</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
