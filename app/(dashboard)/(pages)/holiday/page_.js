'use client';

import { useState } from 'react';

export default function AddHolidayPage() {
  const [form, setForm] = useState({
    title: '',
    price: '',
    country: '',
    nights: '',
    days: '',
    includes: '',
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('price', form.price);
    formData.append('country', form.country);
    formData.append('nights', form.nights);
    formData.append('days', form.days);
    formData.append('includes', JSON.stringify(form.includes.split(','))); // comma-separated
    formData.append('image', image);

    try {
      const res = await fetch('/api/holidays', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Holiday package added!');
        setForm({ title: '', price: '', country: '', nights: '', days: '', includes: '' });
        setImage(null);
      } else {
        setMessage(data.error || 'Failed to add package');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h2 className="text-xl font-bold mb-4">Add Holiday Package</h2>
      {message && <p className="mb-2 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="country"
          value={form.country}
          onChange={handleChange}
          placeholder="Country"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="days"
          value={form.days}
          onChange={handleChange}
          placeholder="Days"
          type="number"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="nights"
          value={form.nights}
          onChange={handleChange}
          placeholder="Nights"
          type="number"
          className="w-full border p-2 rounded"
          required
        />

        
        <input
          name="includes"
          value={form.includes}
          onChange={handleChange}
          placeholder="Includes (comma-separated)"
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files[0])}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
