-- Tritorc Feedback Database Schema
-- Run this SQL script in your PostgreSQL database

-- Create database (run this separately if needed)
-- CREATE DATABASE tritorc_feedback;

-- Create feedback table
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_company ON feedback (company_name);
CREATE INDEX IF NOT EXISTS idx_feedback_country ON feedback (country);
CREATE INDEX IF NOT EXISTS idx_feedback_email ON feedback (email);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_feedback_updated_at 
    BEFORE UPDATE ON feedback 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (optional)
-- INSERT INTO feedback (
--   email, date, email_id, contact_name, company_name, country,
--   tool_build_quality, packaging, on_time_delivery, after_sales_support,
--   product_usability, recommendation_likelihood, suggestions
-- ) VALUES (
--   'sample@company.com', '2024-01-15', 'secondary@company.com',
--   'John Doe', 'Sample Company', 'United States',
--   8, 9, 7, 8, 9, 8,
--   'Great product quality, fast delivery. Could improve packaging slightly.'
-- );