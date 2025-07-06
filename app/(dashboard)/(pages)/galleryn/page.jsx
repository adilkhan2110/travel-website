// app/dashboard/gallery/page.jsx
"use client";

import { Button, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import useGalleryStore from "../../../../store/useGalleryStore ";
import AddEditModal from "../../../../components/gallary/addEditmodal";
import ReusableTable from "../../../../components/ReusableTable/ReusableTable";

export default function GalleryPage() {
  const {
    items,
    totalCount,
    page,
    rowsPerPage,
    fetchItems,
    setPage,
    setRowsPerPage,
    deleteItem,
    addItem,
    updateItem,
  } = useGalleryStore();

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    _id: null,
    image: null,
  });
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchItems(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const columns = [
    {
      id: "image",
      label: "Image",
      renderCell: (row) => (
        <img
          src={row?.image}
          alt={row?.title}
          style={{ width: 50, borderRadius: 6 }}
        />
      ),
    },
    { id: "title", label: "Title" },
    { id: "category", label: "Category" },
    { id: "actions", label: "Actions", hasActions: true },
  ];

  const handleOpen = () => {
    setFormData({ title: "", category: "", image: null, _id: null });
    setSelectedItem(null);
    setOpen(true);
  };

  const handleClose = () => {
    setFormData({ title: "", category: "", image: null, _id: null });
    setSelectedItem(null);
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const form = new FormData();
    form.append("title", formData.title);
    form.append("category", formData.category);
    if (formData.image) form.append("image", formData.image);

    if (selectedItem) {
      await updateItem(selectedItem._id, form);
    } else {
      await addItem(form);
    }

    handleClose();
    fetchItems(page, rowsPerPage);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gallery</h2>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add New Item
        </Button>
      </div>

      <ReusableTable
        columns={columns}
        rows={items}
        totalCount={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        renderActions={(row) => (
          <>
            <Button color="error" onClick={() => deleteItem(row._id)}>
              Delete
            </Button>
            <Button
              color="primary"
              onClick={() => {
                setSelectedItem(row);
                setFormData({
                  title: row.title || "",
                  category: row.category || "",
                  image: row.image || "",
                  _id: row._id,
                });
                setOpen(true);
              }}
            >
              Edit
            </Button>
          </>
        )}
      />

      <Modal open={open} onClose={handleClose}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10%",
          }}
        >
          <AddEditModal
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleClose={handleClose}
            isEdit={!!selectedItem}
          />
        </div>
      </Modal>
    </div>
  );
}
