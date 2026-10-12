import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ClinicDataProvider, useClinicData } from '../src/lib/ClinicDataContext';
import { DataNotice } from '../src/components/ui/DataState';

const client = vi.hoisted(() => ({ from: vi.fn() }));
vi.mock('../src/lib/supabase', () => ({ supabase: client, supabaseConfigError: '' }));

function query(result) {
  const builder = {};
  for (const method of ['select', 'eq', 'order', 'limit']) builder[method] = vi.fn(() => builder);
  builder.maybeSingle = vi.fn(() => result);
  builder.then = (resolve, reject) => result.then(resolve, reject);
  return builder;
}

function StatusHarness() {
  const { services, serviceStatus } = useClinicData();
  return <><DataNotice status={serviceStatus} /><p>{services.map((service) => service.name).join(', ')}</p></>;
}

function deferred() {
  let resolve;
  const promise = new Promise((done) => { resolve = done; });
  return { promise, resolve };
}

function setupResponses(serviceResponse) {
  client.from.mockImplementation((table) => {
    if (table === 'services') return query(serviceResponse);
    if (table === 'specialists') return query(Promise.resolve({ data: [], error: null }));
    return query(Promise.resolve({ data: { clinic_name: 'Test Clinic', opening_hours: [] }, error: null }));
  });
}

describe('clinic data loading states with Supabase', () => {
  beforeEach(() => {
    client.from.mockReset();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('shows loading then renders services after a successful response', async () => {
    const serviceRequest = deferred();
    setupResponses(serviceRequest.promise);
    render(<ClinicDataProvider><StatusHarness /></ClinicDataProvider>);
    expect(await screen.findByRole('status')).toHaveTextContent('Loading clinic information');
    await act(async () => serviceRequest.resolve({
      data: [{ id: 's1', slug: 'test-service', name: 'Test Service', category: 'counselling', blurb: 'Description' }],
      error: null,
    }));
    expect(await screen.findByText(/Test Service/)).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('shows a user-facing error and fallback content after a failed response', async () => {
    setupResponses(Promise.resolve({ data: null, error: new Error('offline') }));
    render(<ClinicDataProvider><StatusHarness /></ClinicDataProvider>);
    expect(await screen.findByRole('alert')).toHaveTextContent('Services could not be loaded');
    expect(screen.getByText(/Child Counselling/)).toBeInTheDocument();
  });
});