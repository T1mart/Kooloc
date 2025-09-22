import ApiHttpClient from "./ApiHttpClient";
import SessionService from "@services/session/SessionService";
import type { AxiosResponse } from "axios";

export default class ApiHttpClientAuthenticated {
  constructor(
    private readonly httpClient: ApiHttpClient,
    private readonly sessionService: SessionService
  ) {}

  private configureHeaders(): { Authorization: string } {
    const sessionToken = this.sessionService.getSessionToken().get();
    if (!sessionToken) {
      // You can throw an error or handle this case as needed
      throw new Error("Session token not available for authenticated request");
    }
    return {
      Authorization: `Bearer ${sessionToken}`,
    };
  }

  rawRequest(
    method: string,
    path: string,
    data?: any
  ): Promise<AxiosResponse<any>> {
    const headers = this.configureHeaders();
    return this.httpClient.rawRequest(method, path, data, headers);
  }

  restRequest<T>(method: string, path: string, data?: any): Promise<T> {
    const headers = this.configureHeaders();
    return this.httpClient.restRequest<T>(method, path, data, headers);
  }
}
