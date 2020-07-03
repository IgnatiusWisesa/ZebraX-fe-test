// import react with hooks
import React, { useEffect, useState } from 'react'
// import react hightcharts dependency
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const FoodConsumption = () => {

  // food consumption state
  const [foodConsumptionData, setFoodConsumptionData] = useState({
    newArrayDate: [],
    newArrayAnimal: [],
    newArrayMeat: []
  })

  // use effect as component did mount
  useEffect(() => {
    // fetch food consumption from public api
    fetch('/api/food-consumption.json')
      .then((res) =>
      // run json from respon object
      res.json()
      )
      .then((res) => {
        // sort the res.data on ascending order by day
        let data = res.data.foodConsumption.daily.sort((a, b) => a.day - b.day)

        // set arrays
        let newArrayDate = []
        let newArrayAnimal = []
        let meatByAnimal = []
        let newArrayMeat = []

        // push newArrayDate
        for(var i = 0; i< data.length-1; i++){
          if(data[i].day !== data[i+1].day || i === data.length-1){
            newArrayDate.push(`${data[i].day}/${data[i].month}`)
          }
        }

        // push newArrayAnimal
        for(i = 0; i< data.length; i++){
          if(newArrayAnimal.indexOf(data[i].animal) < 0){
            // animal not exist yet in the array 
            newArrayAnimal.push(data[i].animal)
          }
        }

        // push empty arrays to meatByAnimal
        for(i = 0; i< newArrayAnimal.length; i++){
          meatByAnimal.push([])
        }

        // group data by animal
        for(i = 0; i< data.length; i++){
          meatByAnimal[newArrayAnimal.indexOf(data[i].animal)].push({
            day: data[i].day,
            animal: data[i].animal,
            meat: data[i].meat
          })
        }

        // push empty arrays to newArrayMeat
        for(i = 0; i< newArrayAnimal.length; i++){
          newArrayMeat.push([])
        }

        // push to newArrayMeat
        for(i = 0; i< meatByAnimal.length; i++){
          console.log(meatByAnimal[i])
          for(var j = 0; j< meatByAnimal[i].length; j++){
            if(j === 0) {
              newArrayMeat[i].push(meatByAnimal[i][j].meat)
            } else if(meatByAnimal[i][j].day === meatByAnimal[i][j-1].day) {
              newArrayMeat[i][newArrayMeat[i].length-1] += meatByAnimal[i][j].meat
            } else {
              newArrayMeat[i].push(meatByAnimal[i][j].meat)
            }
          }
        }

        // set new arrays to state
        setFoodConsumptionData({
          newArrayDate,
          newArrayAnimal,
          newArrayMeat
        })
      })
  }, [])

  console.log(foodConsumptionData)

  const series = () => {
    let series = []
    if (foodConsumptionData.newArrayAnimal.length) {
      for(var i=0; i<foodConsumptionData.newArrayAnimal.length; i++){
        series.push({
          name: foodConsumptionData.newArrayAnimal[i],
          data: foodConsumptionData.newArrayMeat[i]
        })
      }
    }
    return series
  }

  const options = {
    chart: {
      type: 'column',
      scrollablePlotArea: {
        minWidth: 700,
        scrollPositionY: 1,
        opacity: 0.75
    }
    },
    title: {
      text: '<b>Daily Food Consumption</b>'
    },
    xAxis: {
      min: 0,
      max: 13,
      crosshair: true,
      scrollbar: {
        enabled: true
      },
      labels: {
        overflow: 'justify'
      },
      categories: foodConsumptionData.newArrayDate,
      tickLength: 0
    },
    plotOptions: {
      bar: {
          dataLabels: {
              enabled: true
          }
      }
    },
    yAxis: {
      title: {
        text: 'Meat Consumption (kg)'
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          color: ( // theme
            Highcharts.defaultOptions.title.style &&
            Highcharts.defaultOptions.title.style.color
          ) || 'gray'
        }
      }
    },
    legend: {
      align: 'right',
      x: -30,
      verticalAlign: 'top',
      y: 25,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || 'white',
      shadow: false
    },
    tooltip: {
      headerFormat: `
        <b>
          Period: {point.x}
        </b>
        <br/>`
      ,
      pointFormat: `
        <tr style="color:{series.color}">
          <td>
              {series.name}: 
          </td>
          <td>
            {point.y}
          </td>
        </tr>
        <br/>`
      ,
      footerFormat: `
        <b>
          Total: {point.y}
        </b>
      `,
      shared: true,
      valueDecimals: 2
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: false
        }
      }
    },
    series: series()
  }

  return(
    <div>
      <HighchartsReact
        highcharts = {Highcharts}
        options = {options}
      />
    </div>
  )
}

export default FoodConsumption
