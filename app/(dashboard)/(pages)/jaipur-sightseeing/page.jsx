"use client";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Card } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReusableTable from "../../../../components/ReusableTable/ReusableTable";
import useJaipurSightseeing from "../../../../store/useJaipurSightseeing";
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

export default function AddTourPackage() {
  const router = useRouter();
  const {
    items,
    totalCount,
    page,
    rowsPerPage,
    fetchItems,
    setPage,
    setRowsPerPage,
    deleteItem,
     
    isFetchingItems,
  } = useJaipurSightseeing();

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    priceINR: "",
    nights: "",
    days: "",
    image: null,
    _id: null,
  });
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchItems(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const columns = [
    {
      id: "image",
      label: "image",
      renderCell: (row) => (
        <img
          src={row?.image}
          alt={row?.title}
          style={{ width: 50, borderRadius: 6 }}
        />
      ),
    },
    { id: "title", label: "Visa Name" },
     
    { id: "actions", label: "Actions", hasActions: true },
  ];

  const handleOpen = () => {
    router.push("/jaipur-sightseeing/add");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Jaipur Sightseeing </h2>
        <Button variant="contained" className="" onClick={handleOpen}>
          Add Item
        </Button>
      </div>

      <Card className="mb-4">
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
                router.push(`/jaipur-sightseeing/${row._id}`);
              }}
            />
          )}
        />
      </Card>
    </div>
  );
}
