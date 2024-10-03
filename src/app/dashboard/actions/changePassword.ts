export async function changePassword(formData: FormData) {
  try {
    const { current, confirm, newPassword } = Object.fromEntries(formData);
    const response = await fetch(`/api/auth/change-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ current, newPassword, confirm }),
    });

    const data = (await response.json()) as {
      message: string;
      success: boolean;
    };

    if (!response.ok) {
      throw new Error(data.message || "Failed to change password");
    }

    return { success: true, message: data.message };
  } catch (error) {
    console.log("el error", error);
    return {
      success: false,
      message: "An unknown error occurred",
    };
  }
}
