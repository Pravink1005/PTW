import { useCallback, useEffect, useMemo, useState } from 'react';
import { Download, X } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { confirmAction, Field, LoadingError, PageHeader, useDialogFocus } from '../components/admin/AdminUI';
import { supabase } from '../lib/supabase';

const statusOptions = ['New', 'Pending', 'Confirmed', 'Rescheduled', 'Completed', 'Cancelled'];
const dateToday = () => new Date().toISOString().slice(0, 10);
const csvCell = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;

export default function AdminAppointments() {
  const { notify } = useOutletContext();
  const [rows, setRows] = useState([]);
  const [services, setServices] = useState([]);
  const [specialists, setSpecialists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ date: '', service: '', specialist: '', status: '' });
  const [selected, setSelected] = useState(null);
  const [revision, setRevision] = useState(0);
  const drawerRef = useDialogFocus(Boolean(selected), () => setSelected(null));

  const reload = useCallback(async () => {
    setLoading(true);
    setError('');
    const [appointmentsResult, servicesResult, specialistsResult] = await Promise.all([
      supabase.from('appointments').select('*, services(name), specialists(name)').order('preferred_date', { ascending: false }).order('created_at', { ascending: false }),
      supabase.from('services').select('id,name').order('name'),
      supabase.from('specialists').select('id,name').order('name'),
    ]);
    const failed = appointmentsResult.error || servicesResult.error || specialistsResult.error;
    if (failed) setError('Appointments could not be loaded. Confirm your administrator access and try again.');
    else {
      setRows(appointmentsResult.data ?? []);
      setServices(servicesResult.data ?? []);
      setSpecialists(specialistsResult.data ?? []);
    }
    setLoading(false);
  }, []);
  useEffect(() => { void reload(); }, [reload, revision]);
  const filteredRows = useMemo(() => rows.filter((row) => {
    const needle = search.trim().toLowerCase();
    return (!needle || row.client_name.toLowerCase().includes(needle) || row.reference_number.toLowerCase().includes(needle))
      && (!filters.date || row.preferred_date === filters.date)
      && (!filters.service || row.service_id === filters.service)
      && (!filters.specialist || row.specialist_id === filters.specialist)
      && (!filters.status || row.status === filters.status);
  }), [rows, search, filters]);

  async function updateAppointment(updates, successMessage) {
    if (!selected) return;
    const { data, error: updateError } = await supabase.from('appointments').update(updates).eq('id', selected.id).select('*, services(name), specialists(name)').single();
    if (updateError) {
      notify('Appointment was not updated. Check the date and your access, then try again.');
      return false;
    }
    setRows((current) => current.map((row) => row.id === data.id ? data : row));
    setSelected(data);
    notify(successMessage);
    return true;
  }

  function exportCsv() {
    const csvRows = [['Reference', 'Name', 'Service', 'Date', 'Status'], ...filteredRows.map((row) => [row.reference_number, row.client_name, row.services?.name, row.preferred_date, row.status])];
    const blob = new Blob([csvRows.map((row) => row.map(csvCell).join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mindcare-appointments.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  return <>
    <PageHeader title="Appointments" description="Review and update appointment requests."><button className="admin-button" type="button" onClick={exportCsv} disabled={!filteredRows.length}><Download size={16} aria-hidden="true" />Export CSV</button></PageHeader>
    <LoadingError loading={loading} error={error} onRetry={() => setRevision((value) => value + 1)} />
    {!loading && !error && <>
      <section className="admin-filter-bar" aria-label="Appointment filters">
        <Field label="Search name or reference" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Name or MC-…" />
        <Field label="Date" type="date" value={filters.date} onChange={(event) => setFilters({ ...filters, date: event.target.value })} />
        <Field label="Service" as="select" value={filters.service} onChange={(event) => setFilters({ ...filters, service: event.target.value })}><option value="">All services</option>{services.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</Field>
        <Field label="Specialist" as="select" value={filters.specialist} onChange={(event) => setFilters({ ...filters, specialist: event.target.value })}><option value="">All specialists</option>{specialists.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</Field>
        <Field label="Status" as="select" value={filters.status} onChange={(event) => setFilters({ ...filters, status: event.target.value })}><option value="">All statuses</option>{statusOptions.map((status) => <option key={status}>{status}</option>)}</Field>
        <span className="admin-result-count" aria-live="polite">{filteredRows.length} results</span>
      </section>
      <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Reference</th><th>Client</th><th>Service</th><th>Date & time</th><th>Status</th><th><span className="sr-only">Details</span></th></tr></thead><tbody>
        {filteredRows.map((row) => <tr key={row.id}><td className="admin-reference">{row.reference_number}</td><td>{row.client_name}</td><td>{row.services?.name || 'Unavailable'}</td><td>{row.preferred_date}<small>{row.time_range}</small></td><td><span className={`admin-status status-${row.status.toLowerCase()}`}>{row.status}</span></td><td><button className="admin-text-button" type="button" onClick={() => setSelected(row)}>View</button></td></tr>)}
      </tbody></table>{!filteredRows.length && <p className="admin-state">No appointments match these filters.</p>}</div>
      <div className="admin-mobile-list">{filteredRows.map((row) => <button className="admin-appointment-card" key={row.id} type="button" onClick={() => setSelected(row)}><span className="admin-reference">{row.reference_number}</span><strong>{row.client_name}</strong><span>{row.services?.name || 'Unavailable'}</span><span>{row.preferred_date} · {row.time_range}</span><span className={`admin-status status-${row.status.toLowerCase()}`}>{row.status}</span></button>)}</div>
    </>}
    {selected && <div className="admin-drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><aside ref={drawerRef} tabIndex={-1} className="admin-drawer" role="dialog" aria-modal="true" aria-labelledby="appointment-detail-heading"><header><div><p className="admin-eyebrow">{selected.reference_number}</p><h2 id="appointment-detail-heading">Appointment details</h2></div><button className="admin-icon-button" type="button" aria-label="Close details" onClick={() => setSelected(null)}><X /></button></header>
      <dl className="admin-detail-list"><div><dt>Client</dt><dd>{selected.client_name}</dd></div><div><dt>Phone</dt><dd><a href={`tel:${selected.phone}`}>{selected.phone}</a></dd></div><div><dt>Email</dt><dd>{selected.email || 'Not provided'}</dd></div><div><dt>Service</dt><dd>{selected.services?.name || 'Unavailable'}</dd></div><div><dt>Specialist</dt><dd>{selected.specialists?.name || 'No preference'}</dd></div><div><dt>Request</dt><dd>{selected.message || 'No message'}</dd></div></dl>
      <Field label="Internal notes" as="textarea" rows="4" value={selected.internal_notes || ''} onChange={(event) => setSelected({ ...selected, internal_notes: event.target.value })} />
      <button className="admin-button admin-button-primary admin-full" type="button" onClick={() => void updateAppointment({ internal_notes: selected.internal_notes || null }, 'Internal notes saved.')}>Save notes</button>
      <div className="admin-reschedule"><h3>Reschedule</h3><Field label="New date" id="reschedule-date" type="date" min={dateToday()} value={selected.preferred_date} onChange={(event) => setSelected({ ...selected, preferred_date: event.target.value })} /><Field label="New time range" id="reschedule-time" value={selected.time_range} onChange={(event) => setSelected({ ...selected, time_range: event.target.value })} maxLength={80} /><button className="admin-button" type="button" disabled={selected.preferred_date < dateToday() || !selected.time_range.trim()} onClick={() => void updateAppointment({ preferred_date: selected.preferred_date, time_range: selected.time_range.trim(), status: 'Rescheduled' }, 'Appointment rescheduled.')}>Save reschedule</button></div>
      <div className="admin-action-stack"><button className="admin-button admin-button-primary" type="button" onClick={() => void updateAppointment({ status: 'Confirmed' }, 'Appointment confirmed.')}>Confirm appointment</button><button className="admin-button" type="button" onClick={() => void updateAppointment({ status: 'Completed' }, 'Appointment marked completed.')}>Mark completed</button><button className="admin-button admin-button-danger" type="button" onClick={() => { if (confirmAction('Cancel this appointment? The record will be retained.')) void updateAppointment({ status: 'Cancelled' }, 'Appointment cancelled.'); }}>Cancel appointment</button></div>
    </aside></div>}
  </>;
}