-- PostgreSQL initialization script for Madrasha Management Platform
-- Control DB Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Grant schema creation privileges
GRANT ALL PRIVILEGES ON DATABASE madrasha_control TO madrasha_admin;
