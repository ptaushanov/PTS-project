import React from 'react'
import { Container, Typography } from "@mui/material"

function NotFound() {
    return (
        <Container sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Typography
                variant="h1"
                textAlign="center"
            >
                404: NotFound
            </Typography>
        </Container>
    )
}

export default NotFound