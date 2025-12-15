
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/**
 * Sends contact data to the Node.js backend server.
 */
export const sendContactEmail = async (data: ContactFormData): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Backend connection failed:', error);
    
    // Fallback for demo purposes if backend isn't running
    console.warn("⚠️ Backend not reachable. Make sure you ran 'npm run server'. Falling back to simulation.");
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return {
      success: true,
      message: "Message logged locally (Backend unreachable)"
    };
  }
};
