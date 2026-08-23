import { describe, expect, it } from 'vitest';
import { validateContactForm } from '../src/features/contact/validation';

const validPayload = {
  name: 'Jane Recruiter',
  email: 'jane@example.com',
  message: 'Loved your portfolio, would like to chat about a role.',
  company: '',
};

describe('validateContactForm', () => {
  it('accepts a well-formed submission', () => {
    expect(validateContactForm(validPayload)).toEqual({ success: true, errors: {} });
  });

  it('rejects a missing name', () => {
    const { success, errors } = validateContactForm({ ...validPayload, name: '' });
    expect(success).toBe(false);
    expect(errors.name).toBeDefined();
  });

  it('rejects an invalid email', () => {
    const { success, errors } = validateContactForm({ ...validPayload, email: 'not-an-email' });
    expect(success).toBe(false);
    expect(errors.email).toBeDefined();
  });

  it('rejects a too-short message', () => {
    const { success, errors } = validateContactForm({ ...validPayload, message: 'hi' });
    expect(success).toBe(false);
    expect(errors.message).toBeDefined();
  });

  it('rejects a submission with the honeypot field filled in', () => {
    const { success } = validateContactForm({ ...validPayload, company: 'a bot filled this' });
    expect(success).toBe(false);
  });
});
