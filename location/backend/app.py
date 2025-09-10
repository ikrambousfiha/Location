from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from datetime import datetime
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# WhatsApp configuration
WHATSAPP_TOKEN = os.getenv('WHATSAPP_TOKEN', 'your_whatsapp_token_here')
WHATSAPP_PHONE_NUMBER_ID = os.getenv('WHATSAPP_PHONE_NUMBER_ID', 'your_phone_number_id_here')
WHATSAPP_RECIPIENT_NUMBER = os.getenv('WHATSAPP_RECIPIENT_NUMBER', 'your_whatsapp_number_here')

# WhatsApp API URL
WHATSAPP_API_URL = f"https://graph.facebook.com/v18.0/{WHATSAPP_PHONE_NUMBER_ID}/messages"

def send_whatsapp_message(message):
    """
    Send a message to WhatsApp using the WhatsApp Business API
    """
    headers = {
        'Authorization': f'Bearer {WHATSAPP_TOKEN}',
        'Content-Type': 'application/json'
    }
    
    data = {
        "messaging_product": "whatsapp",
        "to": WHATSAPP_RECIPIENT_NUMBER,
        "type": "text",
        "text": {
            "body": message
        }
    }
    
    try:
        response = requests.post(WHATSAPP_API_URL, headers=headers, json=data)
        response.raise_for_status()
        return {"success": True, "message": "WhatsApp message sent successfully"}
    except requests.exceptions.RequestException as e:
        print(f"Error sending WhatsApp message: {e}")
        return {"success": False, "error": str(e)}

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "Backend is running"})

@app.route('/api/contact', methods=['POST'])
def handle_contact():
    """Handle contact form submissions"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        # Create WhatsApp message
        whatsapp_message = f"""
🚗 NEW CONTACT FORM SUBMISSION 🚗

📝 Name: {data['name']}
📧 Email: {data['email']}
💬 Message: {data['message']}

⏰ Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        """.strip()
        
        # Send to WhatsApp
        whatsapp_result = send_whatsapp_message(whatsapp_message)
        
        if whatsapp_result['success']:
            return jsonify({
                "success": True,
                "message": "Contact form submitted successfully and sent to WhatsApp"
            })
        else:
            return jsonify({
                "success": False,
                "error": "Failed to send WhatsApp message",
                "details": whatsapp_result['error']
            }), 500
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/reservation', methods=['POST'])
def handle_reservation():
    """Handle reservation form submissions"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'phone', 'vehicle', 'pickup_date', 'return_date']
        for field in required_fields:
            if not data.get(field):
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        # Create WhatsApp message
        whatsapp_message = f"""
🚗 NEW RESERVATION REQUEST 🚗

👤 Customer Details:
📝 Name: {data['name']}
📧 Email: {data['email']}
📞 Phone: {data['phone']}

🚙 Vehicle: {data['vehicle']}
📅 Pickup Date: {data['pickup_date']}
📅 Return Date: {data['return_date']}

💬 Additional Notes: {data.get('notes', 'None')}

⏰ Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        """.strip()
        
        # Send to WhatsApp
        whatsapp_result = send_whatsapp_message(whatsapp_message)
        
        if whatsapp_result['success']:
            return jsonify({
                "success": True,
                "message": "Reservation submitted successfully and sent to WhatsApp"
            })
        else:
            return jsonify({
                "success": False,
                "error": "Failed to send WhatsApp message",
                "details": whatsapp_result['error']
            }), 500
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/vehicles', methods=['GET'])
def get_vehicles():
    """Get available vehicles"""
    vehicles = [
        {"id": 1, "name": "Audi A1", "price": "$30-$50", "image": "/images/audi-a1.jpg"},
        {"id": 2, "name": "Golf 6", "price": "$25-$45", "image": "/images/golf-6.jpg"},
        {"id": 3, "name": "Toyota", "price": "$35-$55", "image": "/images/toyota.jpg"},
        {"id": 4, "name": "BMW 320", "price": "$40-$60", "image": "/images/bmw-320.jpg"},
        {"id": 5, "name": "Mercedes", "price": "$45-$65", "image": "/images/mercedes.jpg"},
        {"id": 6, "name": "VW Passat", "price": "$30-$50", "image": "/images/vw-passat.jpg"}
    ]
    return jsonify(vehicles)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
