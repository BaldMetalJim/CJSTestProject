<template>
  <v-container>
    <v-row class="text-center">
      <h1>Materials</h1>
    </v-row>
    <v-row>
      <v-btn rounded color='primary' @click="newMaterial">
        Add
      </v-btn>
      <v-btn rounded color='error' @click="removeMaterial">
        Delete
      </v-btn>
      <v-btn rounded color='green' @click="updateMaterial">
        Save
      </v-btn>

    </v-row>
    <v-row>
      <v-col cols=4>
        <v-card outlined>
          <v-list two-line>
            <v-list-item-group
              v-model="selectedMaterial"
              color="primary"
            >
              <v-list-item
                v-for="(material, i) in materials"
                :key="i"
              >
                <v-list-item-avatar>
                  <v-btn fab
                    :color="material.color"
                    dark
                  />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="material.name"></v-list-item-title>
                  <v-list-item-subtitle v-text="material.cost"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
        Total: {{ total }}
      </v-col>
      <v-col cols=8>
        <MaterialEditor v-if="currentMaterial" v-model="currentMaterial" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import MaterialEditor from './MaterialEditor';

  // const restAPI = require('../js/restAPI.js')
  import restAPI from '../js/restAPI'
  const _ =  require('lodash')
  const moment = require('moment')

  export default {
    components: { MaterialEditor },
    data: () => ({
      selectedMaterial: -1,
      currentMaterial: null,
      materials: [],
    }),
    beforeMount: async function () {
      let mats = await restAPI('/materials')
      this.materials = mats.data
    },
    watch: {
      selectedMaterial: function(val) {
        this.currentMaterial = this.materials[val]
      }
    },
    computed: {
      total: vm => {
        return _.reduce(vm.materials, (sum, material) => {
          let val = parseFloat(material.cost)
          if (_.isNaN(val)) {
            return
          }
          return sum + val
        }, 0)
      }
    },
    methods: {
      newMaterial() {
        this.currentMaterial = {
          name: '',
          volume: 0,
          delivery: moment().format('YYYY-MM-DD'),
          color: 'white',
          cost: 0
        }
        this.materials.push(this.currentMaterial)
      },
      removeMaterial() {
        var index = _.findIndex(this.materials, { name: this.currentMaterial.name })
        this.materials.splice(index, 1)
        restAPI({
          url:'/materials/' + this.currentMaterial._id,
          method: 'delete'
        })
      },
      updateMaterial() {
        if (_.isNil(this.currentMaterial._id)) {
          return this.addMaterial()
        }
        restAPI({
          url:'/materials/' + this.currentMaterial._id,
          method: 'put',
          data: this.currentMaterial
        })
      },
      addMaterial() {
        restAPI({
          url:'/materials',
          method: 'post',
          data: this.currentMaterial
        })
      }
    }
  }
</script>