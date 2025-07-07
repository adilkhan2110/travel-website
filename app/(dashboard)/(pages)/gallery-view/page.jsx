"use client";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Card, Modal } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import { useEffect, useState } from "react";
import AddEditModal from "../../../../components/gallary/addEditmodal";
import ReusableTable from "../../../../components/ReusableTable/ReusableTable";
import useGalleryStore from "../../../../store/useGalleryStore ";

function RowActions({ row, onDelete, onEdit }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? `popover-${row._id}` : undefined;

  return (
    <>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Popover
        id={id}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="p-2 flex flex-col">
          <Button
            color="error"
            onClick={() => {
              onDelete(row._id);
              handleClosePopover();
            }}
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              onEdit(row);
              handleClosePopover();
            }}
          >
            Edit
          </Button>
        </div>
      </Popover>
    </>
  );
}

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
    isFetchingItems,
    isAddingItem,
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
        <Button variant="contained" className="" onClick={handleOpen}>
          Add New Item
        </Button>
      </div>

      <Card className="p-4 mb-4">
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
          loading={isFetchingItems}
          renderActions={(row) => (
            <RowActions
              row={row}
              onDelete={deleteItem}
              onEdit={(row) => {
                setSelectedItem(row);
                setFormData({
                  title: row.title || "",
                  category: row.category || "",
                  image: row.image || "",
                  _id: row._id,
                });
                setOpen(true);
              }}
            />
          )}
        />
      </Card>

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
