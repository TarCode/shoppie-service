export const NETWORK = {
  ok: {
    code: 200,
    message: 'OK',
    description: 'indicates that the request has succeeded.',
    spec_title: 'RFC7231#6.3.1',
    spec_href: 'https://tools.ietf.org/html/rfc7231#section-6.3.1',
  },
  created: {
    code: 201,
    message: 'Created',
    description:
      'indicates that the request has been fulfilled and has resulted in one or more new resources being created.',
    spec_title: 'RFC7231#6.3.2',
    spec_href: 'https://tools.ietf.org/html/rfc7231#section-6.3.2',
  },

  badRequest: {
    code: 400,
    message: 'Bad Request',
    description:
      'indicates that the server cannot or will not process the request because the received syntax is invalid, nonsensical, or exceeds some limitation on what the server is willing to process.',
    spec_title: 'RFC7231#6.5.1',
    spec_href: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
  },
  unauthorized: {
    code: 401,
    message: 'Unauthorized',
    description:
      'indicates that the request has not been applied because it lacks valid authentication credentials for the target resource.',
    spec_title: 'RFC7235#6.3.1',
    spec_href: 'https://tools.ietf.org/html/rfc7235#section-3.1',
  },
  forbidden: {
    code: 403,
    message: 'Forbidden',
    description: 'indicates that the server understood the request but refuses to authorize it.',
    spec_title: 'RFC7231#6.5.3',
    spec_href: 'https://tools.ietf.org/html/rfc7231#section-6.5.3',
  },
  notFound: {
    code: 404,
    message: 'Not Found',
    description:
      'indicates that the origin server did not find a current representation for the target resource or is not willing to disclose that one exists.',
    spec_title: 'RFC7231#6.5.4',
    spec_href: 'https://tools.ietf.org/html/rfc7231#section-6.5.4',
  },
  internalServerError: {
    code: 500,
    message: 'Internal Server Error',
    description:
      'indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.',
    spec_title: 'RFC7231#6.6.1',
    spec_href: 'https://tools.ietf.org/html/rfc7231#section-6.6.1',
  },
}
