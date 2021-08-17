<template>
  <div class="row">
    <div class="col-lg-3 col-6">
      <!-- small box -->
      <div class="small-box bg-info">
        <div class="inner">
          <h3>Systen name</h3>
          <p>{{ brokerInfo.systemName }}</p>
        </div>
        <div class="icon">
          <i class="fas fa-file-alt"></i>
        </div>
      </div>
    </div>

    <div class="col-lg-3 col-6">
      <!-- small box -->
      <div class="small-box bg-success">
        <div class="inner">
          <h3>version</h3>
          <p>{{ brokerInfo.version }}</p>
        </div>
        <div class="icon">
          <i class="fab fa-buffer"></i>
        </div>
      </div>
    </div>

    <div class="col-lg-3 col-6">
      <!-- small box -->
      <div class="small-box bg-warning">
        <div class="inner">
          <h3>Uptime</h3>
          <p>{{ brokerInfo.uptime }}</p>
        </div>
        <div class="icon">
          <i class="fa fa-hourglass" aria-hidden="true"></i>
        </div>
      </div>
    </div>

    <div class="col-lg-3 col-6">
      <!-- small box -->
      <div class="small-box bg-danger">
        <div class="inner">
          <h3>System time</h3>
          <p>{{ brokerInfo.datetime }}</p>
        </div>
        <div class="icon">
          <i class="far fa-clock"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  middleware: ["authenticated", "isAdmin"],
  data() {
    return {
      brokerInfo: {
        version: "",
        systemName: "",
        uptime: "",
        datetime: ""
      }
    };
  },
  mounted() {
    //this.getBrokerInfo();
    this.getBrokerInfo();
  },
  methods: {
    async getBrokerInfo() {
      const axiosHeaders = {
        headers: {
          token: this.$store.state.auth.token
        }
      };

      try {
        const res = await this.$axios.get("/get-broker-info", axiosHeaders);

        if (res.data.status == "success") {
          this.brokerInfo.version = res.data.data.data[0].version;
          this.brokerInfo.systemName = res.data.data.data[0].sysdescr;
          this.brokerInfo.uptime = res.data.data.data[0].uptime;
          this.brokerInfo.datetime = res.data.data.data[0].datetime;

          //Actualizamos la información del broker cada 5 segundos 
          setTimeout(() => {
            this.getBrokerInfo();
          }, 5000);
        }
      } catch (error) {
        this.$notify({
          type: "danger",
          icon: "tim-icons icon-alert-circle-exc",
          message: "Error getting broker info..."
        });
        console.log(error);
        return;
      }
    }
  }
};
</script>

<style>
.small-box > .inner {
  padding: 8px;
}
.bg-info {
  color: #fff !important;
}
.bg-success {
  background-color: #28a745 !important;
}
.bg-warning {
  background-color: #ffc107 !important;
}
.bg-danger {
  background-color: #dc3545 !important;
}
.small-box {
  border-radius: 0.25rem;
  box-shadow: 0 0 1px rgb(0 0 0 / 13%), 0 1px 3px rgb(0 0 0 / 20%);
  display: block;
  margin-bottom: 20px;
  position: relative;
}

.small-box .icon > i.fa,
.small-box .icon > i.fab,
.small-box .icon > i.fad,
.small-box .icon > i.fal,
.small-box .icon > i.far,
.small-box .icon > i.fas,
.small-box .icon > i.ion {
  font-size: 40px;
  top: 20px;
}
.small-box .icon > i {
  font-size: 40px;
  position: absolute;
  right: 15px;
  top: 15px;
  transition: -webkit-transform 0.3s linear;
  transition: transform 0.3s linear;
  transition: transform 0.3s linear, -webkit-transform 0.3s linear;
}
</style>
