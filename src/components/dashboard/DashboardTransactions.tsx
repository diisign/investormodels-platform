
import { Link } from 'react-router-dom';
import { Filter, Wallet } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import TransactionItem from './TransactionItem';
import FadeIn from '@/components/animations/FadeIn';
import { Button } from '@/components/ui/button';

interface Transaction {
  id: string;
  amount: number;
  created_at: string;
  status: string;
  payment_method?: string;
  payment_id?: string;
}

interface DashboardTransactionsProps {
  transactions: Transaction[];
}

const DashboardTransactions = ({ transactions }: DashboardTransactionsProps) => {
  return (
    <FadeIn direction="up" delay={100} className="glass-card">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Transactions récentes</h3>
          <button className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center">
            <Filter className="h-4 w-4 mr-1" />
            <span>Filtrer</span>
          </button>
        </div>
        
        {transactions.length > 0 ? (
          <div className="space-y-4">
            {transactions.slice(0, 5).map((transaction) => {
              const type = transaction.payment_method === 'investment' ? 'investment' :
                          transaction.amount > 0 ? 'deposit' : 'withdrawal';
              
              return (
                <TransactionItem
                  key={transaction.id}
                  transaction={{
                    id: transaction.id,
                    type,
                    amount: Math.abs(transaction.amount),
                    date: format(new Date(transaction.created_at), 'dd/MM/yyyy'),
                    status: transaction.status,
                    description: type === 'investment' ? 
                      `Investissement - Créatrice #${transaction.payment_id}` :
                      type === 'deposit' ? 'Dépôt' : 'Retrait'
                  }}
                />
              );
            })}
            
            <div className="flex justify-center mt-6">
              <Link to="/transactions">
                <Button variant="outline">
                  Afficher plus de transactions
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-3">
              <Wallet className="h-12 w-12 mx-auto opacity-30" />
            </div>
            <h4 className="text-lg font-medium mb-2">Aucune transaction</h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Vous n'avez pas encore effectué de transactions.
            </p>
          </div>
        )}
      </div>
    </FadeIn>
  );
};

export default DashboardTransactions;
