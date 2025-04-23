
import React from 'react';
import { useAuth } from '@/utils/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import UserBalance from '@/components/UserBalance';
import UserInvestments from '@/components/UserInvestments';
import { PlusCircle, LogOut } from "lucide-react";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UserBalance />
        <UserInvestments />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={() => navigate('/deposit')} 
          className="flex items-center gap-2"
        >
          <PlusCircle size={18} />
          Déposer des fonds
        </Button>
        <Button 
          onClick={logout} 
          variant="outline"
          className="flex items-center gap-2"
        >
          <LogOut size={18} />
          Se déconnecter
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
