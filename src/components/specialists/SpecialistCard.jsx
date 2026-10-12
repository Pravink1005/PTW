import { UserRound } from 'lucide-react';
import Button from '../ui/Button';

function DetailList({ label, values }) {
  return (
    <div>
      <dt className="font-semibold text-ink">{label}</dt>
      <dd className="mt-1 text-sm leading-6 text-ink-muted">{values.join(', ')}</dd>
    </div>
  );
}

export default function SpecialistCard({ specialist }) {
  const { name, title, photo, qualifications, practiceAreas, languages, availability, bio } = specialist;
  return (
    <article className="specialist-card">
      <div className="specialist-card-heading">
        {photo ? (
          <img src={photo} alt={`Portrait of ${name}`} className="specialist-card-photo" />
        ) : (
          <div className="specialist-photo-placeholder" aria-hidden="true">
            <UserRound size={34} aria-hidden="true" />
          </div>
        )}
        <div>
          <p className="specialist-profile-note">Placeholder profile</p>
          <h2>{name}</h2>
          <p>{title}</p>
        </div>
      </div>
      <p className="specialist-bio">{bio}</p>
      <dl className="specialist-details">
        <DetailList label="Qualifications" values={qualifications} />
        <DetailList label="Practice areas" values={practiceAreas} />
        <DetailList label="Languages" values={languages} />
        <DetailList label="Availability" values={availability} />
      </dl>
      <Button to="/appointment" variant="secondary" className="specialist-cta">Request an appointment</Button>
    </article>
  );
}