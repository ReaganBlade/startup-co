import { appwriteConfig } from './config';
import { Account, Databases, Storage, Avatars, Client } from 'appwrite';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Database } from 'lucide-react';

// create createSessionClient
export const createSessionClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpoint_uri)
    .setProject(appwriteConfig.project_id);

  const session = (await cookies()).get('appwrite-session');

  if (!session || !session.value) redirect('/sign-in');

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },

    get databases() {
      return new Databases(client);
    },
  };
};

// TODO: Create createAdminClient()
export const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpoint_uri)
    .setProject(appwriteConfig.project_id);


    return {
        get account() {
            return new Account(client);
        },

        get databases() {
            return new Databases(client);
        },

        get storage() {
            return new Storage(client);
        },

        get avatars() {
            return new Avatars(client);
        }
    }
};
