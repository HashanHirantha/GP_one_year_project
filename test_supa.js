const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://rbapldahyrdnthcpfasw.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJiYXBsZGFoeXJkbnRoY3BmYXN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4Mjk4NzUsImV4cCI6MjA4OTQwNTg3NX0.1Z0oJONy5dr5554WJg9jk0aMYWQ6lIoidLD6ClV03vI');
supabase.from('properties').select('*, property_images(image_url, is_primary)').then(r => console.log('Rows:', r.data ? r.data.length : 0, 'Error:', r.error)).catch(console.error);
