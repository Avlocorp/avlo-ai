import React, { useState } from 'react';
import { Printer, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PrintButtonProps {
  url: string;
  label?: string;
}

const PrintButton: React.FC<PrintButtonProps> = ({ url, label }) => {
  const { t } = useTranslation();
  const [showTooltip, setShowTooltip] = useState(false);

  const handlePrint = () => {
    // Open in a new tab
    window.open(url, '_blank');
  };

  return (
    <div className="relative">
      <button
        onClick={handlePrint}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="flex items-center px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
      >
        <Printer className="w-5 h-5 mr-2" />
        {label || t('Download PDF')}
      </button>

      {showTooltip && (
        <div className="absolute z-50 w-72 bg-gray-900 text-white text-sm rounded-md shadow-lg p-3 -bottom-32 left-0">
          <div className="flex items-start">
            <Info className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
            <p>
              {t('A print-friendly version will open in a new tab. Use your browser\'s print function (Ctrl+P/Cmd+P) and select "Save as PDF" to download. Adjust paper size and other settings in the print dialog.')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrintButton;