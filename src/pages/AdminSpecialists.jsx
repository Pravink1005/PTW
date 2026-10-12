import { useCallback, useEffect, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { confirmAction, Field, LoadingError, PageHeader, useDialogFocus } from '../components/admin/AdminUI';
import { supabase } from '../lib/supabase';

const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const blankSpecialist = { name: '', title: '', photo_url: '', qualifications: '', practice_areas: '', languages: '', bio: '', sort_order: 0, is_active: true };
const list = (value) => value.split(',').map((item) => item.trim()).filter(Boolean);
const parse = (row) => ({ ...row, qualifications: (row.qualifications ?? []).join(', '), practice_areas: (row.practice_areas ?? []).join(', '), languages: (row.languages ?? []).join(', ') });

export default function AdminSpecialists() {
  const { notify } = useOutletContext();
  const [specialists, setSpecialists] = useState([]);
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [revision, setRevision] = useState(0);
  const modalRef = useDialogFocus(Boolean(form), () => setForm(null));
  const reload = useCallback(async () => {
    setLoading(true);
    setError('');
    const [people, offerings] = await Promise.all([
      supabase.from('specialists').select('*, specialist_services(service_id), specialist_availability(*)').order('sort_order'),
      supabase.from('services').select('id,name').order('name'),
    ]);
    if (people.error || offerings.error) setError('Specialists could not be loaded. Confirm administrator access and try again.');
    else { setSpecialists(people.data ?? []); setServices(offerings.data ?? []); }
    setLoading(false);
  }, []);
  useEffect(() => { void reload(); }, [reload, revision]);

  function edit(person) {
    setForm(person ? parse(person) : { ...blankSpecialist, sort_order: specialists.length * 10 });
    setAssignments(person?.specialist_services?.map((link) => link.service_id) ?? []);
    setAvailability(person?.specialist_availability?.map((item) => ({ ...item, start_time: item.start_time.slice(0, 5), end_time: item.end_time.slice(0, 5) })) ?? []);
  }
  async function save(event) {
    event.preventDefault();
    const payload = {
      name: form.name.trim(),
      title: form.title.trim(),
      photo_url: form.photo_url.trim() || null,
      qualifications: list(form.qualifications),
      practice_areas: list(form.practice_areas),
      languages: list(form.languages),
      bio: form.bio,
      sort_order: Number(form.sort_order) || 0,
      is_active: form.is_active,
    };
    const saved = form.id
      ? await supabase.from('specialists').update(payload).eq('id', form.id).select('id').single()
      : await supabase.from('specialists').insert(payload).select('id').single();
    if (saved.error) { notify('Specialist was not saved. Check the required fields.'); return; }
    const specialistId = saved.data.id;
    const linkDelete = await supabase.from('specialist_services').delete().eq('specialist_id', specialistId);
    const availabilityDelete = await supabase.from('specialist_availability').delete().eq('specialist_id', specialistId);
    if (linkDelete.error || availabilityDelete.error) { notify('Profile saved, but its service or availability rows could not be replaced.'); setRevision((value) => value + 1); return; }
    const results = await Promise.all([
      assignments.length ? supabase.from('specialist_services').insert(assignments.map((service_id) => ({ specialist_id: specialistId, service_id }))) : Promise.resolve({ error: null }),
      availability.length ? supabase.from('specialist_availability').insert(availability.map(({ weekday, start_time, end_time, note, is_active }) => ({ specialist_id: specialistId, weekday: Number(weekday), start_time, end_time, note: note || '', is_active: is_active !== false }))) : Promise.resolve({ error: null }),
    ]);
    if (results.some((result) => result.error)) notify('Profile saved, but some service or availability rows were rejected.');
    else notify(form.id ? 'Specialist updated.' : 'Specialist added.');
    setForm(null);
    setRevision((value) => value + 1);
  }
  async function toggle(person) {
    if (person.is_active && !confirmAction(`Deactivate ${person.name}? This removes the profile from the public site.`)) return;
    const { error: updateError } = await supabase.from('specialists').update({ is_active: !person.is_active }).eq('id', person.id);
    if (updateError) notify('Specialist status could not be changed.');
    else { notify(person.is_active ? 'Specialist deactivated.' : 'Specialist activated.'); setRevision((value) => value + 1); }
  }

  return <>
    <PageHeader title="Specialists" description="Manage practitioner profiles, services and weekly availability."><button className="admin-button admin-button-primary" type="button" onClick={() => edit(null)}><Plus size={16} aria-hidden="true" />Add specialist</button></PageHeader>
    <LoadingError loading={loading} error={error} onRetry={() => setRevision((value) => value + 1)} />
    {!loading && !error && <div className="admin-entity-list">{specialists.map((person) => <article className="admin-entity-row" key={person.id}><div className="admin-person-mark" aria-hidden="true">{person.name.slice(0, 1)}</div><div className="admin-entity-copy"><strong>{person.name}</strong><p>{person.title || 'Practitioner'} · {(person.languages ?? []).join(', ') || 'Languages not listed'}</p><span className={`admin-status ${person.is_active ? 'status-confirmed' : 'status-cancelled'}`}>{person.is_active ? 'Active' : 'Inactive'}</span></div><div className="admin-row-actions"><button className="admin-text-button" type="button" onClick={() => edit(person)}><Pencil size={15} aria-hidden="true" />Edit</button><button className="admin-text-button" type="button" onClick={() => void toggle(person)}>{person.is_active ? 'Deactivate' : 'Activate'}</button></div></article>)}</div>}
    {form && <div className="admin-modal-backdrop"><section ref={modalRef} tabIndex={-1} className="admin-modal admin-modal-wide" role="dialog" aria-modal="true" aria-labelledby="specialist-form-title"><h2 id="specialist-form-title">{form.id ? 'Edit specialist' : 'Add specialist'}</h2><form className="admin-form" onSubmit={save}>
      <div className="admin-form-grid"><Field label="Name" required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /><Field label="Title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /><Field label="Photo URL" type="url" value={form.photo_url || ''} onChange={(event) => setForm({ ...form, photo_url: event.target.value })} /><Field label="Qualifications (comma separated)" value={form.qualifications} onChange={(event) => setForm({ ...form, qualifications: event.target.value })} /><Field label="Specialties (comma separated)" value={form.practice_areas} onChange={(event) => setForm({ ...form, practice_areas: event.target.value })} /><Field label="Languages (comma separated)" value={form.languages} onChange={(event) => setForm({ ...form, languages: event.target.value })} /><Field label="Biography" as="textarea" rows="4" value={form.bio} onChange={(event) => setForm({ ...form, bio: event.target.value })} /><Field label="Sort order" type="number" value={form.sort_order} onChange={(event) => setForm({ ...form, sort_order: event.target.value })} /></div>
      <fieldset className="admin-fieldset"><legend>Assigned services</legend><div className="admin-check-grid">{services.map((service) => <label key={service.id} className="admin-checkbox"><input type="checkbox" checked={assignments.includes(service.id)} onChange={(event) => setAssignments(event.target.checked ? [...assignments, service.id] : assignments.filter((id) => id !== service.id))} />{service.name}</label>)}</div></fieldset>
      <fieldset className="admin-fieldset"><legend>Weekly availability</legend>{availability.map((item, index) => <div className="admin-availability-row" key={item.id || `new-${index}`}><label className="admin-field">Weekday<select value={item.weekday} onChange={(event) => setAvailability(availability.map((row, rowIndex) => rowIndex === index ? { ...row, weekday: event.target.value } : row))}>{week.map((day, dayIndex) => <option key={day} value={dayIndex}>{day}</option>)}</select></label><Field label="Start" type="time" required value={item.start_time} onChange={(event) => setAvailability(availability.map((row, rowIndex) => rowIndex === index ? { ...row, start_time: event.target.value } : row))} /><Field label="End" type="time" required value={item.end_time} onChange={(event) => setAvailability(availability.map((row, rowIndex) => rowIndex === index ? { ...row, end_time: event.target.value } : row))} /><Field label="Note" value={item.note || ''} onChange={(event) => setAvailability(availability.map((row, rowIndex) => rowIndex === index ? { ...row, note: event.target.value } : row))} /><button className="admin-icon-button" type="button" aria-label="Remove availability row" onClick={() => setAvailability(availability.filter((_, rowIndex) => rowIndex !== index))}><Trash2 size={17} /></button></div>)}<button className="admin-text-button" type="button" onClick={() => setAvailability([...availability, { weekday: 1, start_time: '09:00', end_time: '17:00', note: '', is_active: true }])}><Plus size={15} />Add weekly hours</button></fieldset>
      <label className="admin-checkbox"><input type="checkbox" checked={form.is_active} onChange={(event) => setForm({ ...form, is_active: event.target.checked })} />Active on public site</label>
      <div className="admin-modal-actions"><button className="admin-button" type="button" onClick={() => setForm(null)}>Close</button><button className="admin-button admin-button-primary" type="submit">Save specialist</button></div>
    </form></section></div>}
  </>;
}