export const generateHighchartsData = (sickAnimals = []) => {
  const options = {
    title: {
      text: null,
    },
    chart: {
      type: 'pie',
    },
    series: []
  }

  if (sickAnimals.length > 0) {
    options.series = [
      {
        name: 'Count',
        data: sickAnimals.map((sickAnimal) => ({
          name: sickAnimal.name,
          y: sickAnimal.count,
        }))
      }
    ]
  }

  return options
}