// import react with hooks
import React, { useEffect, useState } from 'react'
// import react hightcharts dependency
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
// import helper
import { generateHighchartsData } from './helper'

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

        console.log(data)

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

        console.log(meatByAnimal)
        // push empty array to newMeatByAnimal
        let newMeatByAnimal = []
        for(i = 0; i< newArrayAnimal.length; i++){
          newMeatByAnimal.push([])
        }

        // create data meat = 0
        for(i = 0; i< meatByAnimal.length; i++){
          for(var j = 0; j<meatByAnimal[i].length; j++){
            if(meatByAnimal[i][j].day === 1){
              newMeatByAnimal[i].push(meatByAnimal[i][j])
            } else {
              // console.log(meatByAnimal[i][j].day - meatByAnimal[i][j-1].day)
              if(meatByAnimal[i][j].day - meatByAnimal[i][j-1].day > 1){
                newMeatByAnimal[i].push({
                    day: meatByAnimal[i][j].day - 1,
                    animal: data[i].animal,
                    meat: 0
                  })
                newMeatByAnimal[i].push(meatByAnimal[i][j])
              } else {
                newMeatByAnimal[i].push(meatByAnimal[i][j])
              }
            }
          }
        }

        // console.log(newMeatByAnimal)
        // meatByAnimal
        meatByAnimal = newMeatByAnimal

        // push empty arrays to newArrayMeat
        for(i = 0; i< newArrayAnimal.length; i++){
          newArrayMeat.push([])
        }

        // push to newArrayMeat
        for(i = 0; i< meatByAnimal.length; i++){
          // console.log(meatByAnimal[i])
          for(j = 0; j< meatByAnimal[i].length; j++){
            if(j === 0) {
              newArrayMeat[i].push(meatByAnimal[i][j].meat)
            } else if(meatByAnimal[i][j].day === meatByAnimal[i][j-1].day) {
              newArrayMeat[i][newArrayMeat[i].length-1] += meatByAnimal[i][j].meat
            } 
            // else if(meatByAnimal[i][j].day === null || meatByAnimal[i][j].day === undefined) {
            //   console.log(meatByAnimal[i][j])
            //   // newArrayMeat[i].push(0)
            // } 
            else {
              newArrayMeat[i].push(meatByAnimal[i][j].meat)
            }
          }
        }

        console.log({
          newArrayDate,
          newArrayAnimal,
          newArrayMeat
        })

        // set new arrays to state
        setFoodConsumptionData({
          newArrayDate,
          newArrayAnimal,
          newArrayMeat
        })
      })
  }, [])

  return(
    <div>
      <HighchartsReact
        highcharts = {Highcharts}
        options = {generateHighchartsData(foodConsumptionData)}
      />
    </div>
  )
}

export default FoodConsumption
