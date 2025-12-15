const BACKEND_URL = "https://portfoliosb-backend.onrender.com";

export const isConfigured = (): boolean => {
  return true; // backend handles configuration
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  const res = await fetch(`${BACKEND_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  if (!res.ok) {
    throw new Error("Backend chat failed");
  }

  const data = await res.json();
  return data.text;
};
