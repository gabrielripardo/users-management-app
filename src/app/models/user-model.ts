import { Profile } from "./profile-model";
import { Timestamped } from "./timestamped.model";

export interface User extends Timestamped {
  id: number;
  profile_id: number;
  name: string;
  email: string;
  password?: string;
  email_verified_at?: string;
  phone: string;
  profile?: Profile;
}


