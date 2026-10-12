import { useCallback, useEffect, useState } from 'react';
import { CalendarDays, CheckCircle2, CircleDashed, Clock3, XCircle } from 'lucide-react';
import { LoadingError, PageHeader } from '../components/admin/AdminUI';
import { supabase } from '../lib/supabase';

const statuses = [
  ['Total appointments', null, CalendarDays], ['New', 'New', CircleDashed], ['Pending', 'Pending', Clock3],
  ['Confirmed', 'Confirmed', CheckCircle2], ['Completed', 'Completed', CheckCircle2], ['Cancelled', 'Cancelled', XCircle],
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [revision, setRevision] = useState(0);
  const reload = useCallback(async () => {
    setLoading(true);
    setError('');
    const today = new Date().toISOString().slice(0, 10);
    const requests = statuses.map(([, status]) => {
      let query = supabase.from('appointments').select('id', { count: 'exact', head: true });
      if (status) query = query.eq('status', status);
      return query;
    });
    requests.push(supabase.from('appointments').select('id', { count: 'exact', head: true }).gte('preferred_date', today).not('status', 'in', '(Completed,Cancelled)'));
    const results = await Promise.all(requests);
    const failed = results.find((result) => result.error);
    if (failed) setError('Appointment totals could not be loaded. Confirm your administrator access and try again.');
    else {
      setCounts(Object.fromEntries([...statuses.map(([label], index) => [label, results[index].count ?? 0]), ['Upcoming appointments', results.at(-1).count ?? 0]]));
    }
    setLoading(false);
  }, []);
  useEffect(() => { void reload(); }, [reload, revision]);
  return <>
    <PageHeader title="Overview" description="Appointment activity at a glance."><button className="admin-button" type="button" onClick={() => setRevision((value) => value + 1)}>Refresh</button></PageHeader>
    <LoadingError loading={loading} error={error} onRetry={() => setRevision((value) => value + 1)} />
    {!loading && !error && <div className="admin-metric-grid">{statuses.map(([label, , Icon]) => <section className="admin-metric" key={label}><span className="admin-metric-icon"><Icon size={19} aria-hidden="true" /></span><p>{label}</p><strong>{counts[label] ?? 0}</strong></section>)}<section className="admin-metric admin-metric-upcoming"><span className="admin-metric-icon"><CalendarDays size={19} aria-hidden="true" /></span><p>Upcoming appointments</p><strong>{counts['Upcoming appointments'] ?? 0}</strong><span className="admin-muted">Today onward, excluding completed and cancelled</span></section></div>}
  </>;
}