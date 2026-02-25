-- Create a new public storage bucket named 'images'
insert into storage.buckets (id, name, public) 
values ('images', 'images', true);

-- Enable RLS for the storage.objects table
alter table storage.objects enable row level security;

-- Policy: Allow public read access to all images
create policy "Public Read Access"
  on storage.objects for select
  using ( bucket_id = 'images' );

-- Policy: Allow authenticated users to upload images
create policy "Auth Insert Access"
  on storage.objects for insert
  with check ( bucket_id = 'images' and auth.role() = 'authenticated' );

-- Policy: Allow authenticated users to update their images
create policy "Auth Update Access"
  on storage.objects for update
  using ( bucket_id = 'images' and auth.role() = 'authenticated' );

-- Policy: Allow authenticated users to delete images
create policy "Auth Delete Access"
  on storage.objects for delete
  using ( bucket_id = 'images' and auth.role() = 'authenticated' );
