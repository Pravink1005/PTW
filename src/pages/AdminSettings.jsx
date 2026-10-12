import { useCallback, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Field, LoadingError, PageHeader } from '../components/admin/AdminUI';
import { supabase } from '../lib/supabase';

const defaults = { clinic_name: '', tagline: '', phone: '', whatsapp_number: '', email: '', address: '', maps_url: '', opening_hours: [], appointment_instructions: '', is_active: true };
export default function AdminSettings() {
  const { notify } = useOutletContext();
  const [settings, setSettings] = useState(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [revision, setRevision] = useState(0);
  const reload = useCallback(async () => {
    setLoading(true);
    setError('');
    const { data, error: queryError } = await supabase.from('clinic_settings').select('*').eq('singleton', true).maybeSingle();
    if (queryError) setError('Clinic settings could not be loaded. Confirm administrator access and try again.');
    else setSettings({ ...defaults, ...(data ?? {}) });
    setLoading(false);
  }, []);
  useEffect(() => { void reload(); }, [reload, revision]);
  async function save(event) {
    event.preventDefault();
    setSaving(true);
    const payload = { ...settings, singleton: true, clinic_name: settings.clinic_name.trim(), opening_hours: settings.opening_hours.filter((row) => row.day.trim() && row.hours.trim()) };
    const { error: saveError } = await supabase.from('clinic_settings').upsert(payload, { onConflict: 'singleton' });
    setSaving(false);
    if (saveError) notify('Clinic settings were not saved. Check the values and try again.');
    else notify('Clinic settings saved and public details updated.');
  }
  return <>
    <PageHeader title="Clinic settings" description="These contact details and instructions are shown on the public website." />
    <LoadingError loading={loading} error={error} onRetry={() => setRevision((value) => value + 1)} />
    {!loading && !error && <form className="admin-settings-form" onSubmit={save}>
      <section className="admin-settings-section"><h2>Clinic profile</h2><div className="admin-form-grid"><Field label="Clinic name" required value={settings.clinic_name} onChange={(event) => setSettings({ ...settings, clinic_name: event.target.value })} /><Field label="Tagline" value={settings.tagline} onChange={(event) => setSettings({ ...settings, tagline: event.target.value })} /><Field label="Phone" type="tel" value={settings.phone} onChange={(event) => setSettings({ ...settings, phone: event.target.value })} /><Field label="WhatsApp number" type="tel" value={settings.whatsapp_number} onChange={(event) => setSettings({ ...settings, whatsapp_number: event.target.value })} /><Field label="Email" type="email" value={settings.email} onChange={(event) => setSettings({ ...settings, email: event.target.value })} /><Field label="Address" as="textarea" rows="2" value={settings.address} onChange={(event) => setSettings({ ...settings, address: event.target.value })} /><Field label="Map URL" type="url" value={settings.maps_url} onChange={(event) => setSettings({ ...settings, maps_url: event.target.value })} /></div></section>
      <section className="admin-settings-section"><div className="admin-inline-heading"><div><h2>Opening hours</h2><p className="admin-muted">Shown on the public contact page.</p></div><button className="admin-button" type="button" onClick={() => setSettings({ ...settings, opening_hours: [...settings.opening_hours, { day: '', hours: '' }] })}>Add hours</button></div>{settings.opening_hours.map((row, index) => <div className="admin-availability-row" key={`${index}-${row.day}`}><Field label="Day" value={row.day} onChange={(event) => setSettings({ ...settings, opening_hours: settings.opening_hours.map((item, rowIndex) => rowIndex === index ? { ...item, day: event.target.value } : item) })} /><Field label="Hours" value={row.hours} onChange={(event) => setSettings({ ...settings, opening_hours: settings.opening_hours.map((item, rowIndex) => rowIndex === index ? { ...item, hours: event.target.value } : item) })} /><button className="admin-text-button" type="button" onClick={() => setSettings({ ...settings, opening_hours: settings.opening_hours.filter((_, rowIndex) => rowIndex !== index) })}>Remove</button></div>)}</section>
      <section className="admin-settings-section"><h2>Appointment instructions</h2><Field label="Instructions displayed with appointment requests" as="textarea" rows="4" maxLength={2000} value={settings.appointment_instructions} onChange={(event) => setSettings({ ...settings, appointment_instructions: event.target.value })} /></section>
      <button className="admin-button admin-button-primary" type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save clinic settings'}</button>
    </form>}
  </>;
}