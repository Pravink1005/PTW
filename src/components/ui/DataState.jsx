export function DataNotice({ status }) {
  if (status.loading) {
    return <p role="status" className="my-4 text-sm text-ink-muted">Loading clinic information…</p>;
  }
  if (status.error) {
    return <p role="alert" className="my-4 border-l-4 border-amber-500 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">{status.error}</p>;
  }
  return null;
}