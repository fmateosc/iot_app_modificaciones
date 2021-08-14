<template>
  <card class="card-stats">
    <div class="row">

      <div class="col">
        <slot>
          <h5 class="card-title text-uppercase text-muted mb-2" v-if="title">{{title}}</h5>
          <span 
            class="h2 font-weight-bold mb-0" 
            v-if="subTitle">{{subTitle}}
          </span>
        </slot>
      </div>
    </div>
  </card>
</template>
<script>
  import Card from './Card.vue';

  export default {
    name: 'stats-card',
    components: {
      Card
    },
    props: {
      type: {
        type: String,
        default: 'primary'
      },
      title: String,
      subTitle: String,
    }
  };
</script>
<style></style>
