export type userProps = {
    id: string,
    name: string;
    email: string;
    user_type: string;
    avatar?: string;
    bio: string;
    location?: string;
    created_at: Date;
    updated_at: Date;
};

export type verifySecretProps = {
  accountId: string;
  password: string;
};

