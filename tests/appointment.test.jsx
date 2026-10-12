import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Appointment from '../src/pages/Appointment';

const mocks = vi.hoisted(() => ({
  rpc: vi.fn(),
  clinicData: {
    services: [{ id: 'service-1', slug: 'child-counselling', name: 'Child Counselling' }],
    specialists: [],
    settings: { name: 'Test Clinic', phone: '1234567890', email: 'clinic@example.test', appointmentInstructions: '' },
    serviceStatus: { loading: false, source: 'supabase', error: null },
    specialistStatus: { loading: false, source: 'supabase', error: null },
  },
}));

vi.mock('../src/lib/supabase', () => ({
  supabase: { rpc: mocks.rpc },
  supabaseConfigError: '',
}));
vi.mock('../src/lib/ClinicDataContext', () => ({
  useClinicData: () => mocks.clinicData,
}));

function localDateOffset(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
}

function renderAppointment() {
  return render(<MemoryRouter><Appointment /></MemoryRouter>);
}

function fillValidAppointment({ phone = '+91 98765 43210', date = localDateOffset(1) } = {}) {
  fireEvent.change(screen.getByLabelText(/Client name/), { target: { value: 'Mina Patel' } });
  fireEvent.change(screen.getByLabelText(/^Phone/), { target: { value: phone } });
  fireEvent.change(screen.getByLabelText(/^Service/), { target: { value: 'child-counselling' } });
  fireEvent.change(screen.getByLabelText(/^Preferred date/), { target: { value: date } });
  fireEvent.change(screen.getByLabelText(/^Preferred time range/), { target: { value: '09:00-12:00' } });
  fireEvent.click(screen.getByRole('checkbox'));
}

describe('appointment form states', () => {
  beforeEach(() => {
    mocks.rpc.mockReset();
  });

  it('shows errors for required fields after an empty submit', async () => {
    renderAppointment();
    fireEvent.click(screen.getByRole('button', { name: 'Send appointment request' }));
    expect(await screen.findByText('Enter your name.')).toBeInTheDocument();
    expect(screen.getByText('Enter a phone number the clinic can use to contact you.')).toBeInTheDocument();
    expect(screen.getByText('Choose a preferred date.')).toBeInTheDocument();
    expect(screen.getByText('Choose an available service.')).toBeInTheDocument();
    expect(screen.getByText('Choose a preferred time range.')).toBeInTheDocument();
    expect(screen.getByText('Please provide consent before submitting.')).toBeInTheDocument();
  });

  it('rejects malformed phone numbers and past dates in the form', async () => {
    renderAppointment();
    fillValidAppointment({ phone: 'no phone', date: localDateOffset(-1) });
    fireEvent.click(screen.getByRole('button', { name: 'Send appointment request' }));
    expect(await screen.findByText('Enter a phone number using digits and common separators.')).toBeInTheDocument();
    expect(screen.getByText('Choose today or a future date.')).toBeInTheDocument();
    expect(mocks.rpc).not.toHaveBeenCalled();
  });

  it('shows the generated reference after a successful mocked Supabase request', async () => {
    mocks.rpc.mockResolvedValue({ data: 'MC-TEST-123', error: null });
    const now = vi.spyOn(Date, 'now').mockReturnValue(0);
    renderAppointment();
    now.mockReturnValue(3000);
    fillValidAppointment();
    fireEvent.click(screen.getByRole('button', { name: 'Send appointment request' }));
    expect(await screen.findByRole('heading', { name: 'Thank you' })).toBeInTheDocument();
    expect(screen.getByText('MC-TEST-123')).toBeInTheDocument();
    expect(mocks.rpc).toHaveBeenCalledWith('submit_appointment_request', expect.objectContaining({
      p_client_name: 'Mina Patel',
      p_service_id: 'service-1',
      p_consent: true,
    }));
  });

  it('shows a safe error state when Supabase rejects the request', async () => {
    mocks.rpc.mockResolvedValue({ data: null, error: new Error('database unavailable') });
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const now = vi.spyOn(Date, 'now').mockReturnValue(0);
    renderAppointment();
    now.mockReturnValue(3000);
    fillValidAppointment();
    fireEvent.click(screen.getByRole('button', { name: 'Send appointment request' }));
    expect(await screen.findByText(/We could not confirm that your request was received/)).toBeInTheDocument();
    expect(JSON.stringify(consoleError.mock.calls)).not.toContain('Mina Patel');
    expect(JSON.stringify(consoleError.mock.calls)).not.toContain('+91 98765 43210');
  });
});