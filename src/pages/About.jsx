import usePageMetadata from '../hooks/usePageMetadata';

const sections = [
  ['Our mission', 'To make reaching out for support feel easier by welcoming each person with kindness, listening with care, and helping them explore possible next steps.'],
  ['Our vision', 'A community where asking for support is met with understanding, and people can find respectful care that feels right for their circumstances.'],
  ['Care philosophy', 'Every person has their own experiences, needs, and strengths. We aim to treat people with dignity, respect their perspectives, and involve them in conversations about the support they are seeking.'],
  ['Our professional approach', 'We aim to communicate clearly, answer questions, and help people understand the services available at the clinic. We welcome conversations about what to expect and encourage each person to decide on next steps at a pace that feels comfortable.'],
];

export default function About() {
  usePageMetadata('About', 'Learn about MindCare Therapy Centre and our welcoming, professional approach to supporting people.');
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <header className="max-w-3xl border-b border-line pb-9">
        <p className="text-sm font-semibold uppercase text-brand">About the clinic</p>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">About MindCare</h1>
        <p className="mt-5 text-lg leading-8 text-ink-muted">At MindCare, we believe everyone deserves to be met with kindness and respect. Our team aims to make reaching out feel easier and to help each person explore a next step that suits their needs.</p>
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
        <h2 className="text-2xl font-bold">A friendly, professional team</h2>
        <p className="mt-3 max-w-3xl leading-7 text-ink-muted">We are building a team that listens with care, treats every person with respect, and offers thoughtful guidance. Whether you are looking for support for yourself or someone close to you, you are welcome to get in touch. We will do our best to understand your question and help you explore an appropriate next step.</p>
      </section>
    </div>
  );
}