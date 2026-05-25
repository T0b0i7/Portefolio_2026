-- Create media storage bucket for portfolio files
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  10485760, -- 10MB
  array['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'video/mp4', 'video/webm', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
on conflict (id) do nothing;

-- Allow public access to media bucket
create policy "Public can read media"
on storage.objects for select
using (bucket_id = 'media');

-- Allow admin to upload media
create policy "Admin can upload media"
on storage.objects for insert
with check (bucket_id = 'media');

-- Allow admin to update media
create policy "Admin can update media"
on storage.objects for update
using (bucket_id = 'media');

-- Allow admin to delete media
create policy "Admin can delete media"
on storage.objects for delete
using (bucket_id = 'media');
