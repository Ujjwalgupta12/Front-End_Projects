import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";

function TodoItem({ todo, fetchDetailsOfCurrentTodo }) {
    return (
        <Card
            sx={{
                width: "100%",
                height: 200, // 🔒 Fixed card height
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
                "&:hover": {
                    transform: "scale(1.02)",
                }
            }}
        >
            <CardContent
                sx={{
                    overflow: "hidden",
                    flexGrow: 1,
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,      // ✅ Shows max 2 lines
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {todo?.todo}
                </Typography>
            </CardContent>

            <CardActions>
                <Button
                    fullWidth
                    onClick={() => fetchDetailsOfCurrentTodo(todo?.id)}
                    sx={{
                        backgroundColor: "#00bfa5",
                        color: "white",
                        fontWeight: 600,
                        borderRadius: "0 0 16px 16px",
                        '&:hover': {
                            backgroundColor: "#009e88",
                        },
                    }}
                >
                    View Details
                </Button>
            </CardActions>
        </Card>
    );
}

export default TodoItem;
