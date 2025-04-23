
import React from 'react';
import { useAuth } from '@/utils/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import UserBalance from '@/components/UserBalance';
import UserInvestments from '@/components/UserInvestments';

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
      
      <Button onClick={() => navigate('/deposit')}>Déposer des fonds</Button>
      <Button onClick={logout}>Se déconnecter</Button>
    </div>
  );
};

export default Dashboard;
