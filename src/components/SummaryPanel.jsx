// src/components/SummaryPanel.jsx
import { useState } from 'react';
import { getSummary } from '../api/tasksApi.js';

export default function SummaryPanel() {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSummarise = async () => {
    setIsLoading(true);
    setError(null);

    try {
      setSummary(await getSummary());
    } catch (summaryError) {
      // A 502 means the API has no model available; show its message as is.
      setSummary(null);
      setError(summaryError.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="summary-panel">
      <button
        type="button"
        className="summary-button"
        onClick={handleSummarise}
        disabled={isLoading}
      >
        {isLoading ? 'Summarising...' : 'Summarise tasks'}
      </button>

      {summary && <p className="summary-text">{summary}</p>}

      {error && (
        <p className="error-message" role="alert">
          Summary unavailable: {error}
        </p>
      )}
    </div>
  );
}
