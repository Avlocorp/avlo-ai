import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Phone, MessageSquare, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LeadsList from './LeadsList';
import SimpleAIChat from 'components/simpleAIchat';

const ClientDetailsPage: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'leads'>('overview');
  const navigate = useNavigate();
  const { t } = useTranslation();

  // In a real app, this would come from the data store
  const client = {
    name: 'Acme Corporation',
    metrics: {
      engagement: {
        lastInteraction: '2024-03-15',
        avgResponseTime: '2.5 hours',
        callDuration: '15 mins',
        emailOpenRate: '68%',
      },
      pipeline: {
        stage: t('Negotiation'),
        value: '$45,000',
        daysInStage: 5,
        probability: '75%',
      },
      history: {
        ltv: '$120,000',
        purchases: 3,
        upsells: 1,
        churnRisk: t('Low'),
      },
      sentiment: {
        trend: t('Positive'),
        objectionFrequency: t('Low'),
      },
      salesQuality: {
        positiveTone: '85%',
        objectionHandling: '92%',
        sdrMatch: '95%',
      },
      leadHealth: {
        score: 85,
        aging: '12 days',
        urgency: t('Medium'),
      },
    },
    psychology: {
      decisionMaking: t('Analytical'),
      communication: t('Data-driven'),
      needs: t('Trust'),
      objectionProfile: t('Value-seeking'),
      emotionalTone: t('Positive'),
      upsellOpenness: t('High'),
      responsePattern: t('Fast responder'),
    },
    disc: {
      dominance: 70,
      influence: 45,
      steadiness: 60,
      conscientiousness: 85,
    },
    recommendations: {
      messageTone: t('Direct'),
      bestTime: '10:00 AM - 2:00 PM',
      channel: t('Email'),
      objections: [
        t('Price concerns - Emphasize ROI and value metrics'),
        t('Implementation timeline - Share detailed project plan'),
      ],
      nextAction: t('Schedule technical review meeting'),
    },
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="p-6 flex flex-col min-h-[calc(100vh-64px)]">
      <div className="border-b  pb-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleBackClick}
              className="p-2 rounded-full hover:bg-gray-100 "
            >
              <ArrowLeft className="w-5 h-5 text-gray-500 " />
            </button>
            <h2 className="text-2xl font-semibold text-gray-800 ">{client.name}</h2>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg
               ${activeTab === 'overview'
                ? 'bg-[#4F46E4] text-white'
                : 'bg-gray-100  text-gray-700 '
              }
              `}
          >
            {t('Overview')}
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'leads'
              ? 'bg-[#4F46E4] text-white'
              : 'bg-gray-100  text-gray-700 '
              }`}
          >
            {t('Leads')}
          </button>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        {activeTab === 'overview' ? (
          <div className="space-y-6">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(client.metrics).map(([category, metrics]) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white  rounded-lg p-4 shadow-sm border "
                >
                  <h3 className="text-lg font-medium text-gray-800  capitalize mb-3">
                    {t(category.replace(/([A-Z])/g, ' $1').trim())}
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(metrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm text-gray-500   capitalize">
                          {t(key.replace(/([A-Z])/g, ' $1').trim())}
                        </span>
                        <span className="text-sm font-medium text-gray-900  ">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Psychology Profile */}
            <div className="bg-white   rounded-lg p-6 shadow-sm border ">
              <h3 className="text-lg font-medium text-gray-800   mb-4">
                {t('Psychological Profile')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  {Object.entries(client.psychology).map(([trait, value]) => (
                    <div key={trait} className="mb-3">
                      <div className="text-sm font-medium text-gray-700   capitalize mb-1">
                        {t(trait.replace(/([A-Z])/g, ' $1').trim())}
                      </div>
                      <div className="text-sm text-gray-900   bg-gray-50   px-3 py-2 rounded">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-800  mb-3">
                    {t('DISC Profile')}
                  </h4>
                  {Object.entries(client.disc).map(([trait, value]) => (
                    <div key={trait} className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700  capitalize">
                          {t(trait)}
                        </span>
                        <span className="text-gray-900 ">{value}%</span>
                      </div>
                      <div className="w-full bg-gray-200  rounded-full h-2">
                        <div
                          className="bg-[#4F46E4] h-2 rounded-full"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white  rounded-lg p-6 shadow-sm border ">
              <h3 className="text-lg font-medium text-gray-800  mb-4">
                {t('Recommendations')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-[#4f46e5]" />
                    <div>
                      <div className="text-sm font-medium text-gray-700">
                        {t('Message Tone')}
                      </div>
                      <div className="text-sm text-gray-900 ">
                        {client.recommendations.messageTone}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#4f46e5]" />
                    <div>
                      <div className="text-sm font-medium text-gray-700 ">
                        {t('Best Contact Time')}
                      </div>
                      <div className="text-sm text-gray-900 ">
                        {client.recommendations.bestTime}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#4f46e5]" />
                    <div>
                      <div className="text-sm font-medium text-gray-700 ">
                        {t('Preferred Channel')}
                      </div>
                      <div className="text-sm text-gray-900 ">
                        {client.recommendations.channel}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700  mb-2">
                    {t('Common Objections & Responses')}
                  </div>
                  <div className="space-y-2">
                    {client.recommendations.objections.map((objection, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-sm text-gray-900 "
                      >
                        <ArrowRight className="w-4 h-4 text-[#4f46e5] mt-1 flex-shrink-0" />
                        <span>{objection}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-700  mb-2">
                      {t('Next Best Action')}
                    </div>
                    <div className="text-sm text-gray-900  bg-[#eef2ff]  p-3 rounded-lg">
                      {client.recommendations.nextAction}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <LeadsList clientId={clientId || ''} />
        )}
      </div>

      <div className="mt-auto">
        <SimpleAIChat context="client" />
      </div>
    </div>
  );
};

export default ClientDetailsPage;