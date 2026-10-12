import usePageMetadata from '../hooks/usePageMetadata';

export default function LegalDraft({ title, description, sections }) {
  usePageMetadata(title, description);
  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div role="note" className="border-l-4 border-amber-500 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
        <strong>Review required:</strong> This is an editable draft. The clinic owner or a qualified legal professional must review and approve it before publication.
      </div>
      <header className="border-b border-line py-8">
        <p className="text-sm font-semibold uppercase text-brand">Editable draft</p>
        <h1 className="mt-2 text-4xl font-bold">{title}</h1>
        <p className="mt-4 leading-7 text-ink-muted">{description}</p>
      </header>
      <div>
        {sections.map(({ heading, content }) => (
          <section key={heading} className="border-b border-line py-6">
            <h2 className="text-2xl font-bold">{heading}</h2>
            <p className="mt-3 whitespace-pre-line leading-7 text-ink-muted">{content}</p>
          </section>
        ))}
      </div>
    </article>
  );
}