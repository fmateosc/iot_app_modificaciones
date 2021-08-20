<template>
  <div>
    <div class="row">
      <!-- Default Position Primary -->
      <div class="col-md-3">
        <base-block rounded ribbon="13:00 h">
          <div class="text-center py-4 push">
            <p>
              <i class="fa fa-thermometer-quarter fa-3x text-gray"></i>
            </p>
            <h4 class="mb-0">35 ºC</h4>
          </div>
        </base-block>
      </div>
      <!-- END Default Position Primary -->

      <!-- Bottom Right Primary -->
      <div class="col-md-3">
        <base-block rounded ribbon="15:00 h" ribbon-bottom>
          <div class="text-center py-4 push">
            <p>
              <i class="fa fa-thermometer-quarter fa-3x text-gray"></i>
            </p>
            <h4 class="mb-0">40 ºC</h4>
          </div>
        </base-block>
      </div>
      <!-- END Bottom Right Primary -->

      <!-- Bottom Left Primary -->
      <div class="col-md-3">
        <base-block rounded ribbon="15:00 h" ribbon-bottom ribbon-left>
          <div class="text-center py-4 push">
            <p>
              <i class="fa fa-thermometer-quarter fa-3x text-gray"></i>
            </p>
            <h4 class="mb-0">40 ºC</h4>
          </div>
        </base-block>
      </div>
      <!-- END Bottom Left Primary -->

      <!-- Top Left Primary -->
      <div class="col-md-3">
        <base-block rounded ribbon="15:00 h" ribbon-left>
          <div class="text-center py-4 push">
            <p>
              <i class="fa fa-thermometer-quarter fa-3x text-gray"></i>
            </p>
            <h4 class="mb-0">40 ºC</h4>
          </div>
        </base-block>
      </div>
      <!-- END Top Left Primary -->
    </div>
  </div>
</template>

<script>
import "@/assets/css/components.css";

export default {
  middleware: "authenticated",
  components: {},
  data() {
    return {};
  },
  created() {}
};
</script>
