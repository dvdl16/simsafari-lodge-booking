// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: '/api',
  authUrl: 'https://onsjabulani.auth.eu-west-1.amazoncognito.com/login?client_id=4k3dq5j2nouih7bdp7smnei8lf&response_type=token&scope=email+openid+profile&redirect_uri=https%3A%2F%2Fwww.onsjabulani.co.za/user/login',
  iNatApiUrl: '/api/sightings'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
