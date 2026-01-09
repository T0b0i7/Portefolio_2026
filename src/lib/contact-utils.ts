// ContactSection.tsx - Updated version with Formspree integration
// Replace the handleSubmit function in ContactSection.tsx

export const handleSubmitWithFormspree = async (formData: {
  name: string;
  email: string;
  subject: string;
  budget: string;
  message: string;
}) => {
  try {
    const response = await fetch("https://formspree.io/f/xyzqwert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        budget: formData.budget,
        message: formData.message,
        _subject: `Nouveau message de ${formData.name}`,
        _replyto: formData.email,
      }),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'envoi du message");
    }

    return await response.json();
  } catch (error) {
    console.error("Formspree Error:", error);
    throw error;
  }
};
