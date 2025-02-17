import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Slide } from "@mui/material";

const Transition = (props) => <Slide direction="up" {...props} />;

const CustomModal = ({ open, onClose, title, message, onConfirm, confirmText = "Confirm", cancelText = "Cancel" }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="custom-modal-title"
      TransitionComponent={Transition}
      keepMounted
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "20px",
          padding: "20px",
          bgcolor: "#d3fcf9", // Soft luxurious blue background
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
          width: "90%", 
          maxWidth: "400px",
        },
      }}
    >
      <DialogTitle
        id="custom-modal-title"
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          textAlign: "center",
          color: "#333",
        }}
      >
        {title}
      </DialogTitle>

      <DialogContent sx={{ textAlign: "center", color: "#444" }}>
        <Typography variant="body1">{message}</Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", paddingBottom: "10px" }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            bgcolor: "#fff",
            color: "#000",
            borderRadius: "12px",
            padding: "8px 20px",
            "&:hover": { bgcolor: "#e3e3e3" },
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            bgcolor: "#ff4d4d",
            color: "#fff",
            borderRadius: "12px",
            padding: "8px 20px",
            "&:hover": { bgcolor: "#ff1a1a" },
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
