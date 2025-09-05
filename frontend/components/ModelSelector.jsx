import React,{ useEffect, useState, useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import { fetchModels } from '../services/api'

export const ModelSelector = () => {
    const [models, setModels] = useState([]);
    const [error, setError] = useState(null);
    const { model, setModel } = useContext(ChatContext);

    useEffect(() => {
        (async () => {
          try {
            const data = await fetchModels();
            setModels(data);
            if (!model && data.length) {
              setModel(data[0].id);
            }
          } catch (err) {
            setError('Failed to load models');
            console.error(err);
          }
        })();
      }, []);

      return (
        <div className="p-3">
          <label className="block text-sm mb-1">Model</label>
          <select
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={model || ''}
            onChange={e => setModel(e.target.value)}
          >
            {models.map(m => (
              <option key={m.id} value={m.id}>{m.name} — {m.id}</option>
            ))}
          </select>
          {error && <div className="text-xs text-red-400">{error}</div>}
        </div>
      );
}

export default ModelSelector;