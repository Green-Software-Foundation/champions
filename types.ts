type Activity = {
  contributionType: ContributionType;
  linkedGSFProject: string;
  subtype?: string;
  dateFrom: Date;
  dateTo?: Date;
  title: string;
  subtitle?: string;
  description?: string;
  url: string;
  relatedEvent?: string;
  metadata?: {
    title: string;
    image: string;
    domain: string;
  };
};

type Champion = {
  firstName: string;
  lastName: string;
  role: string;
  organization: string;
  languages: string[];
  pronoun: string;
  city: string;
  country: string;
  bio: string;
  image: string;
  url: string | undefined;
  type: string;
  social: {
    twitter?: string;
    linkedin?: string;
    website?: string;
    github?: string;
  };
  notes?: string;
  activities: Activity[];
};


type ContributionType = "speaking" | "writing" | "organizing" | "mentoring" | "hosting" | "gsf contribution" | "gsf project leadership" | "oss contribution";
export type { Champion, Activity, ContributionType };
