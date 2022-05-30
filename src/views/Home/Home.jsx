import React from 'react'
import { Button, Container, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import styles from "./Home.module.css"

function Home() {
  return (
    <Container className={styles.container} >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            Главно меню
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Link to="/central-trend">
            <Button fullWidth variant="contained" className={styles.button}>
              Мерки на централна тенденция
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button fullWidth variant="contained" className={styles.button}>
            ...
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button fullWidth variant="contained" className={styles.button}>
            ...
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button fullWidth variant="contained" className={styles.button}>
            ...
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home