
import { cn } from '@/lib/utils';
import { ArrowUpRight, Minus, Plus } from 'lucide-react';

interface TransactionItemProps {
  transaction: {
    id: string;
    type?: string;
    amount: number;
    date: string;
    status: string;
    description?: string;
  };
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  return (
    <div 
      className="flex items-center p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50"
    >
      <div className={cn(
        "h-10 w-10 rounded-full flex items-center justify-center mr-3",
        transaction.type === 'deposit' ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" :
        transaction.type === 'withdrawal' ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" :
        "bg-investment-100 text-investment-600 dark:bg-investment-900/30 dark:text-investment-400"
      )}>
        {transaction.type === 'deposit' && <Plus className="h-5 w-5" />}
        {transaction.type === 'withdrawal' && <Minus className="h-5 w-5" />}
        {transaction.type === 'investment' && <ArrowUpRight className="h-5 w-5" />}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-sm">{transaction.description || 'Transaction'}</h4>
          <span className={cn(
            "text-sm font-semibold",
            transaction.type === 'deposit' ? "text-blue-500" : 
            transaction.type === 'withdrawal' ? "text-green-500" : 
            "text-red-500"
          )}>
            {transaction.type === 'deposit' ? '+' : ''}
            {transaction.amount}€
          </span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {transaction.date}
          </span>
          <span className={cn(
            "text-xs px-2 py-0.5 rounded-full",
            transaction.status === 'completed' ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
            transaction.status === 'pending' ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" :
            "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
          )}>
            {transaction.status === 'completed' ? 'Terminé' :
             transaction.status === 'pending' ? 'En attente' : 'Échoué'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
