-- Guest Comment: allow public/anonymous visitors to submit feedback.
-- Run this after migration 20_guest_comment.sql.

begin;

drop policy if exists "Public can insert guest comments"
on public.guest_comments;

create policy "Public can insert guest comments"
on public.guest_comments
for insert
to anon, authenticated
with check (
  rating is not null
  and rating between 1 and 5
  and length(trim(comment)) between 5 and 1000
  and (
    guest_name is null
    or length(trim(guest_name)) <= 100
  )
  and (
    guest_phone is null
    or length(trim(guest_phone)) <= 30
  )
  and is_published = true
  and order_id is null
);

commit;
