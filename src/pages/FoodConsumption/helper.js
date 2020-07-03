// import react hightcharts dependency
import Highcharts from 'highcharts'

export const generateHighchartsData = (foodConsumptionData = {
        newArrayDate: [],
        newArrayAnimal: [],
        newArrayMeat: []
    }) => {

    const options = {
        chart: {
            type: 'column',
            scrollablePlotArea: {
                minWidth: 700,
                scrollPositionY: 1,
                opacity: 0.75
            },
            zoomType: 'xy'
        },
        title: {
            text: '<b>Daily Food Consumption</b>'
        },
        xAxis: {
            min: 0,
            max: 30,
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
            <br/>`,
            pointFormat: `
            <tr style="color:{series.color}">
                <td>
                    {series.name}: 
                </td>
                <td>
                {point.y}
                </td>
            </tr>
            <br/>`,
            footerFormat: `
            <b>
                Total: {point.y}
            </b>`,
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
        series: []
    }

    if (foodConsumptionData.newArrayAnimal.length) {
        let series = []
        for(var i=0; i<foodConsumptionData.newArrayAnimal.length; i++){
            series.push({
                name: foodConsumptionData.newArrayAnimal[i],
                data: foodConsumptionData.newArrayMeat[i]
            })
        }
        options.series = series
    }
  
    return options
}