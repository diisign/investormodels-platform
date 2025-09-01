
import React from 'react';
import { format, addMonths } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Investment } from '@/types/investments';
import SharesManagementButton from './SharesManagementButton';

interface WithdrawReturnsButtonProps {
  investment: Investment;
  onWithdraw: () => void;
}

const WithdrawReturnsButton = ({ investment, onWithdraw }: WithdrawReturnsButtonProps) => {
  return (
    <SharesManagementButton 
      investment={investment} 
      onUpdate={onWithdraw}
    />
  );
};

export default WithdrawReturnsButton;
