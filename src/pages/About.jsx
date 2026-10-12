import usePageMetadata from '../hooks/usePageMetadata';

const sections = [
  ['Our mission', '[Add the clinic-approved mission statement.]'],
  ['Our vision', '[Add the clinic-approved vision statement.]'],
  ['Care philosophy', '[Describe the clinic’s care philosophy in language approved by the clinic owner.]'],
  ['Our professional approach', '[Describe the clinic’s approach to listening, planning and reviewing care. Confirm all details before publishing.]'],
];

export default function About() {
  usePageMetadata('About', 'Learn about the mission, care philosophy and professional approach of MindCare Therapy Centre.');
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <header className="max-w-3xl border-b border-line pb-9">
        <p className="text-sm font-semibold uppercase text-brand">About the clinic</p>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">About MindCare</h1>
        <p className="mt-5 text-lg leading-8 text-ink-muted">[Add a clinic-approved introduction describing who the clinic serves and the services it provides.]</p>
      </header>
      <div className="grid gap-x-12 sm:grid-cols-2">
        {sections.map(([heading, text]) => (
          <section key={heading} className="border-b border-line py-7">
            <h2 className="text-2xl font-bold">{heading}</h2>
            <p className="mt-3 leading-7 text-ink-muted">{text}</p>
          </section>
        ))}
      </div>
      <section className="border-b border-line py-7">
        <h2 className="text-2xl font-bold">Our team</h2>
        <p className="mt-3 max-w-3xl leading-7 text-ink-muted">[Add an approved team introduction. Include only verified role and service information; do not publish qualifications or registrations until checked.]</p>
      </section>
    </div>
  );
}