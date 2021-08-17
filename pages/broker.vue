<template>
  <div></div>
</template>

<script>
const axios = require("axios");
export default {
  middleware: ["authenticated", "isAdmin"],
  data() {
    return {
      brokerInfo: {
        version: '',
        systemName: '',
        uptime: '',
        datetime: ''
      }
    };
  },
  mounted() {
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
    },
  } 
};
</script>

<style></style>
