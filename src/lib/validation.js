export function validateClientName(value) {
  const name = value?.trim() ?? '';
  if (!name) return 'Enter your name.';
  if (name.length < 2) return 'Enter at least 2 characters.';
  if (name.length > 120) return 'Keep your name under 120 characters.';
  return true;
}

export function validatePhone(value) {
  const phone = value?.trim() ?? '';
  if (!phone) return 'Enter a phone number the clinic can use to contact you.';
  if (!/^\+?[0-9][0-9\s().-]*$/.test(phone)) return 'Enter a phone number using digits and common separators.';
  const digitCount = phone.replace(/\D/g, '').length;
  if (digitCount < 7 || digitCount > 15) return 'Enter a phone number with 7 to 15 digits.';
  return true;
}

export function validateOptionalEmail(value) {
  const email = value?.trim() ?? '';
  if (!email) return true;
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return 'Enter a valid email address or leave this field blank.';
  }
  return true;
}

export function validatePreferredDate(value) {
  if (!value) return 'Choose a preferred date.';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'Choose a valid date.';
  const [year, month, day] = value.split('-').map(Number);
  const selected = new Date(year, month - 1, day);
  if (selected.getFullYear() !== year || selected.getMonth() !== month - 1 || selected.getDate() !== day) {
    return 'Choose a valid date.';
  }
  const now = new Date();
  const today = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
  if (value < today) return 'Choose today or a future date.';
  return true;
}