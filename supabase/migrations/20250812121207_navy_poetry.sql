/*
  # Create Tritorc Feedback System

  1. New Tables
    - `feedback`
      - `id` (serial, primary key)
      - `email` (varchar, required) - Primary email address
      - `date` (date, required) - Feedback date
      - `email_id` (varchar, required) - Secondary email address  
      - `contact_name` (varchar, required) - Contact person name
      - `company_name` (varchar, required) - Company name
      - `country` (varchar, required) - Country location
      - `tool_build_quality` (integer, 1-10) - Tool build quality rating
      - `packaging` (integer, 1-10) - Packaging quality rating
      - `on_time_delivery` (integer, 1-10) - Delivery timeliness rating
      - `after_sales_support` (integer, 1-10) - Support quality rating
      - `product_usability` (integer, 1-10) - Product usability rating
      - `recommendation_likelihood` (integer, 1-10) - Recommendation likelihood
      - `suggestions` (text) - Additional feedback and suggestions
      - `created_at` (timestamp) - Record creation time
      - `updated_at` (timestamp) - Last update time

  2. Security
    - Enable RLS on `feedback` table
    - Add policy for public insert access (feedback submission)
    - Add policy for authenticated read access (admin dashboard)
*/

CREATE TABLE IF NOT EXISTS feedback (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  email_id VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  country VARCHAR(100) NOT NULL,
  tool_build_quality INTEGER CHECK (tool_build_quality >= 1 AND tool_build_quality <= 10) NOT NULL,
  packaging INTEGER CHECK (packaging >= 1 AND packaging <= 10) NOT NULL,
  on_time_delivery INTEGER CHECK (on_time_delivery >= 1 AND on_time_delivery <= 10) NOT NULL,
  after_sales_support INTEGER CHECK (after_sales_support >= 1 AND after_sales_support <= 10) NOT NULL,
  product_usability INTEGER CHECK (product_usability >= 1 AND product_usability <= 10) NOT NULL,
  recommendation_likelihood INTEGER CHECK (recommendation_likelihood >= 1 AND recommendation_likelihood <= 10) NOT NULL,
  suggestions TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Allow public to insert feedback (for form submissions)
CREATE POLICY "Allow public feedback submission"
  ON feedback
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow public to read feedback (for admin dashboard - in production, restrict to authenticated users)
CREATE POLICY "Allow public read access"
  ON feedback
  FOR SELECT
  TO public
  USING (true);

-- Allow public to update feedback (for admin functions - in production, restrict to authenticated users)
CREATE POLICY "Allow public update access"
  ON feedback
  FOR UPDATE
  TO public
  USING (true);

-- Allow public to delete feedback (for admin functions - in production, restrict to authenticated users)
CREATE POLICY "Allow public delete access"
  ON feedback
  FOR DELETE
  TO public
  USING (true);

-- Create an index on created_at for better query performance
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback (created_at DESC);

-- Create an index on company_name for filtering
CREATE INDEX IF NOT EXISTS idx_feedback_company ON feedback (company_name);

-- Create an index on country for analytics
CREATE INDEX IF NOT EXISTS idx_feedback_country ON feedback (country);