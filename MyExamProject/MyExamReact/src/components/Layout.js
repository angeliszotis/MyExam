import { Container, AppBar, Button, Toolbar, Typography, Link } from '@mui/material'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import useStateContext from '../hooks/useStateContext'

export default function Layout() {

    const { resetContext } = useStateContext()
    const navigate = useNavigate()

    const logout = () => {
        resetContext()
        navigate("/")
    }

    return (
        <>
            <AppBar position="sticky">
                <Toolbar sx={{ width: 1500, m: 'auto' }}>
                    <Typography
                        variant="h4"
                        align="center"
                        sx={{ flexGrow: 2 }}>
                        My Exam
                    </Typography>
                    <Link to="/signup">asdf</Link>
                    <Button onClick={logout}> Logout </Button>
                </Toolbar>

            </AppBar>
            <Container>

            </Container>
            <Outlet />
        </>
    )
}
