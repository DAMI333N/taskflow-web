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

      {/* The live region stays mounted so screen readers announce new text. */}
      <div role="status" aria-live="polite">
        {summary !== null && (
          <p className="summary-text">
            {summary || 'The API returned an empty summary.'}
          </p>
        )}
      </div>

      {error && (
        <p className="error-message" role="alert">
          Summary unavailable: {error}
        </p>
      )}
    </div>
  );
}
