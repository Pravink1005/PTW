import usePageMetadata from '../hooks/usePageMetadata';

export default function LegalDraft({ title, description, sections }) {
  usePageMetadata(title, description);
  return (
    <article className="public-page legal-page">
      <div role="note" className="legal-draft-note">
        <strong>Review required:</strong> This is an editable draft. The clinic owner or a qualified legal professional must review and approve it before publication.
      </div>
      <header className="page-intro">
        <h1>{title}</h1>
        <p>{description}</p>
      </header>
      <div>
        {sections.map(({ heading, content }) => (
          <section key={heading} className="legal-section">
            <h2>{heading}</h2>
            <p className="whitespace-pre-line">{content}</p>
          </section>
        ))}
      </div>
    </article>
  );
}