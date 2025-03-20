
import React from 'react';

const TestAccountInfo = () => {
  return (
    <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-800">
      <p className="text-sm text-yellow-800 dark:text-yellow-300">
        <span className="font-semibold">Compte de démonstration:</span> Pour tester l'application, utilisez les identifiants suivants:
      </p>
      <ul className="mt-2 text-sm text-yellow-700 dark:text-yellow-400 space-y-1">
        <li>Email: <code className="bg-yellow-100 dark:bg-yellow-900/40 px-1 py-0.5 rounded">user@example.com</code></li>
        <li>Mot de passe: <code className="bg-yellow-100 dark:bg-yellow-900/40 px-1 py-0.5 rounded">password</code></li>
      </ul>
    </div>
  );
};

export default TestAccountInfo;
