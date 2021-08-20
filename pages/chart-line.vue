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

                  <div class="col-md-3">
                    <img style="height:35px"  
                      src="https://t4.ftcdn.net/jpg/02/37/07/25/240_F_237072570_wycnGLJkFBhNzKkgnhrkqwsr6ON6uhag.jpg">
                    <div class="text-muted mt-3">{{ box1.humMax }}</div>
                  </div>

                  <div class="col-md-3">
                    <img style="height:35px"  
                      src="https://t4.ftcdn.net/jpg/02/37/07/25/240_F_237072570_wycnGLJkFBhNzKkgnhrkqwsr6ON6uhag.jpg">
                    <div class="text-muted mt-3">{{ box1.humMin }}</div>
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
import ChartjsLine from '@/components/Chartjs/Line';
import "@/assets/css/components.css";

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
        temMin: '32 ºC',
        humMax: '70 %',
        humMin: '50 %',
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


