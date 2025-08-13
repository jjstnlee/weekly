export type User = {
  email: string;
  photoUrl: string;
  displayName: string;
  onboardingCompleted: boolean;
  createdAt: Date;
  circles: string[];
};

export type Circle = {
  id: string;
  name: string;
  photoUrl: string;
  members: string[];
  ownerId: string;
  createdAt: Date;
};
