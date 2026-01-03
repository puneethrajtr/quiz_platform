#!/bin/bash

# Database Setup Script for Quiz Platform
# This script creates the database and runs the schema

echo "🚀 Setting up Quiz Platform Database..."

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL first."
    exit 1
fi

# Database name
DB_NAME="quiz_platform"

# Check if database exists
if psql -lqt | cut -d \| -f 1 | grep -qw $DB_NAME; then
    echo "⚠️  Database '$DB_NAME' already exists."
    read -p "Do you want to drop and recreate it? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🗑️  Dropping database..."
        dropdb $DB_NAME
        echo "✅ Database dropped."
    else
        echo "ℹ️  Using existing database."
    fi
fi

# Create database if it doesn't exist
if ! psql -lqt | cut -d \| -f 1 | grep -qw $DB_NAME; then
    echo "📦 Creating database '$DB_NAME'..."
    createdb $DB_NAME
    echo "✅ Database created successfully!"
fi

# Run schema
echo "📋 Running database schema..."
psql -d $DB_NAME -f database/schema.sql

if [ $? -eq 0 ]; then
    echo "✅ Database schema applied successfully!"
    echo ""
    echo "🎉 Database setup complete!"
    echo ""
    echo "Next steps:"
    echo "1. Update server/.env with your database credentials"
    echo "2. Run 'npm run dev' to start the application"
else
    echo "❌ Error applying database schema."
    exit 1
fi
