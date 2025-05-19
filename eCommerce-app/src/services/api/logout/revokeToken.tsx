export async function revokeAllTokens(accessToken: string, refreshToken?: string): Promise<void> {
  const authUrl = import.meta.env.VITE_AUTH_URL;
  const clientId = import.meta.env.VITE_CLIENT_AUTH_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_AUTH_SECRET;
  const credentials = btoa(`${clientId}:${clientSecret}`);

  const revoke = async (token: string, type: 'access_token' | 'refresh_token'): Promise<void> => {
    const response = await fetch(`${authUrl}/oauth/token/revoke`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        token,
        token_type_hint: type,
      }),
    });

    if (!response.ok) {
      throw new Error(`Не удалось отозвать ${type}`);
    }
  };

  await revoke(accessToken, 'access_token');

  if (refreshToken) {
    await revoke(refreshToken, 'refresh_token');
  }
}