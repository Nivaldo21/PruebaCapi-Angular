import Adress from "./adress.model";
import Email from "./email.model";
import Phone from "./phone.model";

export default interface Contact {
  id: number;
  name: string;
  birthday: Date;
  notes?: string;
  website?: string;
  company?: string;
}

export interface ContactDetails {
  id: number;
  name: string;
  birthday: Date;
  notes?: string;
  website?: string;
  company?: string;
  adresses?: Adress[];
  emails?: Email[];
  phones?: Phone[];
}
