
import { useAuthStore } from "@/store/authStore";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import StoreOwnerDashboard from "./StoreOwnerDashboard";

const Dashboard = () => {
  const { user } = useAuthStore();

  if (!user) return null;

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'user':
      return <UserDashboard />;
    case 'store_owner':
      return <StoreOwnerDashboard />;
    default:
      return <div>Invalid user role</div>;
  }
};

export default Dashboard;
