import { useState } from "react";

function Models() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    pickup_date: '',
    return_date: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const vehicles = [
    { name: "Audi A1", price: "$30-$50" },
    { name: "Golf 6", price: "$25-$45" },
    { name: "Toyota", price: "$35-$55" },
    { name: "BMW 320", price: "$40-$60" },
    { name: "Mercedes", price: "$45-$65" },
    { name: "VW Passat", price: "$30-$50" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookRide = (vehicleName) => {
    setSelectedVehicle(vehicleName);
    setFormData(prev => ({
      ...prev,
      vehicle: vehicleName
    }));
    setShowReservationForm(true);
  };

  const handleSubmitReservation = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:5000/api/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: result.message });
        setFormData({
          name: '',
          email: '',
          phone: '',
          vehicle: '',
          pickup_date: '',
          return_date: '',
          notes: ''
        });
        setShowReservationForm(false);
        setSelectedVehicle(null);
      } else {
        setSubmitStatus({ type: 'error', message: result.error || 'Failed to submit reservation' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="models-page" style={{ padding: 24 }}>
        <h1>Vehicle Models</h1>
        <p>Explore our popular models and book a ride.</p>
        
        {submitStatus && (
          <div style={{
            padding: 12,
            marginTop: 16,
            borderRadius: 4,
            backgroundColor: submitStatus.type === 'success' ? '#d4edda' : '#f8d7da',
            color: submitStatus.type === 'success' ? '#155724' : '#721c24',
            border: `1px solid ${submitStatus.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            {submitStatus.message}
          </div>
        )}

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 16 }}>
          {vehicles.map((vehicle) => (
            <div key={vehicle.name} style={{ border: "1px solid #eee", padding: 16, borderRadius: 8, width: 220 }}>
              <h3 style={{ marginTop: 0 }}>{vehicle.name}</h3>
              <p style={{ margin: "8px 0" }}>{vehicle.price} / day</p>
              <button 
                onClick={() => handleBookRide(vehicle.name)}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: 4,
                  cursor: 'pointer'
                }}
              >
                Book Ride
              </button>
            </div>
          ))}
        </div>

        {showReservationForm && (
          <div style={{
            marginTop: 32,
            padding: 24,
            border: '1px solid #ddd',
            borderRadius: 8,
            backgroundColor: '#f9f9f9'
          }}>
            <h2>Reservation Form - {selectedVehicle}</h2>
            <form onSubmit={handleSubmitReservation}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                    style={{ width: '100%', padding: 8, marginTop: 4 }}
                  />
                </div>
                <div>
                  <label>Email *</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                    style={{ width: '100%', padding: 8, marginTop: 4 }}
                  />
                </div>
                <div>
                  <label>Phone Number *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    required
                    style={{ width: '100%', padding: 8, marginTop: 4 }}
                  />
                </div>
                <div>
                  <label>Vehicle *</label>
                  <input 
                    type="text" 
                    name="vehicle"
                    value={formData.vehicle}
                    readOnly
                    style={{ width: '100%', padding: 8, marginTop: 4, backgroundColor: '#f0f0f0' }}
                  />
                </div>
                <div>
                  <label>Pickup Date *</label>
                  <input 
                    type="date" 
                    name="pickup_date"
                    value={formData.pickup_date}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: 8, marginTop: 4 }}
                  />
                </div>
                <div>
                  <label>Return Date *</label>
                  <input 
                    type="date" 
                    name="return_date"
                    value={formData.return_date}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: 8, marginTop: 4 }}
                  />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label>Additional Notes</label>
                <textarea 
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any special requests or additional information..."
                  style={{ width: '100%', padding: 8, marginTop: 4, minHeight: 80 }}
                />
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: 4,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Reservation'}
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setShowReservationForm(false);
                    setSelectedVehicle(null);
                    setSubmitStatus(null);
                  }}
                  style={{
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: 4,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </>
  );
}

export default Models;
