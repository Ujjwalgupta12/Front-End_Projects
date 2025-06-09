import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Typography
} from "@mui/material";
import { Fragment } from "react";

function TodoDetails({ todoDetails, openDialog, setOpenDialog, setTodoDetails }) {
    return (
        <Fragment>
            <Dialog
                onClose={() => setOpenDialog(false)}
                open={openDialog}
                PaperProps={{
                    sx: { borderRadius: 4, padding: 2, minWidth: 350 }
                }}
            >
                <DialogTitle sx={{ fontWeight: 'bold', fontSize: 20 }}>
                    Todo Details
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        <strong>Task:</strong> {todoDetails?.todo}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Completed:</strong> {todoDetails?.completed ? 'Yes' : 'No'}
                    </Typography>
                    <Typography variant="body2">
                        <strong>User ID:</strong> {todoDetails?.userId}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                            setTodoDetails(null);
                            setOpenDialog(false);
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default TodoDetails;
