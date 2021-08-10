<template>
  <v-card class="mx-auto mt-5" max-width="900">
    <v-data-table
      :headers="columnas"
      :items="users"
      class="elevation-19"
    ></v-data-table>
  </v-card>
</template>

<script>
import { Table, TableColumn } from "element-ui";
import { Select, Option } from "element-ui";

export default {
  middleware: "authenticated",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Option.name]: Option,
    [Select.name]: Select
  },
  data() {
    return {
      columnas: [
        { text: "NAME", value: "name", class: "green accent-2" },
        { text: "EMAIL", value: "email", class: "green accent-2" }
      ],
      users: []
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    //Get Users
    async getUsers() {
      const axiosHeaders = {
        headers: {
          token: this.$store.state.auth.token
        }
      };

      try {
        const res = await this.$axios.get("/users", axiosHeaders);
        console.log(res.data);

        if (res.data.status == "success") {
          this.users = res.data.data;
        }
      } catch (error) {
        this.$notify({
          type: "danger",
          icon: "tim-icons icon-alert-circle-exc",
          message: "Error getting users..."
        });
        console.log(error);
        return;
      }
    }
  }
};
</script>
