import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// create ParseStringify
export const ParseStringify = async (value: unknown) =>
  JSON.parse(JSON.stringify(value));

export const convertFileToURI = async (file: File) => URL.createObjectURL(file);

export const constructFileURI = async (bucketField: string) => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT_URI}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_GENERAL_BUCKET_ID}/files/${bucketField}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
};

export const constructDownloadURI = async (bucketField: string) => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT_URI}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_GENERAL_BUCKET_ID}/files/${bucketField}/download?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
};
