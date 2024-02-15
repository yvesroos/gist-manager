//@ts-nocheck
import { setupServer } from "msw/node";
import { mockGists } from "./gistState";

import { http, HttpResponse } from "msw";

export const handlers = [
  http.get(process.env.VITE_GITHUB_GISTS_API_URL, () => {
    return HttpResponse.json(mockGists);
  }),

  http.get(`${process.env.VITE_GITHUB_GISTS_API_URL}/:id`, ({ params }) => {
    const gistId = params.id;
    return HttpResponse.json(
      mockGists.find((gist) => gist.id === Number(gistId))
    );
  }),
  http.patch(
    `${process.env.VITE_GITHUB_GISTS_API_URL}/:id`,
    ({ params, request }) => {
      const gistId = params.id;
      return HttpResponse.json(
        mockGists.find((gist) => gist.id === Number(gistId))
      );
    }
  ),
];

export const server = setupServer(...handlers);
