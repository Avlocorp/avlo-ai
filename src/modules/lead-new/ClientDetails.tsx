import React, { useState } from 'react';
import { X, Phone, MessageSquare, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import LeadsList from './LeadsList';
import SimpleAIChat from 'components/simpleAIchat';

interface ClientDetailsProps {
  clientId: string;
  onClose: () => void;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ clientId, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'leads'>('overview');

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
        stage: 'Negotiation',
        value: '$45,000',
        daysInStage: 5,
        probability: '75%',
      },
      history: {
        ltv: '$120,000',
        purchases: 3,
        upsells: 1,
        churnRisk: 'Low',
      },
      sentiment: {
        trend: 'Positive',
        objectionFrequency: 'Low',
      },
      salesQuality: {
        positiveTone: '85%',
        objectionHandling: '92%',
        sdrMatch: '95%',
      },
      leadHealth: {
        score: 85,
        aging: '12 days',
        urgency: 'Medium',
      },
    },
    psychology: {
      decisionMaking: 'Analytical',
      communication: 'Data-driven',
      needs: 'Trust',
      objectionProfile: 'Value-seeking',
      emotionalTone: 'Positive',
      upsellOpenness: 'High',
      responsePattern: 'Fast responder',
    },
    disc: {
      dominance: 70,
      influence: 45,
      steadiness: 60,
      conscientiousness: 85,
    },
    recommendations: {
      messageTone: 'Direct',
      bestTime: '10:00 AM - 2:00 PM',
      channel: 'Email',
      objections: [
        'Price concerns - Emphasize ROI and value metrics',
        'Implementation timeline - Share detailed project plan',
      ],
      nextAction: 'Schedule technical review meeting',
    },
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b   p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800  ">{client.name}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 "
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'overview'
              ? 'bg-[#4F46E4] text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700  '
              }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'leads'
              ? 'bg-[#4F46E4] text-white'
              : 'bg-gray-100   text-gray-700 '
              }`}
          >
            Leads
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {activeTab === 'overview' ? (
          <div className="space-y-6">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(client.metrics).map(([category, metrics]) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white   rounded-lg p-4 shadow-sm border  "
                >
                  <h3 className="text-lg font-medium text-gray-800   capitalize mb-3">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(metrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm text-gray-500   capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Psychology Profile */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                Psychological Profile
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  {Object.entries(client.psychology).map(([trait, value]) => (
                    <div key={trait} className="mb-3">
                      <div className="text-sm font-medium text-gray-700  capitalize mb-1">
                        {trait.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className="text-sm text-gray-900  bg-gray-50  px-3 py-2 rounded">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-800   mb-3">
                    DISC Profile
                  </h4>
                  {Object.entries(client.disc).map(([trait, value]) => (
                    <div key={trait} className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700  capitalize">
                          {trait}
                        </span>
                        <span className="text-gray-900  ">{value}%</span>
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
                Recommendations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-[#4f46e5]" />
                    <div>
                      <div className="text-sm font-medium text-gray-700 ">
                        Message Tone
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
                        Best Contact Time
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
                        Preferred Channel
                      </div>
                      <div className="text-sm text-gray-900 ">
                        {client.recommendations.channel}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700  mb-2">
                    Common Objections & Responses
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
                      Next Best Action
                    </div>
                    <div className="text-sm text-gray-900  bg-primary-50  p-3 rounded-lg">
                      {client.recommendations.nextAction}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <LeadsList clientId={clientId} />
        )}
      </div>

      <div className="border-t ">
        <SimpleAIChat context="client" />
      </div>
    </div>
  );
};

export default ClientDetails;