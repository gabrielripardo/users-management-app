import { Timestamped } from "./timestamped.model";

export interface Profile extends Timestamped {
  id: number
  name: string,
  description: string
}


