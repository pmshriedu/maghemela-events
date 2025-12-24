-- Seed admin user (password: admin123)
-- Password hash for 'admin123' using bcrypt
INSERT INTO "User" (id, email, password, role, "createdAt")
VALUES (
  gen_random_uuid()::text,
  'admin@melaofficial.com',
  '$2a$10$rOzHqKZlOqYlqJ8KqF5aR.YXqvZN7PqKXvQqP1XQqFQqGqZqJ1QqG',
  'ADMIN',
  CURRENT_TIMESTAMP
)
ON CONFLICT (email) DO NOTHING;
