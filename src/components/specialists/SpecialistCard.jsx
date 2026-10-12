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
    <article className="flex h-full flex-col border-t-2 border-brand bg-white p-5 shadow-soft">
      <div className="flex items-start gap-4">
        {photo ? (
          <img src={photo} alt={`Portrait of ${name}`} className="h-20 w-20 rounded-full object-cover" />
        ) : (
          <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-brand-soft text-brand-dark" aria-hidden="true">
            <UserRound size={34} aria-hidden="true" />
          </div>
        )}
        <div className="pt-1">
          <p className="mb-1 text-xs font-semibold uppercase text-brand">Placeholder profile</p>
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="mt-1 text-sm text-ink-muted">{title}</p>
        </div>
      </div>
      <p className="mt-4 leading-7 text-ink-muted">{bio}</p>
      <dl className="mt-5 grid gap-4 border-t border-line pt-4">
        <DetailList label="Qualifications" values={qualifications} />
        <DetailList label="Practice areas" values={practiceAreas} />
        <DetailList label="Languages" values={languages} />
        <DetailList label="Availability" values={availability} />
      </dl>
      <Button to="/appointment" variant="secondary" className="mt-6 w-full">Request an Appointment</Button>
    </article>
  );
}