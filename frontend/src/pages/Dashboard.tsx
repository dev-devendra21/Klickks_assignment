import { WarpBackground } from "@/components/magicui/warp-background";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.first_name) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <>
      <WarpBackground>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Welcome {user.first_name} {user.last_name}
          </h1>
        </div>
      </WarpBackground>
    </>
  );
};

export default Dashboard;
