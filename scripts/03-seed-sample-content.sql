-- Seed sample blog posts
INSERT INTO "Blog" (id, title, slug, content, "coverImage", "createdAt", "updatedAt")
VALUES
  (
    gen_random_uuid()::text,
    'Celebrating 71 Years of Cultural Heritage',
    'celebrating-71-years',
    'For seven decades, our cultural festival has been a beacon of tradition, unity, and celebration. This milestone represents not just the passage of time, but the collective effort of generations who have kept our heritage alive. Join us as we reflect on this incredible journey and look forward to the future.',
    '/placeholder.svg?height=400&width=800',
    CURRENT_TIMESTAMP - INTERVAL '30 days',
    CURRENT_TIMESTAMP - INTERVAL '30 days'
  ),
  (
    gen_random_uuid()::text,
    'Traditional Arts and Modern Expression',
    'traditional-arts-modern',
    'The beauty of our festival lies in the seamless blend of traditional arts with contemporary expression. From classical dance performances to modern art installations, we showcase how culture evolves while honoring its roots. Discover the artists and performers who bring this vision to life.',
    '/placeholder.svg?height=400&width=800',
    CURRENT_TIMESTAMP - INTERVAL '15 days',
    CURRENT_TIMESTAMP - INTERVAL '15 days'
  ),
  (
    gen_random_uuid()::text,
    'The Flavors of Heritage: A Culinary Journey',
    'flavors-of-heritage',
    'Food is the heart of our cultural identity. This year''s festival features an expanded culinary section showcasing authentic recipes passed down through generations. From street food favorites to elaborate traditional feasts, experience the tastes that define our heritage.',
    '/placeholder.svg?height=400&width=800',
    CURRENT_TIMESTAMP - INTERVAL '7 days',
    CURRENT_TIMESTAMP - INTERVAL '7 days'
  )
ON CONFLICT (slug) DO NOTHING;

-- Seed sample news
INSERT INTO "News" (id, title, content, "eventDate", "createdAt", "updatedAt")
VALUES
  (
    gen_random_uuid()::text,
    'Festival Dates Announced for 2025',
    'We are excited to announce that the 70th Annual Maghey Sankranti Mela will take place from June 15-22, 2025. Mark your calendars for a week of celebrations, performances, and cultural exhibitions.',
    CURRENT_TIMESTAMP + INTERVAL '180 days',
    CURRENT_TIMESTAMP - INTERVAL '5 days',
    CURRENT_TIMESTAMP - INTERVAL '5 days'
  ),
  (
    gen_random_uuid()::text,
    'Registration Now Open for Cultural Performances',
    'Artists and performers are invited to register for showcase opportunities at this year''s festival. Whether you specialize in dance, music, theater, or visual arts, we want to feature your talent. Early bird registration ends March 31st.',
    CURRENT_TIMESTAMP + INTERVAL '90 days',
    CURRENT_TIMESTAMP - INTERVAL '3 days',
    CURRENT_TIMESTAMP - INTERVAL '3 days'
  ),
  (
    gen_random_uuid()::text,
    'New Exhibitions Wing Opens at Festival Grounds',
    'Thanks to community support, we are unveiling a brand new exhibitions wing that will house year-round cultural displays and artifacts. The space will officially open during the festival and remain accessible throughout the year.',
    CURRENT_TIMESTAMP + INTERVAL '180 days',
    CURRENT_TIMESTAMP - INTERVAL '1 day',
    CURRENT_TIMESTAMP - INTERVAL '1 day'
  )
ON CONFLICT DO NOTHING;
