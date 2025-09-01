import { Calendar, Clock } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import { format, addMonths, differenceInDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Investment } from '@/types/investments';

interface NextBenefitCardProps {
  investments: Investment[];
}

const NextBenefitCard = ({ investments }: NextBenefitCardProps) => {
  // Calculer le prochain bénéfice basé sur les investissements actifs
  const getNextBenefit = () => {
    if (!investments || investments.length === 0) {
      return null;
    }

    const activeInvestments = investments.filter(inv => inv.status === 'active');
    
    if (activeInvestments.length === 0) {
      return null;
    }

    // Pour chaque investissement, calculer la prochaine date de bénéfice
    const nextBenefitDates = activeInvestments.map(investment => {
      const createdAt = new Date(investment.created_at);
      const now = new Date();
      
      // Les bénéfices sont distribués mensuellement le même jour du mois
      let nextDate = new Date(createdAt);
      nextDate.setMonth(createdAt.getMonth() + 1); // Premier bénéfice après 1 mois
      
      // Trouver la prochaine date de bénéfice après maintenant
      while (nextDate <= now) {
        nextDate = addMonths(nextDate, 1);
      }
      
      // Vérifier que l'investissement n'a pas encore expiré
      const endDate = addMonths(createdAt, investment.duration_months);
      if (nextDate > endDate) {
        return null; // L'investissement a expiré
      }
      
      return {
        date: nextDate,
        amount: investment.amount * (investment.return_rate / 100) / 12, // Bénéfice mensuel
      };
    }).filter(Boolean);

    if (nextBenefitDates.length === 0) {
      return null;
    }

    // Trier par date croissante et prendre le plus proche
    nextBenefitDates.sort((a, b) => a!.date.getTime() - b!.date.getTime());
    
    const nextBenefit = nextBenefitDates[0]!;
    const daysUntil = differenceInDays(nextBenefit.date, new Date());
    
    return {
      date: nextBenefit.date,
      amount: nextBenefit.amount,
      daysUntil: Math.max(0, daysUntil),
    };
  };

  const nextBenefit = getNextBenefit();

  if (!nextBenefit) {
    return (
      <FadeIn direction="up" delay={200}>
        <div className="p-6 hover:bg-gray-50/80 dark:hover:bg-gray-800/60 transition-colors py-0 px-[15px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Prochain bénéfice</h3>
            <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-black text-yellow-300">
              <Calendar className="h-4 w-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Aucun investissement actif
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Investissez pour commencer à recevoir des bénéfices
          </div>
        </div>
      </FadeIn>
    );
  }

  const formatDate = (date: Date) => {
    return format(date, "d MMMM yyyy", { locale: fr });
  };

  const getDaysText = (days: number) => {
    if (days === 0) return "Aujourd'hui";
    if (days === 1) return "Demain";
    return `Dans ${days} jours`;
  };

  return (
    <FadeIn direction="up" delay={200}>
      <div className="p-6 hover:bg-gray-50/80 dark:hover:bg-gray-800/60 transition-colors py-0 px-[15px]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Prochain bénéfice</h3>
          <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-black text-yellow-300">
            <Calendar className="h-4 w-4" />
          </div>
        </div>
        <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {nextBenefit.amount.toFixed(2)} €
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Clock className="h-3 w-3 mr-1" />
          <span>{getDaysText(nextBenefit.daysUntil)}</span>
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          Le {formatDate(nextBenefit.date)}
        </div>
      </div>
    </FadeIn>
  );
};

export default NextBenefitCard;