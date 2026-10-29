import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import { DataNotice } from '../components/ui/DataState';
import usePageMetadata from '../hooks/usePageMetadata';
import { useClinicData } from '../lib/ClinicDataContext';
import { supabase, supabaseConfigError } from '../lib/supabase';
import {
  validateClientName,
  validatePhone,
  validateOptionalEmail,
  validatePreferredDate,
} from '../lib/validation';

const formLifetimeMs = 2500;
const timeRanges = [
  ['09:00-12:00', 'Morning (09:00–12:00)'],
  ['12:00-15:00', 'Afternoon (12:00–15:00)'],
  ['15:00-18:00', 'Late afternoon (15:00–18:00)'],
];

function localDateString(date) {
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
}

function FieldError({ id, message }) {
  return message ? <p id={id} className="mt-1 text-sm text-red-800" role="alert">{message}</p> : null;
}

export default function Appointment() {
  const [searchParams] = useSearchParams();
  const { services, specialists, settings, serviceStatus, specialistStatus } = useClinicData();
  const requestedSlug = searchParams.get('service') ?? '';
  const [referenceNumber, setReferenceNumber] = useState('');
  const formOpenedAt = useRef(Date.now());
  const submitting = useRef(false);
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      service_slug: requestedSlug,
      specialist_id: '',
      contact_method: '',
      website: '',
    },
  });
  const selectedSlug = watch('service_slug');
  const selectedService = services.find((service) => service.slug === selectedSlug);
  const contactMethod = watch('contact_method');
  const availableSpecialists = specialistStatus.source === 'supabase'
    ? specialists.filter((specialist) => specialist.serviceIds.includes(selectedService?.id))
    : [];
  usePageMetadata('Request an Appointment', `Send an appointment request to ${settings.name}. The clinic will contact you to confirm availability.`);

  async function submitRequest(values) {
    if (submitting.current) return;
    submitting.current = true;
    setReferenceNumber('');

    try {
      if (values.website) throw new Error('We could not send this request. Please try again or contact the clinic directly.');
      if (Date.now() - formOpenedAt.current < formLifetimeMs) {
        throw new Error('Please review your details for a moment, then try submitting again.');
      }
      if (!supabase) throw new Error('Appointment requests are not connected yet. Please contact the clinic by phone or email.');
      if (!selectedService?.id) throw new Error('The selected service is unavailable. Refresh the page or contact the clinic for help.');
      if (values.specialist_id && !availableSpecialists.some((specialist) => specialist.id === values.specialist_id)) {
        setError('specialist_id', { type: 'validate', message: 'Choose a specialist linked to the selected service, or choose No preference.' });
        return;
      }

      const { data, error } = await supabase.rpc('submit_appointment_request', {
        p_client_name: values.client_name.trim(),
        p_phone: values.phone.trim(),
        p_service_id: selectedService.id,
        p_preferred_date: values.preferred_date,
        p_time_range: values.time_range,
        p_specialist_id: values.specialist_id || null,
        p_email: values.email.trim() || null,
        p_message: values.message.trim() || null,
        p_contact_method: values.contact_method || null,
        p_consent: values.consent === true,
      });
      if (error) throw error;
      if (typeof data !== 'string' || !data.trim()) {
        throw new Error('The clinic did not return a request reference. Please contact the clinic before trying again.');
      }
      setReferenceNumber(data);
    } catch (error) {
      console.error('Appointment request was not confirmed.', error);
      setError('root.request', {
        type: 'server',
        message: error.message?.includes('not connected')
          ? error.message
          : error.message?.includes('selected service is unavailable')
            ? error.message
            : error.message?.includes('review your details')
              ? error.message
              : 'We could not confirm that your request was received. Please try again or contact the clinic directly.',
      });
    } finally {
      submitting.current = false;
    }
  }

  if (referenceNumber) {
    return (
      <section className="public-page appointment-page appointment-success" aria-labelledby="appointment-success-heading">
        <h1 id="appointment-success-heading" className="mt-2 text-4xl font-bold">Thank you</h1>
        <p className="mt-5 text-lg leading-7">Your appointment request has been received. The clinic will contact you to confirm availability.</p>
        <p className="request-reference-label">Reference number</p>
        <p className="mt-2 inline-block rounded-card border border-line bg-white px-5 py-3 font-mono text-xl font-bold" aria-live="polite">{referenceNumber}</p>
        <p className="mt-5 text-sm leading-6 text-ink-muted">Keep this reference number for your records. Your appointment is not confirmed until the clinic contacts you.</p>
      </section>
    );
  }

  const today = localDateString(new Date());
  function onFormError(formErrors) {
    const errorKeys = Object.keys(formErrors);
    if (!errorKeys.length) return;
    const firstField = errorKeys[0];
    const element = document.querySelector(`[name="${firstField}"]`) || document.getElementById(firstField);
    if (element) {
      if (typeof element.scrollIntoView === 'function') element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (typeof element.focus === 'function') element.focus({ preventScroll: true });
    }
  }

  const fieldClass = 'mt-1.5 min-h-[52px] w-full rounded-2xl border border-line bg-white px-4 py-3 text-base text-ink focus:border-brand focus:ring-1 focus:ring-brand';

  return (
    <section className="public-page appointment-page">
      <header className="page-intro">
        <h1>Request an appointment</h1>
        <p>Share your preferred service and time. This is a request, not a confirmed booking; the clinic will contact you about availability.</p>
      </header>

      {settings.appointmentInstructions && <p className="mt-6 border-l-4 border-brand bg-white px-4 py-3 text-sm leading-6" role="note">{settings.appointmentInstructions}</p>}

      {!supabase && (
        <p role="alert" className="mt-6 border-l-4 border-amber-500 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
          Online appointment requests are not connected yet. Contact the clinic at {settings.phone} or {settings.email}. ({supabaseConfigError})
        </p>
      )}
      {supabase && <DataNotice status={serviceStatus} />}

      <form className="appointment-form pb-16 sm:pb-8" noValidate onSubmit={handleSubmit(submitRequest, onFormError)}>
        <div>
          <label className="font-semibold" htmlFor="client_name">Client name <span aria-hidden="true">*</span></label>
          <input id="client_name" autoComplete="name" className={fieldClass} aria-invalid={Boolean(errors.client_name)} aria-describedby={errors.client_name ? 'client_name-error' : undefined} {...register('client_name', { validate: validateClientName })} />
          <FieldError id="client_name-error" message={errors.client_name?.message} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="font-semibold" htmlFor="phone">Phone <span aria-hidden="true">*</span></label>
            <input id="phone" type="tel" autoComplete="tel" inputMode="tel" className={fieldClass} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} {...register('phone', { validate: validatePhone })} />
            <FieldError id="phone-error" message={errors.phone?.message} />
          </div>
          <div>
            <label className="font-semibold" htmlFor="email">Email <span className="font-normal text-ink-muted">(optional)</span></label>
            <input id="email" type="email" autoComplete="email" inputMode="email" className={fieldClass} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} {...register('email', { validate: (value) => {
              const emailResult = validateOptionalEmail(value);
              if (emailResult !== true) return emailResult;
              if (contactMethod === 'email' && !value?.trim()) return 'Enter an email address to be contacted by email.';
              return true;
            } })} />
            <FieldError id="email-error" message={errors.email?.message} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="font-semibold" htmlFor="service_slug">Service <span aria-hidden="true">*</span></label>
            <select id="service_slug" className={fieldClass} aria-invalid={Boolean(errors.service_slug)} aria-describedby={errors.service_slug ? 'service_slug-error' : undefined} {...register('service_slug', { validate: (value) => services.some((service) => service.slug === value) || 'Choose an available service.' })}>
              <option value="">Choose a service</option>
              {services.map((service) => <option key={service.slug} value={service.slug}>{service.name}</option>)}
            </select>
            <FieldError id="service_slug-error" message={errors.service_slug?.message} />
          </div>
          <div>
            <label className="font-semibold" htmlFor="specialist_id">Preferred specialist <span className="font-normal text-ink-muted">(optional)</span></label>
            <select id="specialist_id" className={fieldClass} aria-invalid={Boolean(errors.specialist_id)} aria-describedby={errors.specialist_id ? 'specialist_id-error' : undefined} disabled={!availableSpecialists.length} {...register('specialist_id')}>
              <option value="">No preference</option>
              {availableSpecialists.map((specialist) => <option key={specialist.id} value={specialist.id}>{specialist.name}</option>)}
            </select>
            <FieldError id="specialist_id-error" message={errors.specialist_id?.message} />
            {specialistStatus.error && <p className="mt-1 text-sm text-ink-muted">Specialist choices are unavailable right now.</p>}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="font-semibold" htmlFor="preferred_date">Preferred date <span aria-hidden="true">*</span></label>
            <input id="preferred_date" type="date" min={today} className={fieldClass} aria-invalid={Boolean(errors.preferred_date)} aria-describedby={errors.preferred_date ? 'preferred_date-error' : undefined} {...register('preferred_date', { validate: validatePreferredDate })} />
            <FieldError id="preferred_date-error" message={errors.preferred_date?.message} />
          </div>
          <div>
            <label className="font-semibold" htmlFor="time_range">Preferred time range <span aria-hidden="true">*</span></label>
            <select id="time_range" className={fieldClass} aria-invalid={Boolean(errors.time_range)} aria-describedby={errors.time_range ? 'time_range-error' : undefined} {...register('time_range', { required: 'Choose a preferred time range.' })}>
              <option value="">Choose a time range</option>
              {timeRanges.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
            <FieldError id="time_range-error" message={errors.time_range?.message} />
          </div>
        </div>

        <div>
          <label className="font-semibold" htmlFor="message">Message <span className="font-normal text-ink-muted">(optional, non-clinical)</span></label>
          <textarea id="message" rows="4" maxLength="1000" className={fieldClass} aria-describedby="message-help" {...register('message')} />
          <p id="message-help" className="mt-1 text-sm text-ink-muted">Please do not include health details or other sensitive information.</p>
        </div>

        <div>
          <label className="font-semibold" htmlFor="contact_method">Preferred contact method <span className="font-normal text-ink-muted">(optional)</span></label>
          <select id="contact_method" className={fieldClass} aria-invalid={Boolean(errors.contact_method)} aria-describedby={errors.contact_method ? 'contact_method-error' : undefined} {...register('contact_method', { validate: (value) => value !== 'email' || Boolean(getValues('email')?.trim()) || 'Enter an email address to be contacted by email.' })}>
            <option value="">Let the clinic choose</option>
            <option value="phone">Phone</option>
            <option value="email">Email</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="either">Either phone or email</option>
          </select>
          <FieldError id="contact_method-error" message={errors.contact_method?.message} />
        </div>

        <div>
          <label className="flex items-start gap-3 leading-6" htmlFor="consent">
            <input id="consent" type="checkbox" className="mt-1 h-4 w-4 accent-brand" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? 'consent-error' : undefined} {...register('consent', { required: 'Please provide consent before submitting.' })} />
            <span>I agree that the clinic may use these details to respond to this appointment request. <span aria-hidden="true">*</span></span>
          </label>
          <FieldError id="consent-error" message={errors.consent?.message} />
        </div>

        <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" tabIndex={-1} autoComplete="off" {...register('website')} />
        </div>

        {errors.root?.request && <p role="alert" className="border-l-4 border-red-700 bg-red-50 px-4 py-3 text-sm leading-6 text-red-950">{errors.root.request.message}</p>}
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto min-h-[52px] text-base font-semibold justify-center">
          {isSubmitting ? 'Sending request…' : 'Send appointment request'}
        </Button>
      </form>
    </section>
  );
}