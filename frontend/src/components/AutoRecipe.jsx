import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function AutoRecipe() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [saved, setSaved] = useState(() => {
    try { return JSON.parse(localStorage.getItem('foodblog_saved') || '[]'); } catch { return []; }
  });
  useEffect(() => { localStorage.setItem('foodblog_saved', JSON.stringify(saved)); }, [saved]);
  const search = async () => {
    if (!query.trim()) return alert('Write a dish name');
    setLoading(true); setData(null);
    try {
      const res = await axios.get(`/api/wiki?title=${encodeURIComponent(query)}`);
      if(res.data) setData(res.data);
    } catch (err) { console.error(err); alert('Failed: ' + (err?.response?.data?.error || err.message)); }
    finally { setLoading(false); }
  };
  const save = () => { if (!data) return; setSaved(prev => [data, ...prev]); };
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex gap-3">
        <input value={query} onChange={e => setQuery(e.target.value)} className="flex-1 p-3 border rounded" placeholder="Search a dish" />
        <button onClick={search} className="px-4 py-3 bg-rose-600 text-white rounded font-semibold">Search</button>
      </div>
      {loading && <div className="mt-4">Loading…</div>}
      {data && (
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold">{data.title}</h2>
            <p className="mt-2 text-gray-700">{data.extract}</p>
            {data.ingredients && <section className="mt-4">
              <h3 className="font-semibold">Ingredients</h3>
              <ul className="list-disc ml-6 mt-2">{data.ingredients.map((i,idx)=>(<li key={idx}>{i}</li>))}</ul>
            </section>}
            {data.steps && <section className="mt-4">
              <h3 className="font-semibold">Steps</h3>
              <ol className="list-decimal ml-6 mt-2">{data.steps.map((s,idx)=>(<li key={idx}>{s}</li>))}</ol>
            </section>}
            <div className="mt-4 flex gap-2">
              <button onClick={save} className="px-3 py-2 bg-emerald-600 text-white rounded">Save</button>
            </div>
          </div>
          <div>
            {data.thumbnail ? <img src={data.thumbnail} alt={data.title} className="w-full h-64 object-cover rounded" /> : <div className="w-full h-64 bg-gray-100 rounded flex items-center justify-center text-gray-400">No image</div>}
            <div className="mt-3 text-xs text-gray-500">Source: Wikipedia</div>
            <a className="text-xs text-rose-600 underline" href={data.pageUrl} target="_blank" rel="noreferrer">Open Wikipedia page</a>
          </div>
        </div>
      )}
      {saved.length > 0 && (<div className="mt-8">
        <h3 className="font-semibold">Saved recipes</h3>
        <ul className="mt-2 space-y-2">{saved.map((s,i)=>(<li key={i} className="p-3 border rounded">{s.title}</li>))}</ul>
      </div>)}
    </div>
  );
}
