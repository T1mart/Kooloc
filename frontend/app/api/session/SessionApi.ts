import ApiHttpClient from "../ApiHttpClient";

export type SessionCredentials = {
  userName: string;
  password: string;
};

export type RefreshableJwtToken = {
  // Assuming this is the structure of the token response
  accessToken: string;
  refreshToken?: string; // Optional for some implementations
  // and any other properties you need
};

/**
 * Interface that defines the contract for session refreshing.
 * The 'browser-user-session' library likely defines this.
 * We'll define it here for clarity since we're not using that library.
 */
interface SessionRefresher {
  refresh(webSessionToken: string): Promise<RefreshableJwtToken>;
}

export default class SessionApi implements SessionRefresher {
  constructor(private readonly httpClient: ApiHttpClient) {}

  authenticate(credentials: SessionCredentials): Promise<RefreshableJwtToken> {
    return this.httpClient.restRequest<RefreshableJwtToken>(
      "POST",
      "/session",
      credentials
    );
  }

  register(credentials: SessionCredentials): Promise<RefreshableJwtToken> {
    return this.httpClient.restRequest<RefreshableJwtToken>(
      "POST",
      "/session/register",
      credentials
    );
  }

  refresh(webSessionToken: string): Promise<RefreshableJwtToken> {
    return this.httpClient.restRequest<RefreshableJwtToken>(
      "PUT",
      "/session",
      webSessionToken
    );
  }
}
