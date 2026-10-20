import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import App from '../src/App';
import { ClinicDataProvider } from '../src/lib/ClinicDataContext';

vi.mock('../src/lib/supabase', () => ({
  supabase: null,
  supabaseConfigError: 'Supabase is not configured.',
}));

function renderApp(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ClinicDataProvider><App /></ClinicDataProvider>
    </MemoryRouter>,
  );
}

describe('public routes and navigation', () => {
  it('renders the home route and navigates to the service directory', async () => {
    renderApp();
    expect(screen.getByRole('heading', { name: /Compassionate Care for Mind/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Where to start' })).toBeInTheDocument();
    expect(screen.getByText(/Share only the details needed for the clinic to respond/)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Photo: Vitaly Gariev/ })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('link', { name: 'Services' }));
    expect(await screen.findByRole('heading', { name: 'Our services', level: 1 })).toBeInTheDocument();
    await waitFor(() => expect(document.title).toContain('Our Services'));
  });

  it('renders all eleven fallback services and does not include yoga', () => {
    renderApp('/services');
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(11);
    expect(screen.queryByRole('heading', { name: /yoga/i })).not.toBeInTheDocument();
  });

  it.each([
    ['/about', 'About MindCare'],
    ['/specialists', 'Our specialists'],
    ['/appointment', 'Request an appointment'],
    ['/contact', 'Contact'],
    ['/privacy', 'Privacy Policy'],
    ['/terms', 'Terms of Use'],
    ['/services/child-counselling', 'Child Counselling'],
  ])('renders the %s route', async (path, heading) => {
    renderApp(path);
    expect(await screen.findByRole('heading', { name: heading, level: 1 })).toBeInTheDocument();
  });

  it('provides a labeled main navigation and skip link', () => {
    renderApp();
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main');
    expect(screen.getByRole('main')).toBeInTheDocument();
    const quickContact = screen.getByRole('navigation', { name: 'Quick contact' });
    expect(quickContact.querySelector('a[href^="tel:"]')).toHaveAttribute('href', 'tel:+910000000000');
    expect(quickContact.querySelector('a[href^="https://wa.me/"]')).toHaveAttribute('href', expect.stringContaining('https://wa.me/910000000000'));
    expect(quickContact.querySelector('a[href="/appointment"]')).toBeInTheDocument();
  });

  it('publishes LocalBusiness JSON-LD and identifies fallback placeholders', () => {
    renderApp('/');
    const dataScript = document.querySelector('#clinic-structured-data');
    expect(dataScript).toHaveAttribute('type', 'application/ld+json');
    const data = JSON.parse(dataScript.textContent);
    expect(data['@type']).toBe('LocalBusiness');
    expect(data.name).toBe('MindCare Therapy Centre');
    expect(data.additionalProperty.find((item) => item.name === 'Publication status')?.value).toMatch(/placeholder/i);
  });

  it('changes the supportive response when a visitor selects a concern', () => {
    renderApp('/');
    fireEvent.click(screen.getByRole('button', { name: /I am still figuring out what I need/ }));
    expect(screen.getByText(/Browse the services at your own pace/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /I am still figuring out what I need/ })).toHaveAttribute('aria-pressed', 'true');
  });
});