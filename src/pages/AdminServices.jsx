import { useCallback, useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Pencil, Plus } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { confirmAction, Field, LoadingError, PageHeader, useDialogFocus } from '../components/admin/AdminUI';
import { supabase } from '../lib/supabase';

const blankService = { slug: '', name: '', category: 'counselling', icon: 'Leaf', blurb: '', introduction: '', helps_with: '', intended_audience: '', general_approach: '', first_appointment: '', sort_order: 0, is_active: true };
const lines = (value) => value.split('\n').map((item) => item.trim()).filter(Boolean);
const toForm = (service) => ({ ...service, helps_with: (service.helps_with ?? []).join('\n') });

export default function AdminServices() {
  const { notify } = useOutletContext();
  const [services, setServices] = useState([]);
  const [specialists, setSpecialists] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [revision, setRevision] = useState(0);
  const modalRef = useDialogFocus(Boolean(form), () => setForm(null));
  const reload = useCallback(async () => {
    setLoading(true);
    setError('');
    const [serviceResult, specialistResult] = await Promise.all([
      supabase.from('services').select('*, specialist_services(specialist_id)').order('sort_order').order('name'),
      supabase.from('specialists').select('id,name').order('name'),
    ]);
    if (serviceResult.error || specialistResult.error) setError('Services could not be loaded. Confirm administrator access and try again.');
    else { setServices(serviceResult.data ?? []); setSpecialists(specialistResult.data ?? []); }
    setLoading(false);
  }, []);
  useEffect(() => { void reload(); }, [reload, revision]);

  async function save(event) {
    event.preventDefault();
    const payload = {
      slug: form.slug.trim(),
      name: form.name.trim(),
      category: form.category,
      icon: form.icon.trim() || 'Leaf',
      blurb: form.blurb.trim(),
      introduction: form.introduction || null,
      helps_with: lines(form.helps_with),
      intended_audience: form.intended_audience || null,
      general_approach: form.general_approach || null,
      first_appointment: form.first_appointment || null,
      faqs: form.faqs ?? [],
      related_service_slugs: form.related_service_slugs ?? [],
      sort_order: Number(form.sort_order) || 0,
      is_active: form.is_active,
    };
    const result = form.id
      ? await supabase.from('services').update(payload).eq('id', form.id).select('id').single()
      : await supabase.from('services').insert(payload).select('id').single();
    if (result.error) { notify('Service was not saved. Check required fields and ensure its slug is unique.'); return; }
    const serviceId = result.data.id;
    const removed = await supabase.from('specialist_services').delete().eq('service_id', serviceId);
    if (removed.error) { notify('Service saved, but its specialist assignments could not be replaced.'); setRevision((value) => value + 1); return; }
    const linked = assignments.length
      ? await supabase.from('specialist_services').insert(assignments.map((specialist_id) => ({ specialist_id, service_id: serviceId })))
      : { error: null };
    if (linked.error) { notify('Service saved, but some specialist assignments could not be saved.'); setRevision((value) => value + 1); return; }
    setForm(null);
    notify(form.id ? 'Service updated.' : 'Service added.');
    setRevision((value) => value + 1);
  }

  async function toggle(service) {
    const action = service.is_active ? 'deactivate' : 'activate';
    if (service.is_active && !confirmAction(`Deactivate ${service.name}? It will no longer appear on the public site.`)) return;
    const { error: updateError } = await supabase.from('services').update({ is_active: !service.is_active }).eq('id', service.id);
    if (updateError) notify(`Could not ${action} service.`);
    else { notify(`Service ${action}d.`); setRevision((value) => value + 1); }
  }

  async function move(service, direction) {
    const index = services.findIndex((item) => item.id === service.id);
    const other = services[index + direction];
    if (!other) return;
    const results = await Promise.all([
      supabase.from('services').update({ sort_order: other.sort_order }).eq('id', service.id),
      supabase.from('services').update({ sort_order: service.sort_order }).eq('id', other.id),
    ]);
    if (results.some((result) => result.error)) notify('Service order could not be updated.');
    else setRevision((value) => value + 1);
  }

  return <>
    <PageHeader title="Services" description="Manage the services shown on the public clinic site."><button className="admin-button admin-button-primary" type="button" onClick={() => { setForm({ ...blankService, sort_order: Math.max(0, ...services.map((item) => item.sort_order)) + 10 }); setAssignments([]); }}><Plus size={16} aria-hidden="true" />Add service</button></PageHeader>
    <LoadingError loading={loading} error={error} onRetry={() => setRevision((value) => value + 1)} />
    {!loading && !error && <div className="admin-entity-list">{services.map((service, index) => <article className="admin-entity-row" key={service.id}><div className="admin-order-controls"><button className="admin-icon-button" aria-label={`Move ${service.name} up`} disabled={index === 0} onClick={() => void move(service, -1)}><ArrowUp size={16} /></button><button className="admin-icon-button" aria-label={`Move ${service.name} down`} disabled={index === services.length - 1} onClick={() => void move(service, 1)}><ArrowDown size={16} /></button></div><div className="admin-entity-copy"><strong>{service.name}</strong><p>{service.blurb}</p><span className={`admin-status ${service.is_active ? 'status-confirmed' : 'status-cancelled'}`}>{service.is_active ? 'Active' : 'Inactive'}</span></div><div className="admin-row-actions"><button className="admin-text-button" type="button" onClick={() => { setForm(toForm(service)); setAssignments(service.specialist_services?.map((link) => link.specialist_id) ?? []); }}><Pencil size={15} aria-hidden="true" />Edit</button><button className="admin-text-button" type="button" onClick={() => void toggle(service)}>{service.is_active ? 'Deactivate' : 'Activate'}</button></div></article>)}</div>}
    {form && <div className="admin-modal-backdrop"><section ref={modalRef} tabIndex={-1} className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="service-form-title"><h2 id="service-form-title">{form.id ? 'Edit service' : 'Add service'}</h2><form className="admin-form" onSubmit={save}>
      <div className="admin-form-grid"><Field label="Service name" required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /><Field label="URL slug" required pattern="[a-z0-9]+(-[a-z0-9]+)*" value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value.toLowerCase().replace(/\s+/g, '-') })} /><Field label="Category" as="select" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}><option value="counselling">Counselling</option><option value="rehabilitation">Rehabilitation</option></Field><Field label="Icon key" value={form.icon} onChange={(event) => setForm({ ...form, icon: event.target.value })} /><Field label="Short description" as="textarea" rows="2" required value={form.blurb} onChange={(event) => setForm({ ...form, blurb: event.target.value })} /><Field label="Full description" as="textarea" rows="3" value={form.introduction || ''} onChange={(event) => setForm({ ...form, introduction: event.target.value })} /><Field label="What it can help with (one per line)" as="textarea" rows="3" value={form.helps_with} onChange={(event) => setForm({ ...form, helps_with: event.target.value })} /><Field label="Intended audience" as="textarea" rows="2" value={form.intended_audience || ''} onChange={(event) => setForm({ ...form, intended_audience: event.target.value })} /><Field label="General approach" as="textarea" rows="2" value={form.general_approach || ''} onChange={(event) => setForm({ ...form, general_approach: event.target.value })} /><Field label="First appointment" as="textarea" rows="2" value={form.first_appointment || ''} onChange={(event) => setForm({ ...form, first_appointment: event.target.value })} /><Field label="Sort order" type="number" value={form.sort_order} onChange={(event) => setForm({ ...form, sort_order: event.target.value })} /></div>
      <fieldset className="admin-fieldset"><legend>Assigned specialists</legend><div className="admin-check-grid">{specialists.map((specialist) => <label key={specialist.id} className="admin-checkbox"><input type="checkbox" checked={assignments.includes(specialist.id)} onChange={(event) => setAssignments(event.target.checked ? [...assignments, specialist.id] : assignments.filter((id) => id !== specialist.id))} />{specialist.name}</label>)}</div>{!specialists.length && <p className="admin-muted">Add a specialist before assigning one.</p>}</fieldset>
      <label className="admin-checkbox"><input type="checkbox" checked={form.is_active} onChange={(event) => setForm({ ...form, is_active: event.target.checked })} />Active on public site</label>
      <div className="admin-modal-actions"><button className="admin-button" type="button" onClick={() => setForm(null)}>Close</button><button className="admin-button admin-button-primary" type="submit">Save service</button></div>
    </form></section></div>}
  </>;
}