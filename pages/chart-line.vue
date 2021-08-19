<template>
  <div>
    <div clas="row">
      <div class="col-md-6">
        <base-block :title="box1.title" rounded header-bg>
          <template #content>
            <div class="block-content p-0">
              <div class="pt-3">
                <chartjs-line 
                  :chart-data="chartjsBox1Data" 
                  :options="chartjsBox1Options" 
                  :styles="chartjsStyles">
                </chartjs-line>
              </div> 

              <div class="block-content">
                <div class="row-footer items-push text-center py-3">
                  <div class="col-md-3">
                    <i class="fas fa-temperature-high fa-2x text-muted"></i>
                    <div class="text-muted mt-3">{{ box1.temMax }}</div>
                  </div>

                  <div class="col-md-3">
                    <i class="fas fa-temperature-low fa-2x text-muted"></i>
                    <div class="text-muted mt-3">{{ box1.temMin }}</div>
                  </div>
                </div>  
              </div>   
            </div>  
          </template>  
        </base-block>      
      </div>
    </div>    
  </div>
</template>

<script>
// Chart.js, https://www.chartjs.org
import Chart from 'chart.js'

// Line Chart component using Vue Chart.js, for more info and examples you can check out https://github.com/apertureless/vue-chartjs
import ChartjsLine from '@/components/Chartjs/Line'

export default {
  middleware: "authenticated",
  components: {
    ChartjsLine
  },
  data () {
    return {
      chartjsStyles: {
        position: 'relative',
        height: '344px'
      },
      box1: {
        title:'condictions Box 1',
        temMax: '50 ºC',
        temMin: '32 ºC'
      },
      chartjsBox1Options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              suggestedMax: 60
            }
          }]
        },
        tooltips: {
          intersect: false,
          callbacks: {
            label: (tooltipItems) => {
              return tooltipItems.yLabel
            }
          }
        }
      },
      chartjsSalesOptions: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              suggestedMax: 100
            }
          }]
        },
        tooltips: {
          intersect: false,
          callbacks: {
            label: (tooltipItems) => {
              return tooltipItems.yLabel + ' Sales'
            }
          }
        }
      },
      chartjsBox1Data: {
        labels: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
        datasets: [
          {
            label: 'Temperature (ºC) - last 6 hours',
            fill: true,
            backgroundColor: 'rgba(132, 94, 247, .3)',
            borderColor: 'transparent',
            pointBackgroundColor: 'rgba(132, 94, 247, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(132, 94, 247, 1)',
            data: [30, 32, 35, 36, 37, 40]
          },
          {
            label: 'Humidity (%) - last 6 hours',
            fill: true,
            backgroundColor: 'rgba(233, 236, 239, 1)',
            borderColor: 'transparent',
            pointBackgroundColor: 'rgba(233, 236, 239, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(233, 236, 239, 1)',
            data: [50, 55, 60, 62, 65, 70]
          }
        ]
      },
      chartjsSalesData: {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [
          {
            label: 'This Year',
            fill: true,
            backgroundColor: 'rgba(34, 184, 207, .3)',
            borderColor: 'transparent',
            pointBackgroundColor: 'rgba(34, 184, 207, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(34, 184, 207, 1)',
            data: [175, 120, 169, 82, 135, 169, 132, 130, 192, 230, 215, 260]
          },
          {
            label: 'Last Year',
            fill: true,
            backgroundColor: 'rgba(233, 236, 239, 1)',
            borderColor: 'transparent',
            pointBackgroundColor: 'rgba(233, 236, 239, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(233, 236, 239, 1)',
            data: [220, 170, 110, 215, 168, 227, 154, 135, 210, 240, 145, 178]
          }
        ]
      },
      latestCustomers: [
        {
          id: 1521,
          avatar: 'avatar11',
          name: 'Adam McCoy',
          orders: 5
        },
        {
          id: 1520,
          avatar: 'avatar1',
          name: 'Betty Kelley',
          orders: 7
        },
        {
          id: 1519,
          avatar: 'avatar5',
          name: 'Jesse Fisher',
          orders: 12
        },
        {
          id: 1518,
          avatar: 'avatar12',
          name: 'Ryan Flores',
          orders: 19
        },
        {
          id: 1517,
          avatar: 'avatar3',
          name: 'Alice Moore',
          orders: 2
        },
        {
          id: 1516,
          avatar: 'avatar13',
          name: 'Scott Young',
          orders: 5
        },
        {
          id: 1515,
          avatar: 'avatar14',
          name: 'Ralph Murray',
          orders: 9
        }
      ],
      latestOrders: [
        {
          id: 7835,
          date: 'today',
          state: 'Pending..',
          stateVariant: 'warning',
          total: '$999,99'
        },
        {
          id: 7834,
          date: 'today',
          state: 'Pending..',
          stateVariant: 'warning',
          total: '$2.299,00'
        },
        {
          id: 7833,
          date: 'today',
          state: 'Success',
          stateVariant: 'success',
          total: '$1200,00'
        },
        {
          id: 7832,
          date: 'today',
          state: 'Cancelled',
          stateVariant: 'danger',
          total: '$399,00'
        },
        {
          id: 7831,
          date: 'today',
          state: 'Success',
          stateVariant: 'success',
          total: '$349,00'
        },
        {
          id: 7830,
          date: 'today',
          state: 'Success',
          stateVariant: 'success',
          total: '$999,00'
        },
        {
          id: 7829,
          date: 'today',
          state: 'Success',
          stateVariant: 'success',
          total: '$39,99'
        },
        {
          id: 7828,
          date: 'today',
          state: 'Success',
          stateVariant: 'success',
          total: '$499,00'
        },
        {
          id: 7827,
          date: 'today',
          state: 'Success',
          stateVariant: 'success',
          total: '$325,00'
        }
      ]
    }
  },
  created () {
    // Set Chart.js configuration
    Chart.defaults.global.defaultFontColor              = '#495057'
    Chart.defaults.global.defaultFontStyle              = '600'
    Chart.defaults.scale.gridLines.color                = 'transparent'
    Chart.defaults.scale.gridLines.zeroLineColor        = 'transparent'
    Chart.defaults.scale.display                        = false
    Chart.defaults.scale.ticks.beginAtZero              = true
    Chart.defaults.global.elements.line.borderWidth     = 0
    Chart.defaults.global.elements.point.radius         = 0
    Chart.defaults.global.elements.point.hoverRadius    = 0
    Chart.defaults.global.tooltips.cornerRadius         = 3
    Chart.defaults.global.legend.labels.boxWidth        = 12
  }
}
</script>

