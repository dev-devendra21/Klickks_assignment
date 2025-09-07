import { Button } from "./ui/button";
import { logoutApi } from "@/api/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      localStorage.removeItem("user");
      await logoutApi();
      toast.success("Logout successful", {
        duration: 5000,
        style: { color: "green" },
      });
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", {
        duration: 5000,
        style: { color: "red" },
      });
    }
  };
  return (
    <nav className="flex justify-between items-center px-8 py-5 bg-[#FFFFFF] border-b border-gray-200 fixed top-0 z-10 w-full">
      <div>
        <h1 className="text-2xl font-bold font-mono">Klickks</h1>
      </div>

      <div>
        <Button className="cursor-pointer" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Header;
