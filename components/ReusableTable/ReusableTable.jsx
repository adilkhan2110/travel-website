"use client";

import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  IconButton,
  Skeleton,
} from "@mui/material";
import { useState } from "react";

export default function ReusableTable({
  columns,
  rows,
  renderActions,
  totalCount,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 25],
  loading = false,
}) {
  console.log(`rows`, rows);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.id} sx={{ fontWeight: 600 }}>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
  {loading ? (
    Array.from({ length: rowsPerPage }).map((_, i) => (
      <TableRow key={i}>
        {columns.map((col) => (
          <TableCell key={col.id}>
            <Skeleton variant="text" width="100%" />
          </TableCell>
        ))}
      </TableRow>
    ))
  ) : (
    rows?.map((row) => (
      <TableRow key={row?._id}>
        {columns?.map((col) => (
          <TableCell key={col.id}>
            {col.renderCell
              ? col.renderCell(row)
              : col.hasActions
              ? renderActions?.(row)
              : row?.[col.id] ?? "--"}
          </TableCell>
        ))}
      </TableRow>
    ))
  )}
</TableBody>

        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalCount || rows?.length || 0}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    </Paper>
  );
}
