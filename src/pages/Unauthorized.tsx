import { Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom"

export default function Unauthorized() {
  const navigate = useNavigate()

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-md px-4 py-8 bg-white shadow-lg rounded-xl">
        <h1 className="text-3xl font-semibold text-red-600 mb-4">401 - Unauthorized</h1>
        <p className="text-gray-700 mb-6">
          You do not have permission to access this page. Please contact your administrator or log in with the appropriate account.
        </p>
        <Button variant="default" onClick={() => navigate("/")}>
          Go to Home
        </Button>
      </div>
    </div>
  )
}
