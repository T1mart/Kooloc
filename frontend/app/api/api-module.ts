import ApiHttpClient from "./ApiHttpClient";
import ApiHttpClientAuthenticated from "./ApiHttpClientAuthenticated";
import SessionApi from "./session/SessionApi";

// SessionService is now created and managed by the factory
import SessionService from "@services/session/SessionService";

interface ApiClients {
  sessionApi: SessionApi;
}

export function createApiClients(): ApiClients {
  const sessionService = new SessionService();

  const apiHttpClient = new ApiHttpClient();
  const apiHttpClientAuthenticated = new ApiHttpClientAuthenticated(
    sessionService,
    apiHttpClient
  );

  return {
    sessionApi: new SessionApi(apiHttpClient),
    //Insert here new api
  };
}
