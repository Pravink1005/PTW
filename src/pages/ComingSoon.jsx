import Button from '../components/ui/Button';
// Temporary stand-in for pages built in later phases.
export default function ComingSoon({ title }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="mt-3 text-ink-muted">This page is being built in the next development phase.</p>
      <Button to="/" variant="secondary" className="mt-6">Back to home</Button>
    </div>
  );
}
