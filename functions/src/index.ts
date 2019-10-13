import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {UserRecord} from 'firebase-functions/lib/providers/auth';
import {CallableContext} from 'firebase-functions/lib/providers/https';

admin.initializeApp();
export const registerNewUser = functions.auth.user().onCreate((user: UserRecord) => {
  console.log(user.displayName, user.providerData[0].providerId);
  const claims: any = {
    allowCreate: false,
    allowCreateAccount: false,
    allowCreateFromJson: false,
    allowDelete: false,
    allowUpdate: false,
    allowViewAuthor: false,
    admin: false,
    allowEditClaims: false
  };
  if (user.displayName === 'françois Achache' && user.providerData[0].providerId === 'google.com') {
    Object.keys(claims).forEach((key) => {
      claims[key] = true;
    });
  }
  admin.auth().setCustomUserClaims(user.uid, claims).then(() => {
    console.debug('Claims defined', claims);
  }, error => {
    console.error(error);
  });
});

export const getAllUsers = functions.https.onCall((data: any, context: CallableContext) => {
  if (!!context && !!context.auth && !!context.auth.uid && !!context.auth.token && context.auth.token.allowEditClaims) {
    return admin.auth().listUsers(1000).then((userRecords) => {
      return userRecords.users;
    });
  } else {
    return [];
  }
});

export const setClaims = functions.https.onCall((data: {uid: string, claims: any}, context: CallableContext) => {
  console.log(data);
  if (!!context && !!context.auth && !!context.auth.token && context.auth.token.allowEditClaims) {
    admin.auth().setCustomUserClaims(data.uid, data.claims).then(() => {
      console.debug(`Claims updated for '${data.uid}'`, data.claims);
    }, error => {
      console.error(error);
    });
  }
});

