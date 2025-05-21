import React, { useState, useMemo } from 'react';
import { Search, SortAsc, Clock, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Client {
  id: string;
  name: string;
  manager: string;
  lastInteraction: Date;
}

const LeadsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'lastInteraction'>('lastInteraction');
  const navigate = useNavigate();
  const { t } = useTranslation();

  // In a real app, this would come from the data store
  const clients: Client[] = useMemo(() => [
    { id: '1', name: 'Acme Corporation', manager: 'Alice Johnson', lastInteraction: new Date('2024-03-10') },
    { id: '2', name: 'Beta Industries', manager: 'Bob Smith', lastInteraction: new Date('2024-03-12') },
    { id: '3', name: 'Gamma Tech', manager: 'Carol Williams', lastInteraction: new Date('2024-03-15') },
    { id: '4', name: 'Delta Systems', manager: 'David Brown', lastInteraction: new Date('2024-03-08') },
    { id: '5', name: 'Epsilon Software', manager: 'Eve Davis', lastInteraction: new Date('2024-03-14') },
  ], []);

  const filteredAndSortedClients = useMemo(() => {
    return clients
      .filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.manager.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        return b.lastInteraction.getTime() - a.lastInteraction.getTime();
      });
  }, [clients, searchTerm, sortBy]);

  const handleClientClick = (clientId: string) => {
    navigate(`/pm/client/${clientId}`);
  };

  return (
    <div className="p-6 flex flex-col min-h-[calc(100vh-64px)]">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800  mb-4">
          {t('Leads')}
        </h1>

        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('Search clients or managers...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500  "
            />
          </div>

          <button
            onClick={() => setSortBy(sortBy === 'name' ? 'lastInteraction' : 'name')}
            className="px-4 py-2 border  rounded-lg hover:bg-gray-100  flex items-center gap-2"
          >
            {sortBy === 'name' ? <SortAsc className="w-5 h-5 text-gray-600 " /> : <Clock className="w-5 h-5 text-gray-600 " />}
            <span className="text-gray-700 ">
              {sortBy === 'name' ? t('Sort by Name') : t('Sort by Last Interaction')}
            </span>
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-8">
        <AnimatePresence>
          {filteredAndSortedClients.map(client => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 rounded-lg cursor-pointer transition-all bg-white  hover:bg-gray-50  border "
              onClick={() => handleClientClick(client.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {client.name}
                  </h3>
                  <p className="text-sm text-gray-500 ">
                    {t('Manager')}: {client.manager}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500  mr-2">
                    {client.lastInteraction.toLocaleDateString()}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 " />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* <div className="mt-auto">
        <SimpleAIChat context="leads" />
      </div> */}
    </div>
  );
};

export default LeadsPage;