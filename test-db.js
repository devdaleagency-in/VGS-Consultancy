const fs = require('fs');
const path = require('path');

// Manually load .env
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      process.env[key] = value;
    }
  });
}

const mongoose = require('mongoose');

async function testConnection() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('❌ ERROR: MONGODB_URI is missing from your .env file!');
    process.exit(1);
  }

  console.log('--- Database Diagnostic Tool ---');
  console.log('Attempting to connect to MongoDB Atlas...');
  
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000 // 5 second timeout
    });
    console.log('✅ SUCCESS: Connection established successfully!');
    console.log('Database Name:', mongoose.connection.name);
    process.exit(0);
  } catch (err) {
    console.error('❌ CONNECTION FAILED!');
    
    if (err.message.includes('IP address')) {
      console.error('\nCAUSE: Your IP address is not whitelisted in MongoDB Atlas.');
      console.error('FIX: Go to MongoDB Atlas > Network Access > Add Current IP.');
    } else if (err.message.includes('authentication failed')) {
      console.error('\nCAUSE: Wrong Username or Password in your .env file.');
    } else {
      console.error('\nERROR DETAILS:', err.message);
    }
    process.exit(1);
  }
}

testConnection();
