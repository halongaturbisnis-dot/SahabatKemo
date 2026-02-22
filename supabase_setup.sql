-- Create admins table
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama TEXT NOT NULL,
  kode TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default Super Admin
INSERT INTO admins (nama, kode, password)
VALUES ('Super Admin', 'Admin', 'KoncoKemo');

-- Enable Row Level Security
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read (for login purposes, though in production you'd use auth.uid())
-- For this simple demo, we'll allow public read access to the admins table
CREATE POLICY "Allow public read access" ON admins FOR SELECT USING (true);
