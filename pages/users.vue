<template>
  <div data-app>
    <!-- Card stats -->
    <div class="row">
      <div class="col-xl-4 col-md-4">
        <stats-card
          title="Total Users"
          type="gradient-red"
          :sub-title="totalUsers"
        >
        </stats-card> 
             
      </div>

      <div class="col-xl-4 col-md-4">
        <stats-card
          title="Total Users actives"
          type="gradient-red"
          :sub-title="totalUsersActives"
        >
        </stats-card>
      </div>

      <div class="col-xl-4 col-md-4">
        <stats-card
          title="Total Users Inactives"
          type="gradient-red"
          :sub-title="totalUsersInactives"
        >
        </stats-card>
      </div>
    </div>

    <v-card>
      <!---USERS TABLE--------------------------------->
      <v-data-table
        class="p-20 elevation-19"
        :headers="headers"
        :items="users"
        :search="search"
        sort-by="name"
        :footer-props="{ 'items-per-page-options': [5, 10, 15, -1] }"
        :options="options"
      >
        <!---ACTIVE OR INACTIVE--------------------------------->
        <template v-slot:[`item.active`]="{ item }">
          <v-chip :color="getColor(item.active)">
            <span v-if="item.active">Active</span>
            <span v-else>Inactive</span>
          </v-chip>
        </template>

        <!---CREATED AT--------------------------------->
        <template v-slot:[`item.created_at`]="{ item }">
          {{ formatDate(item.created_at) }}
        </template>

        <!------ICONS DATATABLE-------------------------------------------->
        <template v-slot:[`item.action`]="{ item }">
          <v-btn
            class="mr-2"
            fab
            dark
            small
            color="#0097a7"
            @click="editUser(item)"
          >
            <v-icon dark>mdi-pencil</v-icon>
          </v-btn>

          <v-btn
            v-if="item.active == 1"
            class="mr-2"
            fab
            dark
            small
            color="#303F9F"
            @click="activateDesactivate(item._id, 1)"
          >
            <v-icon>fas fa-lock</v-icon>
          </v-btn>

          <v-btn
            v-else
            class="mr-2"
            fab
            dark
            small
            color="#D32F2F"
            @click="activateDesactivate(item._id, 0)"
          >
            <v-icon>fas fa-unlock</v-icon>
          </v-btn>
        </template>

        <template v-slot:top>
          <!---TOOL BAR--------------------------------->
          <v-toolbar color="#3f51b5" style="height_50px">
            <v-btn fab color="#00BCD4" bottom right absolute @click="newUser()">
              <v-icon>mdi-plus</v-icon>
            </v-btn>

            <v-toolbar-title class="white--text">USERS</v-toolbar-title>
          </v-toolbar>

          <!---MODAL NEW USER AND EDIT USER-->
          <v-dialog v-model="dialog" persistent max-width="800">
            <template v-slot:activator="{ on }"></template>
            <v-card class="p-b-10">
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="user.name"
                      label="Name"
                      color="white--text"
                      persistent-hint
                      outlined
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="user.email"
                      type="email"
                      label="Email"
                      color="white--text"
                      persistent-hint
                      outlined
                    ></v-text-field>
                  </v-col>

                  <!----EN MODO EDICIÓN DESACTIVAMOS EL CAMPO PASSWORD--->
                  <v-col v-if="editedIndex == 1" cols="12" sm="6" md="4">
                    <v-text-field
                      label="Password"
                      color="white--text"
                      persistent-hint
                      outlined
                      disabled
                    ></v-text-field>
                  </v-col>

                  <!----EN MODO INSERCION DESACTIVAMOS EL CAMPO PASSWORD--->
                  <v-col v-if="editedIndex == -1" cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="user.password"
                      label="Password"
                      color="white--text"
                      persistent-hint
                      outlined
                      disabled
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  color="#455A64"
                  class="ma-2 white--text"
                  @click="cancel()"
                  >Cancel</v-btn
                >
                <v-btn
                  color="#607D8B"
                  class="ma-2 white--text"
                  @click="newUpdate()"
                  >Save</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!---SEARCH--------------------------------->
          <v-text-field
            v-model="search"
            label="Search"
            class="col-4"
          ></v-text-field>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import StatsCard from "@/components/Cards/StatsCard";

import * as moment from "moment";
moment.locale("es");