<style>

.text-muted {
    color: #6c757d !important;
}

.p-0 {
    padding: 0 !important;
}

.pt-3, .py-3 {
    padding-top: 1rem !important;
}

.mt-3, .my-3 {
    margin-top: 1rem !important;
}

h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
    margin-bottom: 1.375rem;
    font-weight: 600;
    line-height: 1.25;
    color: #373737;
}

h3, .h3 {
    font-size: 1.5rem;
}

.block.block-rounded {
    border-radius: 0.25rem;
}

.block {
    margin-bottom: 1.875rem;
    background-color: #fff;
    box-shadow: 0 1px 2px rgb(216 223 227 / 50%), 0 1px 2px rgb(216 223 227 / 50%);
}

.block.block-rounded > .block-header, .block.block-rounded > .nav-tabs {
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
}

.block-header-default {
    background-color: #d9dadb !important;
}

.block-title {
    flex: 1 1 auto;
    min-height: 1.75rem;
    margin: 0;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.75rem;
    text-transform: uppercase;
    letter-spacing: 0.0625rem;
}

.block.block-rounded > .block-header, .block.block-rounded > .nav-tabs {
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
}

.block-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.625rem 1.25rem;
    transition: opacity 0.25s ease-out;
}

.block-content {
    transition: opacity 0.25s ease-out;
    width: 100%;
    margin: 0 auto;
    padding: 1.25rem 1.25rem 1px;
    overflow-x: visible;
}

.row-footer {  
    display: flex;
    flex-wrap: wrap;
    margin-right: -14px;
    margin-left: -14px;
}
</style>
