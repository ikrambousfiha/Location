# Location App Setup Guide

## Overview
This is a car rental application with a React frontend and Flask backend that sends contact and reservation messages to WhatsApp.

## Quick Start

### Option 1: Use the startup script
```bash
cd location
./start.sh
```

### Option 2: Manual setup

#### Backend Setup
```bash
cd location/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp env_example.txt .env
# Edit .env with your WhatsApp credentials
python app.py
```

#### Frontend Setup
```bash
cd location/client
npm install
npm run dev
```

## WhatsApp Configuration

1. **Get WhatsApp Business API Access**:
   - Go to https://business.whatsapp.com/
   - Create a business account
   - Set up WhatsApp Business API

2. **Get Required Credentials**:
   - Access Token
   - Phone Number ID
   - Your WhatsApp number (where messages will be sent)

3. **Update .env file**:
   ```
   WHATSAPP_TOKEN=your_actual_token_here
   WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_here
   WHATSAPP_RECIPIENT_NUMBER=your_whatsapp_number_here
   ```

## Features

- **Contact Form**: Sends messages to WhatsApp when users submit contact inquiries
- **Reservation Form**: Sends detailed reservation requests to WhatsApp
- **Vehicle Models**: Display available vehicles with booking functionality
- **Real-time Feedback**: Success/error messages for form submissions

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/contact` - Contact form submission
- `POST /api/reservation` - Reservation form submission
- `GET /api/vehicles` - Get available vehicles

## Troubleshooting

1. **CORS Issues**: The backend has CORS enabled for all origins
2. **WhatsApp API Errors**: Check your credentials and API permissions
3. **Port Conflicts**: Backend runs on 5000, frontend on 5173

## Testing

1. Start both servers
2. Go to http://localhost:5173
3. Test contact form on /contact page
4. Test reservation form on /models page
5. Check WhatsApp for received messages
