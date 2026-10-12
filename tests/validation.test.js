import { describe, expect, it } from 'vitest';
import { validateClientName, validatePhone, validatePreferredDate } from '../src/lib/validation';

function localDateOffset(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
}

describe('appointment validation', () => {
  it('requires a client name and phone number', () => {
    expect(validateClientName('')).toBe('Enter your name.');
    expect(validatePhone('')).toBe('Enter a phone number the clinic can use to contact you.');
  });

  it('accepts a valid name and phone format and rejects malformed phone input', () => {
    expect(validateClientName('Mina Patel')).toBe(true);
    expect(validatePhone('+91 (98765) 43210')).toBe(true);
    expect(validatePhone('call me tomorrow')).toMatch(/using digits/);
    expect(validatePhone('12345')).toMatch(/7 to 15 digits/);
  });

  it('requires a date and rejects past calendar dates', () => {
    expect(validatePreferredDate('')).toBe('Choose a preferred date.');
    expect(validatePreferredDate(localDateOffset(-1))).toBe('Choose today or a future date.');
    expect(validatePreferredDate(localDateOffset(1))).toBe(true);
  });
});