import { BorderColor, Delete, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";

function SmallTransactionList({ records, handleEdit, confirmDelete }) {
  return (
    <Box sx={{ marginTop: "10px" }}>
      {records.map((d, index) => (
        <Accordion sx={{ marginBottom: "8px" }} key={d.id}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{
              borderRight:
                d.category === "Profit"
                  ? "5px solid #4caf50"
                  : "5px solid #c0392b",
            }}
          >
            <Typography>
              #{index + 1} {d.desc}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{
              borderRight:
                d.category === "Profit"
                  ? "5px solid #4caf50"
                  : "5px solid #c0392b",
            }}
          >
            <Typography>S.no: {index + 1}</Typography>
            <Typography>Descrption: {d.desc}</Typography>
            <Typography>
              Category: &nbsp;
              <span
                style={{
                  color: d.category === "Profit" ? "#4caf50" : "#c0392b",
                }}
              >
                {d.category} {d.category === "Profit" ? "▲" : "▼"}
              </span>
            </Typography>
            <Typography>
              Amount:&nbsp; {d.category === "Profit" ? "+" : "-"} &nbsp;₹{" "}
              {d.amount}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
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
              &nbsp;&nbsp;
              <Tooltip title="Delete" arrow>
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => confirmDelete(d.id)}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

export default SmallTransactionList;
