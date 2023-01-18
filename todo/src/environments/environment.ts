// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: 'http://localhost:8080',
  BASE_URL: 'http://localhost:4200',
  HARDCODED_RESOURCE_URL: 'http://localhost:8080/hardcoded',
  TOKEN: 'token',
  AUTHENTICATEDUSER: 'authenticatedUser',
  USERDATA: 'user',
  REMEMBER_ME: 'rememberMe'
};

export const global_var = {
  // APP_TITLE: 'DoLiaoMa',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
