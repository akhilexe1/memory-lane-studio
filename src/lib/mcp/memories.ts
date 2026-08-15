export type ScrapbookMemory = {
  id: string;
  caption: string;
  date: string;
  description: string;
};

/** Public scrapbook entries shown on the home board. */
export const memories: ScrapbookMemory[] = [
  {
    id: "1",
    caption: "the way you look at me",
    date: "aug '26",
    description: "A couple smiling at each other surrounded by lush green plants",
  },
  {
    id: "2",
    caption: "sun-dru",
    date: "jun '01",
    description: "Cherries, daisies and a film camera on a blush picnic blanket",
  },
  {
    id: "3",
    caption: "the long way home",
    date: "sept '98",
    description: "Two people holding hands walking through a golden field at sunset",
  },
  {
    id: "4",
    caption: "every letter you kept",
    date: "feb '97",
    description: "Handwritten love letters, roses and a heart locket",
  },
  {
    id: "5",
    caption: "us under the trees",
    date: "jul '26",
    description: "A couple standing together under green tree branches",
  },
];
