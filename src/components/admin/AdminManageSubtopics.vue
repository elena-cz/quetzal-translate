<script>
import draggable from 'vuedraggable';

export default {
  name: 'AdminManageSubtopics',

  components: {
    draggable,
  },

  props: {
    subtopicIds: {
      type: Array,
      default() {
        return [];
      },
    },
    subtopics: {
      type: Object,
      default() {
        return {};
      },
    },
    updateSubtopicIds: {
      type: Function,
      required: true,
    },
    updateSubtopic: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      drag: false,
      editId: '',
      editTitle: '',
    };
  },

  computed: {
    list: {
      get() {
        return this.subtopicIds;
      },
      set(value) {
        this.updateSubtopicIds(value);
      },
    },

    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
        dragClass: 'drag',
      };
    },
  },

  methods: {
    setEditId(id) {
      const subtopic = this.subtopics[id];
      this.editId = id || '';
      this.editTitle = id && subtopic.title ? subtopic.title : '';
    },

    setTitle(id) {
      const { editId, editTitle, updateSubtopic, setEditId } = this;
      if (id === editId) {
        updateSubtopic(id, { title: editTitle });
      }
      setEditId();
    },

    removeItem(index) {
      const newList = [...this.list];
      newList.splice(index, 1);
      this.updateList(newList);
    },
  },
};
</script>

<template>
  <v-row>
    <draggable
      v-model="list"
      class="drag-container"
      direction="vertical"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
    >
      <transition-group type="transition" :name="!drag ? 'flip-list' : null">
        <v-card v-for="(id, index) in list" :key="id" width="100%" class="pa-3 mb-5">
          <div v-if="editId === id">
            <div class="d-flex justify-space-between">
              <v-text-field v-model="editTitle" label="Title" outlined hide-details class="my-2"></v-text-field>
              <v-spacer></v-spacer>
              <v-btn text icon>
                <v-icon class="material-icons-round">delete_outline</v-icon>
              </v-btn>
            </div>
            <div class="d-flex justify-space-between align-center">
              <span class="caption">ID: {{ id }}</span>
              <v-spacer></v-spacer>
              <v-btn text small class="mr-3" @click.prevent="setEditId()">Cancel</v-btn>
              <v-btn
                text
                small
                color="primary"
                width="80"
                class="font-weight-bold"
                @click.prevent="setTitle(id)"
              >Done</v-btn>
            </div>
          </div>
          <div v-else class="d-flex justify-space-between align-center">
            <span>{{ id }}</span>
            <v-spacer></v-spacer>
            <v-btn text icon @click.prevent="setEditId(id)">
              <v-icon class="material-icons-round">edit</v-icon>
            </v-btn>
          </div>
        </v-card>
      </transition-group>
    </draggable>
  </v-row>
</template>

<style lang="scss" scoped>
.drag-container {
  width: 100%;
  min-height: 60px;
  box-sizing: border-box;
  margin: 1rem 2px;
}

.drag-item {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 4px 0;
  padding: 9px 16px;
  box-sizing: border-box;
  border-radius: 5px;
}

.flip-list-move {
  transition: transform 0.5s;
  transition: opacity 0.5s;
}

.flip-list-enter-active,
.flip-list-leave-active {
  transition: all 0.5s;
}
.flip-list-enter, .flip-list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}

.ghost {
  opacity: 0;
}
</style>
