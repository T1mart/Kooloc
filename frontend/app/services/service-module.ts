import SessionService from "./session/SessionService";

interface Services {
  sessionService: SessionService;
}

export function createApplicationServices(): Services {
  const sessionService = new SessionService();

  return {
    sessionService,
  };
}
