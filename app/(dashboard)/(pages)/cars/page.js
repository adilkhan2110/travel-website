"use client";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Card, Modal } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import { useEffect, useState } from "react";
import CarModal from "../../../../components/car-modal/car-modal";
import ReusableTable from "../../../../components/ReusableTable/ReusableTable";
import useCars from "../../../../store/useCars";
// ✅ Actions (Delete / Edit Menu)
function RowActions({ row, onDelete, onEdit }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClosePopover = () => setAnchorEl(null);

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
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
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

export default function CarsPage() {
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
    isAddingItem, // 👈 yeh add karo
    isUpdatingItem, // 👈 yeh add karo
  } = useCars();

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    adults: "",
    driver: "",
    fuel_type: "",
    luggage_space: "",
    price_per_km: "",
    image: null,
    _id: null,
  });
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchItems(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const columns = [
    {
      id: "Image",
      label: "Image",
      renderCell: (row) => (
        <img
          src={row?.image}
          alt={row?.name}
          style={{ width: 60, borderRadius: 6 }}
        />
      ),
    },
    { id: "name", label: "Car Name" },
    { id: "type", label: "Type" },
    { id: "fuel_type", label: "Fuel" },
    { id: "price_per_km", label: "Price/KM" },
    { id: "actions", label: "Actions", hasActions: true },
  ];

  const handleOpen = () => {
    setFormData({
      name: "",
      type: "",
      adults: "",
      driver: "",
      fuel_type: "",
      luggage_space: "",
      price_per_km: "",
      image: null,
      _id: null,
    });
    setSelectedItem(null);
    setOpen(true);
  };

  const handleClose = () => {
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
    form.append("name", formData.name);
    form.append("type", formData.type);
    form.append("adults", formData.adults);
    form.append("driver", formData.driver);
    form.append("fuel_type", formData.fuel_type);
    form.append("luggage_space", formData.luggage_space);
    form.append("price_per_km", formData.price_per_km);
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
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Cars</h2>
        <Button variant="contained" onClick={handleOpen}>
          Add New Car
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
                  name: row.name || "",
                  type: row.type || "",
                  adults: row.capacity?.adults || "",
                  driver: row.capacity?.driver || "",
                  fuel_type: row.fuel_type || "",
                  luggage_space: row.luggage_space || "",
                  price_per_km: row.price_per_km || "",
                  image: row.image || "",
                  _id: row._id,
                });
                setOpen(true);
              }}
            />
          )}
        />
      </Card>

      <CarModal
        open={open}
        handleClose={handleClose}
        onSubmitForm={async (formData) => {
          if (selectedItem) {
            await updateItem(selectedItem._id, formData);
          } else {
            await addItem(formData);
          }
          fetchItems(page, rowsPerPage);
        }}
        defaultValues={selectedItem}
        isLoading={isAddingItem || isUpdatingItem}
        isEdit={!!selectedItem}
      />
    </div>
  );
}
