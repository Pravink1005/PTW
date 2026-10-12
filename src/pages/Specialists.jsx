import SpecialistCard from '../components/specialists/SpecialistCard';
import usePageMetadata from '../hooks/usePageMetadata';
import { useClinicData } from '../lib/ClinicDataContext';
import { DataNotice } from '../components/ui/DataState';

export default function Specialists() {
  const { specialists, specialistStatus } = useClinicData();
  usePageMetadata('Our Specialists', 'Meet the specialists at MindCare Therapy Centre and view their services and availability.');
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-3xl border-b border-line pb-8">
        <p className="text-sm font-semibold uppercase text-brand">The people behind the care</p>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Our Specialists</h1>
        <p className="mt-4 leading-7 text-ink-muted">
          {specialistStatus.source === 'fallback'
            ? 'Profiles below are editable placeholders. Replace them with details verified and approved by the clinic before publication.'
            : 'Profile information is maintained by the clinic. Contact the clinic to confirm current availability.'}
        </p>
      </header>
      <DataNotice status={specialistStatus} />
      {specialists.length > 0 ? (
        <div className="grid gap-6 py-8 md:grid-cols-2 lg:grid-cols-3">
          {specialists.map((specialist) => <SpecialistCard key={specialist.name} specialist={specialist} />)}
        </div>
      ) : (
        <p className="border-b border-line py-12 text-center text-ink-muted">No specialists are currently listed. Profiles will appear here after the clinic adds and activates them.</p>
      )}
    </div>
  );
}