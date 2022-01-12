// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiAddress: 'https://localhost:5001/api/',
  appName: 'Artist Album',
  MapKey: '',
  logoUrl: '/assets/images/logo/logo.png',
  useAuthorityServer: false,
  siteUrl: 'https://localhost:4200',

  authorityAddress: 'https://localhost:5001',
  clientId: 'ssoadmin',
  redirectUrl: 'https://localhost:4200/callback',
  scope: 'openid profile offline_access role sso api1',
  responseType: 'id_token token',
  postLogoutRedirectUri: 'https://localhost:4200/logout-callback',
  allowSilentRenew: true,
  silentRedirectUri: 'https://localhost:4200/callback',
  useMenu: true,
  allowLoginRegister: true,
  showForgetPasswordButton: false,
};

