import { createContext, useContext, useEffect, useState } from 'react';
import { site } from '../config/site';
import { services as fallbackServices } from '../data/services';
import { specialists as fallbackSpecialists } from '../data/specialists';
import { supabase, supabaseConfigError } from './supabase';

const ClinicDataContext = createContext(null);
const unavailableStatus = {
  loading: false,
  source: 'fallback',
  error: supabaseConfigError ? 'Supabase is not configured. Showing local fallback data.' : null,
};

const fallbackSettings = {
  ...site,
  mapsUrl: '',
};

function normalizeService(row) {
  const fallback = fallbackServices.find((service) => service.slug === row.slug) ?? {};
  return {
    ...fallback,
    ...row,
    introduction: row.introduction || fallback.introduction || row.blurb,
    helpsWith: row.helps_with?.length ? row.helps_with : fallback.helpsWith ?? [],
    audience: row.intended_audience || fallback.audience || '',
    approach: row.general_approach || fallback.approach || '',
    firstAppointment: row.first_appointment || fallback.firstAppointment || '',
    faqs: row.faqs?.length ? row.faqs : fallback.faqs ?? [],
    relatedServices: row.related_service_slugs?.length
      ? row.related_service_slugs
      : fallback.relatedServices ?? [],
  };
}

function formatAvailability(item) {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const start = String(item.start_time ?? '').slice(0, 5);
  const end = String(item.end_time ?? '').slice(0, 5);
  return `${weekdays[item.weekday] ?? 'Day'} ${start}–${end}${item.note ? ` · ${item.note}` : ''}`;
}

function normalizeSpecialist(row) {
  const links = row.specialist_services ?? [];
  const relatedServices = links.map((link) => link.services).filter(Boolean);
  const availability = (row.specialist_availability ?? [])
    .filter((item) => item.is_active)
    .map(formatAvailability);
  return {
    id: row.id,
    name: row.name,
    title: row.title,
    photo: row.photo_url,
    qualifications: row.qualifications ?? [],
    practiceAreas: row.practice_areas?.length
      ? row.practice_areas
      : relatedServices.map((service) => service.name),
    languages: row.languages ?? [],
    availability: availability.length ? availability : ['Contact the clinic for availability'],
    serviceIds: links.map((link) => link.service_id),
    serviceSlugs: relatedServices.map((service) => service.slug),
    bio: row.bio,
  };
}

function normalizeSettings(row) {
  const hours = Array.isArray(row.opening_hours)
    ? row.opening_hours.map((entry) => Array.isArray(entry) ? entry : [entry.day, entry.hours])
    : site.hours;
  return {
    name: row.clinic_name || site.name,
    tagline: row.tagline || site.tagline,
    phone: row.phone || site.phone,
    whatsappNumber: row.whatsapp_number || site.whatsappNumber,
    email: row.email || site.email,
    address: row.address || site.address,
    hours,
    mapsUrl: row.maps_url || '',
    appointmentInstructions: row.appointment_instructions || '',
  };
}

export function ClinicDataProvider({ children }) {
  const [services, setServices] = useState(fallbackServices);
  const [specialists, setSpecialists] = useState(fallbackSpecialists);
  const [settings, setSettings] = useState(fallbackSettings);
  const [serviceStatus, setServiceStatus] = useState(unavailableStatus);
  const [specialistStatus, setSpecialistStatus] = useState(unavailableStatus);
  const [settingsStatus, setSettingsStatus] = useState(unavailableStatus);

  useEffect(() => {
    if (!supabase) return;

    let active = true;
    setServiceStatus({ loading: true, source: 'supabase', error: null });
    setSpecialistStatus({ loading: true, source: 'supabase', error: null });
    setSettingsStatus({ loading: true, source: 'supabase', error: null });

    async function loadServices() {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('sort_order')
        .order('name');
      if (!active) return;
      if (error) {
        console.error('Unable to load services from Supabase.', error);
        setServiceStatus({ loading: false, source: 'fallback', error: 'Services could not be loaded from Supabase. Showing the local service list.' });
        return;
      }
      setServices((data ?? []).map(normalizeService));
      setServiceStatus({ loading: false, source: 'supabase', error: null });
    }

    async function loadSpecialists() {
      const { data, error } = await supabase
        .from('specialists')
        .select('*, specialist_services(service_id, services(slug, name)), specialist_availability(id, weekday, start_time, end_time, note, is_active)')
        .eq('is_active', true)
        .order('sort_order');
      if (!active) return;
      if (error) {
        console.error('Unable to load specialists from Supabase.', error);
        setSpecialistStatus({ loading: false, source: 'fallback', error: 'Specialists could not be loaded from Supabase. Showing placeholder profiles.' });
        return;
      }
      setSpecialists((data ?? []).map(normalizeSpecialist));
      setSpecialistStatus({ loading: false, source: 'supabase', error: null });
    }

    async function loadSettings() {
      const { data, error } = await supabase
        .from('clinic_settings')
        .select('*')
        .eq('is_active', true)
        .limit(1)
        .maybeSingle();
      if (!active) return;
      if (error || !data) {
        if (error) console.error('Unable to load clinic settings from Supabase.', error);
        setSettingsStatus({ loading: false, source: 'fallback', error: 'Clinic settings could not be loaded from Supabase. Showing placeholder settings.' });
        return;
      }
      setSettings(normalizeSettings(data));
      setSettingsStatus({ loading: false, source: 'supabase', error: null });
    }

    void Promise.all([loadServices(), loadSpecialists(), loadSettings()]);
    return () => { active = false; };
  }, []);

  return (
    <ClinicDataContext.Provider value={{
      services, specialists, settings,
      serviceStatus, specialistStatus, settingsStatus,
    }}>
      {children}
    </ClinicDataContext.Provider>
  );
}

export function useClinicData() {
  const context = useContext(ClinicDataContext);
  if (!context) throw new Error('useClinicData must be used inside ClinicDataProvider.');
  return context;
}