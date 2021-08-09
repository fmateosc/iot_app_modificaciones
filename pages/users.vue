<template>
  <div></div>
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
      users: []
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    //Get Templates
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

          console.log(this.users);
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
