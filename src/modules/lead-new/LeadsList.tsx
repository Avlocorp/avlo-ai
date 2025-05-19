import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LeadDetailsProps {
  clientId: string;
}

interface Lead {
  id: string;
  score: number;
  lastInteraction: string;
  status: 'active' | 'won' | 'lost';
  calls: {
    id: string;
    date: string;
    duration: string;
    transcript: Array<{
      speaker: 'sdr' | 'client';
      text: string;
      timestamp: string;
      endTimestamp?: string; // Added end timestamp
      speakerName?: string; // Added speaker name
    }>;
  }[];
}

const LeadsList: React.FC<LeadDetailsProps> = () => {
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { t } = useTranslation();

  // In a real app, this would come from the data store
  const leads: Lead[] = [
    {
      id: '1',
      score: 85,
      lastInteraction: '2024-03-15',
      status: 'active',
      calls: [
        {
          id: 'call1',
          date: '2024-03-15',
          duration: '15:30',
          transcript: [
            {
              speaker: 'sdr',
              text: t('Hello, this is John from Acme Corp.'),
              timestamp: '00:00',
              endTimestamp: '00:05',
              speakerName: 'John Smith'
            },
            {
              speaker: 'client',
              text: t('Hi John, how are you?'),
              timestamp: '00:06',
              endTimestamp: '00:09',
              speakerName: 'Acme Corp'
            },
            {
              speaker: 'sdr',
              text: t('I\'m doing well, thank you. I wanted to follow up on our previous conversation about our enterprise solution.'),
              timestamp: '00:10',
              endTimestamp: '00:20',
              speakerName: 'John Smith'
            },
            {
              speaker: 'client',
              text: t('Yes, I remember. We\'re still evaluating our options.'),
              timestamp: '00:21',
              endTimestamp: '00:28',
              speakerName: 'Acme Corp'
            },
          ],
        },
      ],
    },
    {
      id: '2',
      score: 92,
      lastInteraction: '2024-03-14',
      status: 'won',
      calls: [
        {
          id: 'call2',
          date: '2024-03-14',
          duration: '22:15',
          transcript: [
            {
              speaker: 'sdr',
              text: t('Good morning, following up on the proposal.'),
              timestamp: '00:00',
              endTimestamp: '00:06',
              speakerName: 'Lisa Johnson'
            },
            {
              speaker: 'client',
              text: t('Yes, we\'ve reviewed it and are ready to move forward.'),
              timestamp: '00:07',
              endTimestamp: '00:15',
              speakerName: 'Beta Industries'
            },
          ],
        },
      ],
    },
    {
      id: '3',
      score: 65,
      lastInteraction: '2024-03-13',
      status: 'lost',
      calls: [
        {
          id: 'call3',
          date: '2024-03-13',
          duration: '10:45',
          transcript: [
            {
              speaker: 'sdr',
              text: t('Hello, just checking in on the decision.'),
              timestamp: '00:00',
              endTimestamp: '00:05',
              speakerName: 'Mark Williams'
            },
            {
              speaker: 'client',
              text: t('We\'ve decided to go with another vendor.'),
              timestamp: '00:06',
              endTimestamp: '00:12',
              speakerName: 'Gamma Tech'
            },
          ],
        },
      ],
    },
  ];



  const getStatusIcon = (status: Lead['status']) => {
    switch (status) {
      case 'won':
        return <CheckCircle className="w-5 h-5 text-success-600" />;
      case 'lost':
        return <XCircle className="w-5 h-5 text-error-600" />;
      default:
        return <Clock className="w-5 h-5 text-[#4f46e5]" />;
    }
  };

  return (
    <div className="space-y-4">
      {leads.map(lead => (
        <motion.div
          key={lead.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white  rounded-lg p-4 shadow-sm border "
        >
          <div
            onClick={() => setSelectedLead(selectedLead === lead.id ? null : lead.id)}
            className=" cursor-pointer flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div
                className={`text-2xl font-bold ${lead.score >= 80
                  ? 'text-success-600'
                  : lead.score >= 60
                    ? 'text-warning-600'
                    : 'text-error-600'
                  }`}
              >
                {lead.score}
              </div>
              <div>
                <div className="text-sm text-gray-500 ">{t('Lead Score')}</div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900 ">
                    {t('Last interaction')}: {lead.lastInteraction}
                  </span>
                  {getStatusIcon(lead.status)}
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedLead(selectedLead === lead.id ? null : lead.id)}
              className="px-4 py-2 text-sm font-medium text-[#4f46e5] hover:text-primary-700"
            >
              {selectedLead === lead.id ? t('Hide Details') : t('Show Details')}
            </button>
          </div>

          {selectedLead === lead.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t  pt-4 mt-4"
            >
              <div className="space-y-4">
                {lead.calls.map(call => (
                  <div key={call.id} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="p-2 rounded-full bg-primary-100  text-[#4f46e5]"
                        >
                          {isPlaying ? (
                            <Pause className="w-5 h-5" />
                          ) : (
                            <Play className="w-5 h-5" />
                          )}
                        </button>
                        <div>
                          <div className="text-sm font-medium text-gray-900 ">
                            {call.date}
                          </div>
                          <div className="text-sm text-gray-500 ">
                            {t('Duration')}: {call.duration}
                          </div>
                        </div>
                      </div>
                      <Volume2 className="w-5 h-5 text-gray-400" />
                    </div>

                    <div className="space-y-4">
                      {call.transcript.map((entry, index) => (
                        <div
                          key={index}
                          className={`flex gap-4 ${entry.speaker === 'sdr' ? 'justify-end' : 'justify-start'
                            }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${entry.speaker === 'sdr'
                              ? 'bg-[#4F46E4] text-white'
                              : 'bg-gray-100 '
                              }`}
                          >
                            {/* Speaker label with name */}
                            <div className="text-xs font-semibold mb-1 flex justify-between">
                              <span className={entry.speaker === 'sdr'
                                ? 'text-white'
                                : 'text-gray-700'
                              }>
                                {entry.speaker === 'sdr' ? t('SDR') : t('Client')} - {entry.speakerName}
                              </span>
                            </div>

                            {/* Message content */}
                            <div className={entry.speaker === 'sdr'
                              ? 'text-white'
                              : 'text-gray-800 '
                            }>
                              {entry.text}
                            </div>

                            {/* Time range */}
                            <div className={`text-xs mt-2 ${entry.speaker === 'sdr'
                              ? 'text-primary-200'
                              : 'text-gray-500 '
                              }`}>
                              {entry.timestamp} - {entry.endTimestamp}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default LeadsList;