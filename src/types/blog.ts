export interface BlogForm {
  id?: string;
  email: string;
  fullName: string;
  description: string;
  country: string;
}

export interface CsrfResponse {
  csrfToken: string;
  headerName: string;
  parameterName: string;
}