export default {
  middleware: ["authenticated", "isAdmin"],
  data() {
    return {
      options: {
        itemsPerPage: 5
      },
      headers: [
        { text: "NAME", align: "left", sortable: true, value: "name" },
        { text: "EMAIL", align: "left", sortable: true, value: "email" },
        {
          text: "CREATED AT",
          align: "left",
          sortable: true,
          value: "created_at"
        },
        { text: "ACTIVE", align: "left", sortable: true, value: "active" },
        { text: "ACTIONS", value: "action", sortable: false }
      ],
      users: [],
      user: {
        id: "",
        name: "",
        email: "",
        password: ""
      },
      search: "",
      active: "",
      dialog: false,
      editedIndex: -1,
      totalUsers: 0,
      totalUsersActives: 0,
      totalUsersInactives: 0
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New user" : "Edit user";
    }
  },
  mounted() {
    this.getUsers();
  },
  watch: {
    dialog(val) {
      val || this.cancel();
    }
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

        if (res.data.status == "success") {
          this.users = res.data.data;
          this.totalUsers = res.data.totalUsers;
          this.totalUsersActives = res.data.totalUsersActives;
          this.totalUsersInactives = res.data.totalUsersInactives;
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
    },
    //Save or update user
    newUpdate() {
      //New user
      if (this.editedIndex === -1) {
        this.saveUser();
      }

      //Update user
      if (this.editedIndex === 1) {
        this.updateUser();
      }
    },
    //saveUser(){
    async saveUser() {
      const axiosHeaders = {
        headers: {
          token: this.$store.state.auth.token
        }
      };

      this.$axios
        .post("/register", this.user, axiosHeaders)
        .then(res => {
          //success! - Usuario creado.
          if (res.data.status == "success") {
            this.$notify({
              type: "success",
              icon: "tim-icons icon-check-2",
              message: "Success! User created..."
            });

            this.user.name = "";
            this.user.password = "";
            this.user.email = "";

            this.dialog = false;

            this.getUsers();

            return;
          }
        })
        .catch(e => {
          console.log(e.response.data);

          if (e.response.data.error.errors.email.kind == "unique") {
            this.$notify({
              type: "danger",
              icon: "tim-icons icon-alert-circle-exc",
              message: "User already exists :("
            });

            return;
          } else {
            this.$notify({
              type: "danger",
              icon: "tim-icons icon-alert-circle-exc",
              message: "Error creating user..."
            });

            return;
          }
        });
    },
    //updateUser
    async updateUser() {
      const axiosHeaders = {
        headers: {
          token: this.$store.state.auth.token
        }
      };

      this.$axios
        .put("/update", this.user, axiosHeaders)
        .then(res => {
          //success! - Usuario modificado.
          if (res.data.status == "success") {
            this.$notify({
              type: "success",
              icon: "tim-icons icon-check-2",
              message: "Success! User update..."
            });

            this.user.name = "";
            this.user.password = "";
            this.user.email = "";

            this.dialog = false;

            this.getUsers();

            return;
          }
        })
        .catch(e => {
          console.log(e.response.data);

          if (e.response.data.error.errors.email.kind == "unique") {
            this.$notify({
              type: "danger",
              icon: "tim-icons icon-alert-circle-exc",
              message: "Email already exists :("
            });

            return;
          } else {
            this.$notify({
              type: "danger",
              icon: "tim-icons icon-alert-circle-exc",
              message: "Error updating user..."
            });

            return;
          }
        });
    },
    //Activate-Desactivate
    async activateDesactivate(id, active) {
      const toSend = {
        userId: id,
        userActive: active
      };

      const axiosHeaders = {
        headers: {
          token: this.$store.state.auth.token
        }
      };

      this.$axios
        .put("/activateDesactivate", toSend, axiosHeaders)
        .then(res => {
          //success! - Usuario modificado.
          if (res.data.status == "success") {
            console.log(active);
            var respuesta = "Success! User activated...";

            if (active === 1) {
              respuesta = "Success! User desactivated...";
            }
            this.$notify({
              type: "success",
              icon: "tim-icons icon-check-2",
              message: respuesta
            });

            this.getUsers();

            return;
          }
        })
        .catch(e => {
          console.log(e.response.data);
        });
    },
    //Edit user
    editUser(user) {
      this.editedIndex = 1;

      this.user.id = user._id;
      this.user.name = user.name;
      this.user.email = user.email;
      this.dialog = true;
    },
    //New user
    newUser() {
      this.user.name = "";
      this.user.email = "";
      this.user.email = "";

      this.generatePasswordRand();

      this.dialog = true;
    },
    getColor(active) {
      if (active == true) {
        return "rgba(0, 0, 255, .50)";
      } else {
        return "rgba(255, 0, 0, .50)";
      }
    },
    formatDate(value) {
      return moment(value).format("DD/MM/YYYY");
    },
    //Generamos el password aleatorio
    generatePasswordRand() {
      const characters =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#&";
      var pass = "";

      for (var i = 0; i < 10; i++) {
        pass += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }

      this.user.password = pass;
    },
    cancel() {
      this.editedIndex = -1;
      this.dialog = false;
    }
  }
};
</script>

<style>
.p-20 {
  padding: 20px;
}

.p-t-20 {
  padding-top: 20px;
}

.p-l-80 {
  padding-left: 80px;
}

.p-b-10 {
  padding-bottom: 10px;
}

.p-b-20 {
  padding-bottom: 20px;
}

.v-chip__content {
  color: white;
}

.white--text {
  color: white;
}

.cyan {
  color: #0097a7 !important;
}

.v-input {
  margin-top: 20px !important;
}

.theme--dark.v-card {
  background-color: #03a9f4 !important;
  color: white !important;
}

.v-card__title {
  background-color: #0288d1 !important;
}

.headline {
  color: white !important;
}

.card {
    background: white;    
}
</style>
