<template>
  <div>
    <div class="row">
      <div class="col-lg-4">
        <div class="card">
          <div class="card-body">
            <div class="text-center">
              <h5>Potencia motor 1</h5>
              <h3 class="mb-3">
                <i class="mdi mdi-arrow-up-bold-hexagon-outline"></i>
                {{ potenciaMotor1 }}
                <small>%</small>
                <knob-control
                  v-model="potenciaMotor1"
                  class="mt-3"
                  :size="150"
                  primary-color="#4bd396"
                  secondary-color="#eeeeee"
                  text-color="#4bd396"
                ></knob-control>
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card">
          <div class="card-body">
            <div class="text-center">
              <h5>Potencia motor 2</h5>
              <h3 class="mb-3">
                <i class="mdi mdi-arrow-up-bold-hexagon-outline"></i>
                {{ potenciaMotor2 }}
                <small>%</small>
                <knob-control
                  v-model="potenciaMotor2"
                  class="mt-3"
                  :size="150"
                  primary-color="#4bd396"
                  secondary-color="#eeeeee"
                  text-color="#4bd396"
                ></knob-control>
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card">
          <div class="card-body">
            <div class="text-center">
              <h5>Potencia motor 3</h5>
              <h3 class="mb-3">
                <i class="mdi mdi-arrow-up-bold-hexagon-outline"></i>
                {{ potenciaMotor3 }}
                <small>%</small>
                <knob-control
                  v-model="potenciaMotor3"
                  class="mt-3"
                  :size="150"
                  primary-color="#4bd396"
                  secondary-color="#eeeeee"
                  text-color="#4bd396"
                ></knob-control>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-4">
        <base-block tag="a" rounded link-pop content-class="d-flex py-4">
          <div class="flex-grow-1">
            <div class="font-size-sm font-w600 text-uppercase text-muted">
              Temperature
            </div>
            <div class="font-size-h3">
              30º
            </div>
          </div>
          <div class="d-flex ml-2">
            <div class="flex-grow-1 px-1 bg-success-light rounded-lg"></div>
          </div>
        </base-block>
      </div>

      <div class="col-lg-4">
        <base-block tag="a" rounded link-pop content-class="d-flex py-4">
          <div class="flex-grow-1">
            <div class="font-size-sm font-w600 text-uppercase text-muted">
              Temperature
            </div>
            <div class="font-size-h3">
              30º
            </div>
          </div>
          <div class="item item-rounded bg-body">
            <i class="fa fa-thermometer-quarter font-size-h3 text-primary"></i>
          </div>
        </base-block>
      </div>
    </div>    
  </div>
</template>

<script>
import KnobControl from "vue-knob-control";

export default {
  middleware: "authenticated",
  components: {
    KnobControl, 
  },
  data() {
    return {
      potenciaMotor1: 12,
      potenciaMotor2: 50,
      potenciaMotor3: 70
    };
  }
};
</script>

<style>
.block.block-rounded {
  border-radius: 0.25rem;
}

.content p,
.content .push,
.content .block,
.content .items-push > div {
  margin-bottom: 1.875rem;
}

.content p,
.content .push,
.content .block,
.content .items-push > div {
  margin-bottom: 1rem;
}

a.block {
  display: block;
  color: #343a40;
  font-weight: normal;
  transition: opacity 0.15s ease-out, box-shadow 0.15s ease-out,
    -webkit-transform 0.15s ease-out;
  transition: transform 0.15s ease-out, opacity 0.15s ease-out,
    box-shadow 0.15s ease-out;
  transition: transform 0.15s ease-out, opacity 0.15s ease-out,
    box-shadow 0.15s ease-out, -webkit-transform 0.15s ease-out;
}

.block {
  margin-bottom: 1.875rem;
  background-color: #fff !important;
  box-shadow: 0 1px 2px rgb(216 223 227 / 50%), 0 1px 2px rgb(216 223 227 / 50%);
}

a {
  transition: color 0.12s ease-out;
}

a {
  color: #5179d6;
  text-decoration: none;
  background-color: transparent;
}

.block.block-rounded > .block-content:last-child {
  border-bottom-right-radius: 0.2rem;
  border-bottom-left-radius: 0.2rem;
}

.block.block-rounded > .block-content:first-child {
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
}

.block-content {
  transition: opacity 0.25s ease-out;
  width: 100%;
  margin: 0 auto;
  padding: 1.25rem 1.25rem 1px;
  overflow-x: visible;
}

.pb-4,
.py-4 {
  padding-bottom: 1.5rem !important;
}

.pt-4,
.py-4 {
  padding-top: 1.5rem !important;
}

.d-flex {
  display: flex !important;
}

.text-muted {
  color: #6c757d !important;
}

.font-size-sm {
  font-size: 0.875rem !important;
}

.font-w600 {
  font-weight: 600 !important;
}

.text-uppercase {
  letter-spacing: 0.0625rem;
}

.font-size-h3 {
  font-size: 1.5rem;
}

.bg-success-light {
  background-color: #bff0dd !important;
}

.pl-1,
.px-1 {
  padding-left: 0.25rem !important;
}

.pr-1,
.px-1 {
  padding-right: 0.25rem !important;
}

.flex-grow-1 {
  flex-grow: 1 !important;
}

.rounded-lg {
  border-radius: 0.3rem !important;
}

.item.item-rounded {
  border-radius: 0.25rem;
}

.bg-body {
  background-color: #edf0f2 !important;
}

.item {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  transition: opacity 0.25s ease-out, -webkit-transform 0.25s ease-out;
  transition: opacity 0.25s ease-out, transform 0.25s ease-out;
  transition: opacity 0.25s ease-out, transform 0.25s ease-out,
    -webkit-transform 0.25s ease-out;
}

.fa,
.fas {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
}

.fa,
.fab,
.fad,
.fal,
.far,
.fas {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;
}

.font-size-h3 {
  font-size: 1.5rem;
}

.text-primary {
  color: #5179d6 !important;
}
</style>
