# Location Backend

Flask backend for the Location car rental application with WhatsApp integration.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up environment variables:
   - Copy `env_example.txt` to `.env`
   - Fill in your WhatsApp Business API credentials

3. Run the application:
```bash
python app.py
```

The server will run on `http://localhost:5000`

## WhatsApp Setup

To send messages to WhatsApp, you need:

1. **WhatsApp Business API Account**: Sign up at https://business.whatsapp.com/
2. **Access Token**: Get your access token from the WhatsApp Business API dashboard
3. **Phone Number ID**: Your WhatsApp Business phone number ID
4. **Recipient Number**: The WhatsApp number where you want to receive messages

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/contact` - Submit contact form
- `POST /api/reservation` - Submit reservation form
- `GET /api/vehicles` - Get available vehicles

## Environment Variables

- `WHATSAPP_TOKEN`: Your WhatsApp Business API access token
- `WHATSAPP_PHONE_NUMBER_ID`: Your WhatsApp Business phone number ID
- `WHATSAPP_RECIPIENT_NUMBER`: The WhatsApp number to receive messages
