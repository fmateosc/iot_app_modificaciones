<template>
  <div>
    <div class="row">
      <!-- Lines Chart -->
      <div class="col-md-6">
        <base-block title="Lines" rounded header-bg>
          <div class="py-3">
            <chartjs-line
              :chart-data="chartjsLineBarsRadarData"
              :options="chartjsOptions"
            >
            </chartjs-line>
          </div>
        </base-block>
      </div>
      <!-- Lines Chart -->

      <!-- Bar Chart -->
      <div class="col-md-6">
        <base-block title="Bars" rounded header-bg> 
          <div class="py-3">
              <chartjs-bar 
                :chart-data="chartjsLineBarsRadarData" 
                :options="chartjsOptions">
              </chartjs-bar>
            </div>
        </base-block>
      </div>
      <!-- Bar Chart -->
    </div>

    <div class="row">
      <!-- Vue Easy Pie Chart -->
      <div class="col-md-6">
        <base-block title="Simple" rounded header-bg> 
          <div class="row text-center">
            <div class="col-md-4">
              <vue-easy-pie-chart :percent="pieChartSimple[0]" :line-width="3" :size="100" bar-color="#abe37d" track-color="#eeeeee" scale-color="#dddddd">
                  80<small class="text-muted">/100</small>
                </vue-easy-pie-chart>
            </div>    
          </div>
        </base-block>
      </div>   
    </div>  
  </div>
</template>

<script>
import "@/assets/css/components.css";
import "@/assets/vue-easy-pie-chart/dist/vue-easy-pie-chart.css";

// Chart.js, https://www.chartjs.org
import Chart from "chart.js";

// Components using Vue Chart.js, for more info and examples you can check out https://github.com/apertureless/vue-chartjs
import ChartjsLine from "@/components/Chartjs/Line";
import ChartjsBar from "@/components/Chartjs/Bar";

// Vue Easy Pie Chart, for more info and examples you can check out https://github.com/DotNetAge/vue-easy-pie-chart
import VueEasyPieChart from "vue-easy-pie-chart";

export default {
  middleware: "authenticated",
  components: {
    ChartjsLine,
    ChartjsBar,
    VueEasyPieChart
  },
  data() {
    return {
      chartjsOptions: {
        maintainAspectRatio: false
      },
      chartjsLineBarsRadarData: {
        labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
        datasets: [
          {
            label: "Temperarure (ºC)",
            fill: true,
            backgroundColor: "rgba(220,220,220,.3)",
            borderColor: "rgba(220,220,220,1)",
            pointBackgroundColor: "rgba(220,220,220,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            data: [30, 32, 40, 45, 43, 38, 55]
          },
          {
            label: "Humidity (%)",
            fill: true,
            backgroundColor: "rgba(171, 227, 125, .3)",
            borderColor: "rgba(171, 227, 125, 1)",
            pointBackgroundColor: "rgba(171, 227, 125, 1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(171, 227, 125, 1)",
            data: [50, 40, 60, 70, 65, 60, 70]
          }
        ]
      },
      chartjsPolarPieDonutData: {
        labels: ["Earnings", "Sales", "Tickets"],
        datasets: [
          {
            data: [48, 26, 26],
            backgroundColor: [
              "rgba(171, 227, 125, 1)",
              "rgba(250, 219, 125, 1)",
              "rgba(117, 176, 235, 1)"
            ],
            hoverBackgroundColor: [
              "rgba(171, 227, 125, .75)",
              "rgba(250, 219, 125, .75)",
              "rgba(117, 176, 235, .75)"
            ]
          }
        ]
      },
      pieChartSimple: [80, 45, 25, 80, 45, 25],
      pieChartAvatar: [80, 45, 25, 80, 45, 25]
    };
  },
  methods: {
    randomizeSimplePieCharts() {
      // Randomize Pie Chart values
      this.pieChartSimple.forEach((val, index) => {
        this.$set(
          this.pieChartSimple,
          index,
          Math.floor(Math.random() * 100 + 1)
        );
      });
    },
    randomizeAvatarPieCharts() {
      // Randomize Avatar Pie Chart values
      this.pieChartAvatar.forEach((val, index) => {
        this.$set(
          this.pieChartAvatar,
          index,
          Math.floor(Math.random() * 100 + 1)
        );
      });
    }
  },
  created() {
    // Set default Chart.js configuration
    Chart.defaults.global.defaultFontColor = "#999";
    Chart.defaults.global.defaultFontStyle = "600";
    Chart.defaults.scale.gridLines.color = "rgba(0,0,0,.05)";
    Chart.defaults.scale.gridLines.zeroLineColor = "rgba(0,0,0,.1)";
    Chart.defaults.scale.display = true;
    Chart.defaults.scale.ticks.beginAtZero = true;
    Chart.defaults.global.elements.line.borderWidth = 2;
    Chart.defaults.global.elements.point.radius = 4;
    Chart.defaults.global.elements.point.hoverRadius = 6;
    Chart.defaults.global.tooltips.cornerRadius = 3;
    Chart.defaults.global.legend.labels.boxWidth = 15;
  }
};
</script>
