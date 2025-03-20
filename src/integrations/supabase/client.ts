
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = 'https://pzqsgvyprttfcpyofgnt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6cXNndnlwcnR0ZmNweW9mZ250Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1MDIyNzQsImV4cCI6MjA1ODA3ODI3NH0.Tdl-ViV44yvnpIXEisYsHcWFCnkBd2yvmuIiudGAVlY';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
