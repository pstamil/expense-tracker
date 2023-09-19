import styled from "@emotion/styled";
import { BorderColor, Delete } from "@mui/icons-material";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import React from "react";

function TransactionTable({ records, handleEdit, confirmDelete }) {
  /// STYLED COMPONENTS
  const StyledTable = styled(Table)({
    borderCollapse: "separate",
    borderSpacing: "0 10px",
    borderRadius: "3px",
    position: "relative",
  });

  const TableRowStyle = styled(TableRow)({
    backgroundColor: "#fff",
    textAlign: "start",
    boxShadow: "0px 0px 9px 0px rgba(0, 0, 0, 0.1)",
  });

  const StyledTableCell = styled(TableCell)({
    padding: "6px 30px",
  });

  const StyledTableCellHead = styled(TableCell)({
    backgroundColor: "#3f4c6b",
    color: "white",
    padding: "10px 30px",
  });
  return (
    <TableContainer>
      <StyledTable>
        <TableHead
          color="primary"
          sx={{
            textTransform: "uppercase",
          }}
        >
          <TableRowStyle>
            <StyledTableCellHead>S.no</StyledTableCellHead>
            <StyledTableCellHead>Descrption</StyledTableCellHead>
            <StyledTableCellHead>Category</StyledTableCellHead>
            <StyledTableCellHead>Amount</StyledTableCellHead>
            <StyledTableCellHead>Actions</StyledTableCellHead>
          </TableRowStyle>
        </TableHead>
        <TableBody>
          {records.map((d, index) => (
            <TableRowStyle key={d.id}>
              <StyledTableCell>{index + 1}</StyledTableCell>
              <StyledTableCell>{d.desc}</StyledTableCell>
              <StyledTableCell
                style={{
                  color: d.category === "Profit" ? "#4caf50" : "#c0392b",
                }}
              >
                {d.category} {d.category === "Profit" ? "▲" : "▼"}
              </StyledTableCell>
              <StyledTableCell>
                {d.category === "Profit" ? "+" : "-"} &nbsp;₹
                {d.amount}
              </StyledTableCell>
              <StyledTableCell
                style={{
                  borderRight:
                    d.category === "Profit"
                      ? "5px solid #4caf50"
                      : "5px solid #c0392b",
                  display: "flex",
                  gap: "15px",
                }}
              >
                <Tooltip title="Edit" arrow>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleEdit(d)}
                  >
                    <BorderColor fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete" arrow>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => confirmDelete(d.id)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Tooltip>
              </StyledTableCell>
            </TableRowStyle>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}

export default TransactionTable;
