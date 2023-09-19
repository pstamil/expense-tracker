import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/Firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  setDesc,
  setCategory,
  setAmount,
  setTempId,
  setIsEdit,
  setCurrentPage,
  selectExpense,
  selectCurrentPage,
  selectConfirm,
  setConfirm,
  selectDeleteId,
  setDeleteId,
  selectIsLoading,
} from "../redux/expenseSlice";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Pagination,
  PaginationItem,
  Stack,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import SmallTransactionList from "../components/Responsive list/SmallTransactionList";
import TransactionTable from "../components/Responsive list/TransactionTable";

function TransactionList() {
  const expenses = useSelector(selectExpense);
  const dispatch = useDispatch();

  const confirm = useSelector(selectConfirm);
  const deleteId = useSelector(selectDeleteId);
  const isLoading = useSelector(selectIsLoading);

  //PAGINATION
  const currentPage = useSelector(selectCurrentPage);

  const recordsPerPage = 7;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const records = expenses.slice(firstIndex, lastIndex);
  const npage = Math.ceil(expenses.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const [isDesktop, setDesktop] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 745) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 745) {
        setDesktop(true);
      } else {
        setDesktop(false);
      }
    };
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  //Delete confirmation
  const confirmDelete = (id) => {
    dispatch(setConfirm(true));
    dispatch(setDeleteId(id));
  };

  //DELETE DATA
  const handleDelete = async () => {
    await deleteDoc(doc(db, "expensedata", deleteId));
    toast.error("Transaction deleted!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    dispatch(setConfirm(false));
    if (records.length === 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  //EDIT
  const handleEdit = (d) => {
    dispatch(setDesc(d.desc));
    dispatch(setCategory(d.category));
    dispatch(setAmount(d.amount));
    dispatch(setTempId(d.id));
    dispatch(setIsEdit(true));
  };

  /// STYLED COMPONENTS

  const LoadingData = styled(Grid)({
    margin: "150px 0 0 0",
    padding: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    fontSize: "20px",
  });

  const Modalstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    minWidth: 250,
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    p: 4,
  };

  return (
    <>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        TRANSACTION HISTORY
      </Typography>
      {isLoading ? (
        <Grid container>
          <LoadingData item xs={12} sm={12} lg={12} md={12}>
            <CircularProgress color="inherit" size={30} />
            Loading data...
          </LoadingData>
        </Grid>
      ) : (
        <>
          {expenses.length ? (
            <>
              {isDesktop ? (
                <TransactionTable
                  records={records}
                  handleEdit={handleEdit}
                  confirmDelete={confirmDelete}
                />
              ) : (
                <SmallTransactionList
                  records={records}
                  handleEdit={handleEdit}
                  confirmDelete={confirmDelete}
                />
              )}

              <Box sx={{ height: "50px" }}></Box>
              {expenses.length > 7 && (
                <Stack
                  spacing={3}
                  sx={{
                    position: "absolute",
                    bottom: "15px",
                  }}
                >
                  <Pagination
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                    color="primary"
                    renderItem={(item) => (
                      <PaginationItem
                        slots={{ previous: ArrowBack, next: ArrowForward }}
                        {...item}
                      />
                    )}
                    page={currentPage}
                    count={numbers.length}
                    onChange={(event, value) => dispatch(setCurrentPage(value))}
                  />
                </Stack>
              )}
            </>
          ) : (
            <Grid container>
              <LoadingData
                item
                xs={12}
                sm={12}
                lg={12}
                md={12}
                sx={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
              >
                Transaction Not Found
              </LoadingData>
            </Grid>
          )}
        </>
      )}
      <ToastContainer />
      <Modal open={confirm} onClose={() => dispatch(setConfirm(false))}>
        <Box sx={Modalstyle}>
          <Typography variant="body1" sx={{ marginBottom: 3 }}>
            Are you sure to delete this transaction ?
          </Typography>
          <Button
            sx={{ "&:hover": { background: "#4caf50", color: "white" } }}
            variant="outlined"
            color="secondary"
            size="small"
            onClick={handleDelete}
          >
            Confirm
          </Button>
          <Button
            sx={{
              marginLeft: 2,
              "&:hover": { background: "#c0392b", color: "white" },
            }}
            variant="outlined"
            color="error"
            size="small"
            onClick={() => dispatch(setConfirm(false))}
          >
            Cancle
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default TransactionList;
