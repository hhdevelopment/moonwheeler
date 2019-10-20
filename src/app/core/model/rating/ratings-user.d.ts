interface RatingsUser {
  userUid: string;
  userEmail: string;
  [key: string]: RatingUser | string;
}
