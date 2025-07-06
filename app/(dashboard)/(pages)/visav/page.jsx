"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function VisaPage() {
  const [form, setForm] = useState({
    title: "",
    days: "",
    nights: "",
    priceINR: "",
    image: null,
    description: "",
  });
  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchVisas();
  }, [page]);

  const fetchVisas = async () => {
    const res = await fetch(`/api/visa?page=${page}&limit=5`);
    const json = await res.json();
    setVisas(json.data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("days", form.days);
    formData.append("nights", form.nights);
    formData.append("priceINR", form.priceINR);
    formData.append("description", form.description);
    formData.append("image", form.image);

    const res = await fetch("/api/visa", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setForm({
        title: "",
        days: "",
        nights: "",
        priceINR: "",
        image: null,
        description: "",
      });
      fetchVisas();
    } else {
      alert("Upload failed");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Add Visa Package</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Days"
            value={form.days}
            onChange={(e) => setForm({ ...form, days: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Nights"
            value={form.nights}
            onChange={(e) => setForm({ ...form, nights: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <input
          type="number"
          placeholder="Price (INR)"
          value={form.priceINR}
          onChange={(e) => setForm({ ...form, priceINR: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          className="w-full p-2 border rounded"
          required
        />
        <ReactQuill
          theme="snow"
          value={form.description}
          onChange={(value) => setForm({ ...form, description: value })}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Saving..." : "Submit"}
        </button>
      </form>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold">Visa Packages</h2>
      <div className="space-y-4">
        {visas.map((visa) => (
          <div key={visa._id} className="border p-4 rounded shadow">
            <h3 className="font-bold text-lg">{visa.title}</h3>
            <p>
              {visa.days} Days / {visa.nights} Nights
            </p>
            <p>Price: ₹{visa.priceINR}</p>
            <img
              src={visa.image}
              alt={visa.title}
              className="w-64 mt-2 rounded"
            />
            <div dangerouslySetInnerHTML={{ __html: visa.description }} />
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-3 py-1 border"
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border"
        >
          Next
        </button>
      </div>
    </div>
  );
}
