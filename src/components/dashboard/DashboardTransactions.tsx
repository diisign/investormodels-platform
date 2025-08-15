import { Link } from 'react-router-dom';
import { Filter, Wallet, Plus, Minus, ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
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
  creatorProfile?: CreatorProfile;
  description?: string;
  investmentData?: {
    duration_months: number;
    created_at: string;
  };
}

interface DashboardTransactionsProps {
  transactions: Transaction[];
}

const DashboardTransactions = ({
  transactions
}: DashboardTransactionsProps) => {
  const { t } = useTranslation();
  return <FadeIn direction="up" delay={100}>
      <div className="p-6 my-0 py-[2px] px-0 mx-0">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">{t('dashboard.transactions.title')}</h3>
          <button className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center">
            <Filter className="h-4 w-4 mr-1" />
            <span>{t('dashboard.transactions.filter')}</span>
          </button>
        </div>
        
        {transactions.length > 0 ? <div className="h-80 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
            {transactions
              .filter(transaction => {
                // Pour les investissements, filtrer ceux qui ont dépassé leur date de retrait
                if (transaction.payment_method === 'investment' && transaction.investmentData) {
                  const investmentDate = new Date(transaction.investmentData.created_at);
                  const withdrawalDate = new Date(
                    investmentDate.getFullYear(),
                    investmentDate.getMonth() + transaction.investmentData.duration_months,
                    investmentDate.getDate()
                  );
                  const canWithdraw = new Date() >= withdrawalDate;
                  // Supprimer les investissements dont la date de retrait est passée
                  return !canWithdraw;
                }
                // Garder toutes les autres transactions
                return true;
              })
              .map(transaction => {
              const type = transaction.payment_method === 'investment' ? 'investment' : transaction.amount > 0 ? 'deposit' : 'withdrawal';
              
              // Calculer la date de retrait pour les investissements
              let withdrawalInfo = null;
              let investmentStatus = transaction.status;
              
              if (type === 'investment' && transaction.investmentData) {
                const investmentDate = new Date(transaction.investmentData.created_at);
                const withdrawalDate = new Date(
                  investmentDate.getFullYear(),
                  investmentDate.getMonth() + transaction.investmentData.duration_months,
                  investmentDate.getDate()
                );
                const canWithdraw = new Date() >= withdrawalDate;
                
                // Changer le statut de l'investissement
                investmentStatus = canWithdraw ? 'completed' : 'pending';
                
                withdrawalInfo = {
                  canWithdraw,
                  withdrawalDate,
                  formattedDate: format(withdrawalDate, 'dd/MM/yyyy', { locale: fr })
                };
              }
              
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
                            {transaction.payment_method === 'investment' && transaction.creatorProfile ? `${t('dashboard.transactions.investment')} ${transaction.creatorProfile.name}` : type === 'deposit' ? t('dashboard.transactions.deposit') : t('dashboard.transactions.withdrawal')}
                          </h4>
                          <span className="text-sm font-semibold text-black dark:text-white">
                            {type === 'deposit' ? '+' : ''}
                            {Math.abs(transaction.amount)}€
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {format(new Date(transaction.created_at), 'dd/MM/yyyy')}
                          </span>
                          <span className={cn("text-xs px-2 py-0.5 rounded-full", investmentStatus === 'completed' ? "bg-gray-100 text-black dark:bg-gray-800 dark:text-white" : investmentStatus === 'pending' ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400")}>
                            {investmentStatus === 'completed' ? t('dashboard.transactions.completed') : investmentStatus === 'pending' && type === 'investment' ? t('dashboard.transactions.inProgress') : investmentStatus === 'pending' ? t('dashboard.transactions.pending') : t('dashboard.transactions.failed')}
                          </span>
                        </div>
                        {/* Affichage de la date de retrait pour les investissements */}
                        {withdrawalInfo && (
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-500">
                              {t('dashboard.transactions.initial')}: {Math.abs(transaction.amount)}€
                            </span>
                            <span className="text-xs font-medium text-black dark:text-white">
                              {withdrawalInfo.canWithdraw ? t('dashboard.transactions.withdrawalAvailable') : `${t('dashboard.transactions.withdrawalOn')} ${withdrawalInfo.formattedDate}`}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>;
            })}
          </div> : <div className="text-center py-8">
            <div className="text-gray-400 mb-3">
              <Wallet className="h-12 w-12 mx-auto opacity-30" />
            </div>
            <h4 className="text-lg font-medium mb-2">{t('dashboard.transactions.noTransactions')}</h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {t('dashboard.transactions.noTransactionsDesc')}
            </p>
          </div>}
      </div>
    </FadeIn>;
};

export default DashboardTransactions;