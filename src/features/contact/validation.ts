import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Enter a valid email address'),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000),
  /** Honeypot: real visitors never see or fill this field. */
  company: z.string().max(0, 'Spam detected').optional().or(z.literal('')),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export function validateContactForm(data: unknown): {
  success: boolean;
  errors: ContactFormErrors;
} {
  const result = contactFormSchema.safeParse(data);
  if (result.success) return { success: true, errors: {} };

  const errors: ContactFormErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0];
    if (typeof field === 'string' && !(field in errors)) {
      errors[field as keyof ContactFormValues] = issue.message;
    }
  }
  return { success: false, errors };
}
