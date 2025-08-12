export type Category = {
  id: number;
  name: string;
  slug: string;
  status: string;
  createdBy: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  image: string | null;
};

export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
