export const appwriteConfig = {
    endpoint_uri: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT_URI!,
    project_id: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
    // Database ID
    database_id: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    
    // Collections ID
    users_collection_id: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION!,
    startups_collection_id: process.env.NEXT_PUBLIC_APPWRITE_STARTUPS_COLLECTION!,
    investments_collections_id: process.env.NEXT_PUBLIC_APPWRITE_INVESTMENTS_COLLECTION!,
    jobs_collections_id: process.env.NEXT_PUBLIC_APPWRITE_JOBS_COLLECTION!,
    job_applications_collections_id: process.env.NEXT_PUBLIC_APPWRITE_JOB_APPLICATIONS_COLLECTION!,

    // BucketID
    general_bucket_id: process.env.NEXT_PUBLIC_APPWRITE_GENERAL_BUCKET_ID!,
    
    // SecretKey
    secret_key: process.env.NEXT_PUBLIC_APPWRITE_SECRET_KEY!,
}