import Button from '../components/ui/Button';
import usePageMetadata from '../hooks/usePageMetadata';

export default function NotFound() {
  usePageMetadata('Page Not Found', 'The requested MindCare Therapy Centre page could not be found. Return to the home page.');
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="mt-3 text-ink-muted">The page you are looking for does not exist or has moved.</p>
      <Button to="/" className="mt-6">Back to home</Button>
    </div>
  );
}
