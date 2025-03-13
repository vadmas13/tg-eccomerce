export interface TgBotQueryParams {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  photo_url: string;
  auth_date: string;
  //hash: string;
}

export interface TgUser {
  tgUserId: string;
  username: string;
  firstName?: string;
  lastName?: string;
  photoUrl?: string;
  //hash: string;
}
