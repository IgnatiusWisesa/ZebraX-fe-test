import React, { useEffect, useState } from 'react'
import { Box, Grid, Paper, Table, TableCell, TableHead, TableRow, TableBody, Typography } from '@material-ui/core'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { generateHighchartsData } from './helper'

const Home = () => {
  const [sickAnimalsData, setSickAnimalsData] = useState([])

  useEffect(() => {
    fetch('/api/home.json')
      .then((res) => res.json())
      .then((res) => {
        setSickAnimalsData(res.data.summary.sickAnimals)
      })
  }, [])

  return (
    <Grid spacing={3} container>
      <Grid xs={8} item>
        <Box component={Paper} height="100%">
          <Box p={3}>
            <Typography variant="h6" gutterBottom>
              Sick Animals
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sickAnimalsData.map((sickAnimal) => (
                  <TableRow key={sickAnimal.id}>
                    <TableCell>{sickAnimal.name}</TableCell>
                    <TableCell>{sickAnimal.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Grid>
      <Grid xs={4} item>
        <Box component={Paper} height="100%">
          <Box p={3}>
            <HighchartsReact
              highcharts={Highcharts}
              options={generateHighchartsData(sickAnimalsData)}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Home
