
import { Database } from '@/integrations/supabase/types';
import { supabase as realSupabase } from '@/integrations/supabase/client';

// Create a function to simulate Supabase responses for development
const createMockResponse = <T>(data: T) => {
  return {
    data,
    error: null,
    status: 200,
    statusText: 'OK',
    count: Array.isArray(data) ? data.length : null
  };
};

// Create a mock client that can be used in development
export const mockSupabase = {
  auth: {
    getUser: async () => createMockResponse({ user: { id: 'mock-user-id', email: 'user@example.com' } }),
    signOut: async () => createMockResponse(null)
  },
  from: (table: string) => ({
    select: (columns?: string) => ({
      eq: (column: string, value: any) => ({
        eq: (column2: string, value2: any) => ({
          limit: (num: number) => ({
            single: async () => createMockResponse(null),
            order: (column: string, { ascending }: { ascending: boolean }) => ({
              limit: (num: number) => createMockResponse([]),
              then: (callback: (data: any) => void) => callback(createMockResponse([])),
            }),
          }),
          order: (column: string, { ascending }: { ascending: boolean }) => ({
            limit: (num: number) => createMockResponse([]),
          }),
        }),
        order: (column: string, { ascending }: { ascending: boolean }) => ({
          limit: (num: number) => createMockResponse([]),
        }),
        limit: (num: number) => createMockResponse([]),
      }),
      order: (column: string, { ascending }: { ascending: boolean }) => ({
        limit: (num: number) => createMockResponse([]),
      }),
      limit: (num: number) => createMockResponse([]),
    }),
    insert: (values: any) => createMockResponse(values),
    update: (values: any) => ({
      eq: (column: string, value: any) => createMockResponse(values),
    }),
    delete: () => ({
      eq: (column: string, value: any) => createMockResponse(null),
    }),
  }),
};

// Always use the real Supabase client for data persistence
export const supabase = realSupabase;

// This is a utility to help work with the project before connecting to Supabase
export const useDevelopmentData = (enabled = true) => {
  return false; // Always use real data from Supabase
};
