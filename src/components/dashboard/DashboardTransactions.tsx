import { Link } from 'react-router-dom';
import { Filter, Wallet, Plus, Minus, ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import FadeIn from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';
import { CreatorProfile } from '@/utils/creatorProfiles';
interface Transaction {
  id: string;
  amount: number;
  created_at: string;
  status: string;
  payment_method?: string;
  payment_id?: string;
  creatorProfile?: CreatorProfile; // Updated to accept CreatorProfile type
  description?: string;
}
interface DashboardTransactionsProps {
  transactions: Transaction[];
}
const DashboardTransactions = ({
  transactions
}: DashboardTransactionsProps) => {
  return <FadeIn direction="up" delay={100}>
      <div className="p-6 my-0 py-[2px] px-0 mx-0">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Transactions récentes</h3>
          <button className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center">
            <Filter className="h-4 w-4 mr-1" />
            <span>Filtrer</span>
          </button>
        </div>
        
        {transactions.length > 0 ? <div className="h-80 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
            {transactions.map(transaction => {
              const type = transaction.payment_method === 'investment' ? 'investment' : transaction.amount > 0 ? 'deposit' : 'withdrawal';
              return <div key={transaction.id} className="flex items-center p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                      {transaction.creatorProfile ? <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                          <img src={transaction.creatorProfile.imageUrl || `https://api.dicebear.com/7.x/lorelei/svg?seed=${transaction.payment_id}`} alt={transaction.creatorProfile.name} className="h-full w-full object-cover" />
                        </div> : <div className={cn("h-10 w-10 rounded-full flex items-center justify-center mr-3", type === 'deposit' ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary" : type === 'withdrawal' ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary" : "bg-investment-100 text-investment-600 dark:bg-investment-900/30 dark:text-investment-400")}>
                          {type === 'deposit' && <Plus className="h-5 w-5" />}
                          {type === 'withdrawal' && <Minus className="h-5 w-5" />}
                          {type === 'investment' && <ArrowUpRight className="h-5 w-5" />}
                        </div>}
                      <div className="flex-grow">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-sm">
                            {transaction.payment_method === 'investment' && transaction.creatorProfile ? `Investissement ${transaction.creatorProfile.name}` : type === 'deposit' ? 'Dépôt' : 'Retrait'}
                          </h4>
                          <span className={cn("text-sm font-semibold", type === 'deposit' ? "text-primary" : type === 'withdrawal' ? "text-primary" : "text-primary")}>
                            {type === 'deposit' ? '+' : ''}
                            {Math.abs(transaction.amount)}€
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {format(new Date(transaction.created_at), 'dd/MM/yyyy')}
                          </span>
                          <span className={cn("text-xs px-2 py-0.5 rounded-full", transaction.status === 'completed' ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary" : transaction.status === 'pending' ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400")}>
                            {transaction.status === 'completed' ? 'Terminé' : transaction.status === 'pending' ? 'En attente' : 'Échoué'}
                          </span>
                        </div>
                      </div>
                    </div>;
            })}
          </div> : <div className="text-center py-8">
            <div className="text-gray-400 mb-3">
              <Wallet className="h-12 w-12 mx-auto opacity-30" />
            </div>
            <h4 className="text-lg font-medium mb-2">Aucune transaction</h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Vous n'avez pas encore effectué de transactions.
            </p>
          </div>}
      </div>
    </FadeIn>;
};
export default DashboardTransactions;