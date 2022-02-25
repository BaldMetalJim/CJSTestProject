<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="4">
          <v-text-field
            v-model="material.name"
            label="Name"
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="material.volume"
            label="Volume"
          />
        </v-col>
        <v-col cols="4">
          <v-menu
            v-model="datePicker"
            :close-on-content-click="true"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="material.delivery"
                label="Delivery Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="material.delivery"
              @change="datePicked"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="4">
          <v-menu
            v-model="colorPicker"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn fab
                :color="material.color"
                dark
                v-bind="attrs"
                v-on="on"
            />
            </template>
            <v-color-picker
              v-model="material.color"
              label="Color"
            />
          </v-menu>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="material.cost"
            label="Cost"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  props: [ 'value' ],
  data () {
    return {
      material: this.value,
      datePicker: false,
      colorPicker: false
    }
  },
  methods: {
    datePicked (date) {
      this.material.delivery = date
    },
  }
}
</script>
