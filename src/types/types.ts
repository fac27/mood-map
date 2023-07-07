export interface IEntry {
  user_id?: string;
  mood: number;
  mood_date: string;
  journal_entry?: string;
  context_people?: string;
  context_location?: string;
  id?: number;
}

export interface IUsersEntry extends IEntry {
  user_id: string;
}

export interface IEntryWithID extends IEntry {
  id: number;
}
