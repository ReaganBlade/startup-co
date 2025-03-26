'use server';

import { appwriteConfig } from '../appwrite/config';
import { createAdminClient, createSessionClient } from '../appwrite';
import { ID, Query } from 'appwrite';
import { userProps, verifySecretProps } from '@/types/user.types';
import { ParseStringify } from '../utils';
import { cookies } from 'next/headers';
import { Pragati_Narrow } from 'next/font/google';

// handleError
export const handleError = async (error: unknown, message: string) => {
  throw new Error(message ? message : error.message);
};

// getUserByEmail
export const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();

  const result = await databases.listDocuments(
    appwriteConfig.database_id,
    appwriteConfig.users_collection_id,
    [Query.equal('email', [email])]
  );

  return result.total > 0 ? result.documents[0] : null;
};

// sendEmailOTP
export const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailToken(ID.unique(), email);

    return session.userId;
  } catch (error) {
    handleError(error, 'Failed to Send OTP');
  }
};

// createAccount
export const createAccount = async ({
  name,
  email,
  user_type,
  avatar,
  bio,
  location,
  created_at,
  updated_at,
}: userProps) => {
  const existingUser = await getUserByEmail(email);

  const accountId = await sendEmailOTP({ email });

  if (!accountId) {
    throw new Error('Failed to create an Account');
  }

  if (!existingUser) {
    const { databases } = await createAdminClient();

    const user = await databases.createDocument(
      appwriteConfig.database_id,
      appwriteConfig.users_collection_id,
      ID.unique(),
      {
        accountId,
        name,
        user_type,
        avatar,
        bio,
        location,
        created_at,
        updated_at,
      }
    );
  }
  return ParseStringify({ accountId });
};

export const verifySecret = async ({
  accountId,
  password,
}: verifySecretProps) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createSession(accountId, password);

    return ParseStringify({ session });
  } catch (error) {
    handleError(error, 'Incorrect Password!!!');
  }
};

// TODO: create getCurrentUser
export const getCurrentUser = async () => {
  const { databases, account } = await createSessionClient();

  const result = await account.get();

  const user = await databases.listDocuments(
    appwriteConfig.database_id,
    appwriteConfig.users_collection_id,
    [
      Query.equal('accountId', result.$id)
    ]
  );

  if (user.total <= 0) return null;

  return ParseStringify({user})
};

// TODO: create signOutUser
export const signOutUser = async () => {
  const { account } = await createSessionClient();

  try {
    await account.deleteSession('current');

    (await cookies()).delete('appwrite-session');
  } catch (error) {
    handleError(error, 'Error Occured while logging out')
  }
}


// TODO: create signInUser
export const singInUser = async (email: string) => {
  try {
    const user = await getUserByEmail(email);
  
    if (user){
      await sendEmailOTP({email});
  
      return ParseStringify({accountId: user.accountId});
    }
  
    return ParseStringify({accountId: null, error: 'User Doesnt Exists'});
  } catch (error) {
    handleError(error, 'Error Occured while signing in...')
  }
}
