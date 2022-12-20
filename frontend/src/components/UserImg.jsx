import { Box } from "@mui/material";


export const UserImg = ({ image, size = "60px" }) => {
    return (
        <Box
        width={size}
        height={size}
        >
            <img
                style={{ objectFit: "cover", borderRadius: "10%" }}
                width={size}
                height={size}
                alt="user"
                src={`http://localhost:3000/public/${image}`}
            />
        </Box>

)}