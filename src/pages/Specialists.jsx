import SpecialistCard from '../components/specialists/SpecialistCard';
import usePageMetadata from '../hooks/usePageMetadata';
import { useClinicData } from '../lib/ClinicDataContext';
import { DataNotice } from '../components/ui/DataState';

export default function Specialists() {
  const { specialists, specialistStatus } = useClinicData();
  usePageMetadata('Our Specialists', 'Meet the specialists at MindCare Therapy Centre and view their services and availability.');
  return (
    <div className="public-page specialists-page">
      <header className="page-intro">
        <h1>Our specialists</h1>
        <p>
          {specialistStatus.source === 'fallback'
            ? 'Profiles below are editable placeholders. Replace them with details verified and approved by the clinic before publication.'
            : 'Profile information is maintained by the clinic. Contact the clinic to confirm current availability.'}
        </p>
      </header>
      <DataNotice status={specialistStatus} />
      {specialists.length > 0 ? (
        <div className="specialist-grid">
          {specialists.map((specialist) => <SpecialistCard key={specialist.name} specialist={specialist} />)}
        </div>
      ) : (
        <p className="border-b border-line py-12 text-center text-ink-muted">No specialists are currently listed. Profiles will appear here after the clinic adds and activates them.</p>
      )}
    </div>
  );
}