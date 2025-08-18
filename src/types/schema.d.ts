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
  members: CircleMember[];
  ownerId: string;
  createdAt: Date;
};

export type CircleMember = {
  uid: string;
  name: string;
  photoUrl: string;
  weeklyVideoUrl: string;
};
