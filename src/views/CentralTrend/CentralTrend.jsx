import React, { useEffect, useState } from 'react'
import db from "../../data/db.json"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import {
    Container,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Grid,
    IconButton
} from '@mui/material';

import { ArrowBack } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function CentralTrend() {
    const [plotData, setPlotData] = useState(null)
    const [averageValue, setAverageValue] = useState(0)
    const [mode, setMode] = useState("Няма мода")

    const navigate = useNavigate()

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Активност в системата',
            },
        },
    };

    const handleGoHome = () => {
        navigate("/")
    }

    const convertToDate = (dateTimeString) => {
        return (
            dayjs(dateTimeString, "D/MM/YY, HH:mm")
                .startOf("day")
                .format("D/MM/YYYY")
        )
    }

    const reduceData = (data) => {
        return data.map(({ Time }) => convertToDate(Time))
    }

    const countDates = (dates) => {
        return dates.reduce((cnt, cur) => {
            cnt[cur] = cnt[cur] + 1 || 1
            return cnt
        }, {})
    }

    const toPlotData = (counts) => {
        return Object
            .entries(counts)
            .map(([key, value]) => ({ x: key, y: value }))
    }

    const getAverageValue = (counts) => {
        const values = Object.values(counts)

        return Math.round((
            values.reduce((sum, val) => sum + val, 0) / values.length
        ) * 100) / 100
    }

    const getMode = (counts) => {
        const frequencies = Object
            .values(counts)
            .reduce((freq, num) => {
                freq[num] = freq[num] + 1 || 1
                return freq
            }, {})

        const maxFreqKey = Object.entries(frequencies)
            .reduce(([key, val], [key1, val1]) => {
                return val1 > val ? [key1, val1] : [key, val]
            }, [0, Number.MIN_VALUE]).at(0)

        if (frequencies[maxFreqKey] === 1) return "Няма мода";

        const modes = Object
            .keys(frequencies)
            .filter(key => frequencies[key] === frequencies[maxFreqKey])

        return modes.join(", ")
    }

    useEffect(() => {
        const { data } = db
        dayjs.extend(customParseFormat)

        const dates = reduceData(data)
        const counts = countDates(dates)
        setPlotData(toPlotData(counts))
        setAverageValue(getAverageValue(counts))
        setMode(getMode(counts))
    }, [])


    const getDataSet = () => {
        return {
            labels: plotData.map(data => data.x),
            datasets: [{
                label: "Изпълнени и качени курсови задачи и проекти",
                data: plotData,
                backgroundColor: 'rgba(255, 99, 132, 0.5)'
            }]
        }
    }

    return (
        <Container maxWidth="md">
            <Grid container sx={{
                marginTop: 4,
                marginBottom: 1,
            }}>
                <Grid item xs={2}>
                    <IconButton
                        color="info"
                        sx={{ border: "2px solid #0288d1" }}
                        onClick={handleGoHome}
                    >
                        <ArrowBack />
                    </IconButton>
                </Grid>
                <Grid item xs={8}>
                    <Typography
                        variant="h4"
                        sx={{ textAlign: "center" }}
                    >
                        Мерки на централна тенденция
                    </Typography>
                </Grid>
            </Grid>
            {plotData && (
                <Bar options={options} data={getDataSet()} />
            )}
            <TableContainer
                component={Paper}
                sx={{
                    maxWidth: 600,
                    display: "block",
                    margin: "20px auto",
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#222" }}>
                            <TableCell
                                sx={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
                            >
                                Мода
                            </TableCell>
                            <TableCell
                                sx={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
                            >
                                Средна стойност
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ textAlign: "center" }}>
                                {mode}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                {averageValue}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default CentralTrend