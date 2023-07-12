export interface IEntry {
  mood: number;
  mood_date: string;
  journal_entry?: string;
  context_people?: string;
  context_location?: string;
  id?: number;
}

export interface IUserEntry extends IEntry {
  user_id: string;
}

export type FormElement = {
  name: string;
  heading: string;
} & (RadioElement | { type: "date" | "text" });

type RadioElement = {
  type: "radio";
  options: string[];
};
export interface IInputElementProps {
  formElement: FormElement;
  value: string;
  state: [any, any];
}

export interface IDetailsModalProps {
  emotion: number;
  onClose: () => void;
  session: any; //supabase session object
}

export type hexValue = `#${string}`;

export interface IBlobSvg {
  id: number;
  viewBox: string;
  xmlns: string;
  colour: "dark" | "light";
  path: {
    fill: hexValue;
    d: string;
    transform: string;
  };
}

export interface EntriesDatabase {
  public: {
    Tables: {
      entries: {
        Row: {
          id: number;
          created_at: Date;
          mood: number;
          mood_date: Date;
          journal_entry: string | null;
          context_people: string | null;
          context_location: string | null;
          user_id: string | null;
        };
        Insert: {
          mood: number;
          mood_date: Date;
          journal_entry?: string;
          context_people?: string;
          context_location?: string;
          user_id?: string;
        };
        Update: {
          mood?: number;
          mood_date?: Date;
          journal_entry?: string;
          context_people?: string;
          context_location?: string;
          user_id?: string;
        };
      };
    };
  };
}

export interface Database {
  auth: {
    Tables: {
      users: {
        Row: {
          id: string;
          aud: string;
          role: string;
          email: string | null;
          confirmed_at: Date | null;
          last_sign_in_at: Date | null;
          app_metadata: object | null;
          user_metadata: object | null;
          created_at: Date;
          updated_at: Date;
        };
        Insert: {
          aud: string;
          role: string;
          email?: string;
          app_metadata?: object;
          user_metadata?: object;
        };
        Update: {
          aud?: string;
          role?: string;
          email?: string;
          confirmed_at?: Date;
          last_sign_in_at?: Date;
          app_metadata?: object;
          user_metadata?: object;
        };
      };
    };
  };
}

export interface ISession {
  access_token: string;
}

export interface EntriesDatabase {
  public: {
    Tables: {
      entries: {
        Row: {
          id: number;
          created_at: Date;
          mood: number;
          mood_date: Date;
          journal_entry: string | null;
          context_people: string | null;
          context_location: string | null;
          user_id: string | null;
        };
        Insert: {
          mood: number;
          mood_date: Date;
          journal_entry?: string;
          context_people?: string;
          context_location?: string;
          user_id?: string;
        };
        Update: {
          mood?: number;
          mood_date?: Date;
          journal_entry?: string;
          context_people?: string;
          context_location?: string;
          user_id?: string;
        };
      };
    };
  };
}

export interface Database {
  auth: {
    Tables: {
      users: {
        Row: {
          id: string;
          aud: string;
          role: string;
          email: string | null;
          confirmed_at: Date | null;
          last_sign_in_at: Date | null;
          app_metadata: object | null;
          user_metadata: object | null;
          created_at: Date;
          updated_at: Date;
        };
        Insert: {
          aud: string;
          role: string;
          email?: string;
          app_metadata?: object;
          user_metadata?: object;
        };
        Update: {
          aud?: string;
          role?: string;
          email?: string;
          confirmed_at?: Date;
          last_sign_in_at?: Date;
          app_metadata?: object;
          user_metadata?: object;
        };
      };
    };
  };
}

export interface ISession {
  access_token: string;
}

export type StreakData = {
  current: number,
  allTime: number
}