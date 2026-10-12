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
    <div className="public-page about-page">
      <header className="page-intro">
        <h1>About MindCare</h1>
        <p className="mt-5 text-lg leading-8 text-ink-muted">At MindCare, we believe everyone deserves to be met with kindness and respect. Our team aims to make reaching out feel easier and to help each person explore a next step that suits their needs.</p>
      </header>
      <div className="about-values">
        {sections.map(([heading, text]) => (
          <section key={heading} className="about-value">
            <h2>{heading}</h2>
            <p>{text}</p>
          </section>
        ))}
      </div>
      <section className="about-team">
        <h2>A friendly, professional team</h2>
        <p>We are building a team that listens with care, treats every person with respect, and offers thoughtful guidance. Whether you are looking for support for yourself or someone close to you, you are welcome to get in touch. We will do our best to understand your question and help you explore an appropriate next step.</p>
      </section>
    </div>
  );
}