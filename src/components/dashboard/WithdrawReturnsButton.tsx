
import React from 'react';
import { format, addMonths } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Investment } from '@/types/investments';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface WithdrawReturnsButtonProps {
  investment: Investment;
  onWithdraw: () => void;
}

const WithdrawReturnsButton = ({ investment, onWithdraw }: WithdrawReturnsButtonProps) => {
  const currentDate = new Date('2025-04-26');
  const investmentDate = new Date(investment.created_at);
  const maturityDate = addMonths(investmentDate, 3);
  const isMatured = currentDate >= maturityDate;
  
  // Calculer le rendement (1/3 du taux de rendement annuel pour 3 mois)
  const returnAmount = Number(investment.amount) * (Number(investment.return_rate) / 100);
  
  const handleWithdraw = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Vous devez être connecté pour retirer vos gains");
      return;
    }

    // Créer une transaction pour le retrait des gains
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert({
        user_id: user.id,
        amount: returnAmount,
        status: 'completed',
        payment_method: 'investment_return',
        payment_id: investment.id,
        currency: 'EUR'
      });

    if (transactionError) {
      console.error('Erreur lors du retrait:', transactionError);
      toast.error("Une erreur est survenue lors du retrait des gains");
      return;
    }

    toast.success("Gains retirés avec succès !");
    onWithdraw();
  };

  if (!isMatured) {
    return (
      <div className="text-xs text-gray-500">
        Disponible le {format(maturityDate, 'dd MMMM yyyy', { locale: fr })}
      </div>
    );
  }

  return (
    <Button
      onClick={handleWithdraw}
      size="sm"
      className="w-full mt-2 bg-green-500 hover:bg-green-600"
    >
      <Plus className="h-4 w-4 mr-1" />
      Retirer {returnAmount.toFixed(2)}€
    </Button>
  );
};

export default WithdrawReturnsButton;
