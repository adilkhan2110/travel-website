"use client";

import { useState } from "react";

export default function AddTourPackagePage() {
  const [form, setForm] = useState({
    title: "",
    priceINR: "",
    nights: "",
    days: "",
  });
  const [bannerImage, setBannerImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setBannerImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("priceINR", form.priceINR);
    formData.append("nights", form.nights);
    formData.append("days", form.days);
    formData.append("bannerImage", bannerImage);

    try {
      const res = await fetch("/api/tour-packages", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Package created successfully!");
        setForm({ title: "", priceINR: "", nights: "", days: "" });
        setBannerImage(null);
      } else {
        setMessage(data.error || "Failed to create package");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add Tour Package</h2>

      {message && <p className="mb-4 text-sm text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Package Title"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="priceINR"
          value={form.priceINR}
          onChange={handleChange}
          placeholder="Price (INR)"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="nights"
          value={form.nights}
          onChange={handleChange}
          placeholder="Nights"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="days"
          value={form.days}
          onChange={handleChange}
          placeholder="Days"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
