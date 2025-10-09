import { useNavigate } from "react-router-dom";



const ClientDashboard = () => {
  const navigate = useNavigate();
  const handleClientNavigate = () => {
    navigate("/");
  }
  return (
    <div>
      {/* optional navbar/sidebar here */}
      <div>Welcome to ClientPage</div>
      <button onClick={handleClientNavigate} className="bg-blue-500 rounded-md">
       Client Da
       
      </button>
    </div>
  );
};

export default ClientDashboard;
