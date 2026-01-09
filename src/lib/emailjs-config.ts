// Stub sendContactEmail — project uses mailto: now.
// This avoids importing `@emailjs/browser` and fixes TypeScript errors.
export const sendContactEmail = async (formData: {
  name: string;
  email: string;
  subject: string;
  budget: string;
  message: string;
}) => {
  // No-op: the contact form uses the user's mail client via mailto:.
  // Keep the function to avoid breaking imports if any remain.
  return Promise.resolve({ status: "noop", message: "mailto used" });
};
