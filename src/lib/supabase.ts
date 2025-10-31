import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pgdglpvfemrjbzjqqkci.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnZGdscHZmZW1yamJ6anFxa2NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3Mzg2OTUsImV4cCI6MjA3NzMxNDY5NX0.mOL9wr10MigRjIfMscPV-9INPtsDN7xcXp0udfhvGf8';

export const supabase = createClient(supabaseUrl, supabaseKey);
