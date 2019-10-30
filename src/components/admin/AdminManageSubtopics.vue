<script>
import draggable from 'vuedraggable';
import { sluggify } from '@/helpers/helpers';

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
    phrases: {
      type: Object,
      default() {
        return {};
      },
    },
    setHasUnsavedChanges: {
      type: Function,
      required: true,
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
      showDraft: false,
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
      this.showDraft = false;
    },

    setTitle(id) {
      const { editId, editTitle, updateSubtopic, setEditId } = this;
      if (id === editId) {
        updateSubtopic(id, { title: editTitle });
      }
      setEditId();
    },

    updateDraftTitle(title) {
      this.editTitle = title.trim();
      this.editId = sluggify(title);
    },

    addNewSubtopic() {
      const {
        editId: id,
        editTitle: title,
        updateSubtopic,
        updateSubtopicIds,
        setEditId,
      } = this;
      updateSubtopic(id, { id, title, phraseIds: [] });
      updateSubtopicIds([...this.list, id]);
      setEditId();
    },

    removeItem(index) {
      const newList = [...this.list];
      newList.splice(index, 1);
      this.updateSubtopicIds(newList);
    },
  },
};
</script>

<template>
  <v-row class="mb-6">
    <h3 class="display-2 mb-5">Reorder & Edit Subtopics</h3>
    <draggable
      v-model="list"
      class="drag-container"
      direction="vertical"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
    >
      <transition-group type="transition" :name="!drag ? 'flip-list' : null">
        <v-card v-for="(id, index) in list" :key="id" elevation="1" class="pa-3 mb-5 mx-1">
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

          <div v-else>
            <div class="d-flex justify-space-between align-center">
              <span class="font-weight-bold">{{ subtopics[id].title || id }}</span>
              <v-spacer></v-spacer>
              <v-btn text icon @click.prevent="setEditId(id)">
                <v-icon class="material-icons-round">edit</v-icon>
              </v-btn>
            </div>
            <draggable
              :list="subtopics[id].phraseIds"
              group="phrases"
              class="drag-container phrase-list-drag-container"
              direction="vertical"
              v-bind="dragOptions"
              @change="setHasUnsavedChanges"
              @start="drag = true"
              @end="drag = false"
            >
              <transition-group
                type="transition"
                :name="!drag ? 'flip-list' : null"
                class="phrase-list"
              >
                <v-list-item
                  v-for="phraseId in subtopics[id].phraseIds"
                  :key="phraseId"
                  dense
                  class="flex flex-column align-stretch py-2"
                >
                  <span class="pl-1">{{ phrases[phraseId] ? phrases[phraseId].text : phraseId }}</span>
                  <v-divider class="mt-2" />
                </v-list-item>
              </transition-group>
            </draggable>
          </div>
        </v-card>
      </transition-group>
    </draggable>

    <v-card v-if="showDraft" width="100%" elevation="1" class="d-flex flex-column pa-3 mb-5 mx-1">
      <v-form width="100%" autocomplete="off">
        <v-text-field
          :value="editTitle"
          label="Title"
          outlined
          hide-details
          width="60%"
          class="my-2"
          @input="updateDraftTitle($event)"
        ></v-text-field>
        <v-text-field
          v-model="editId"
          label="ID"
          outlined
          hide-details
          dense
          autocomplete="off"
          width="60%"
          class="my-3"
        ></v-text-field>

        <div class="d-flex justify-end align-center">
          <v-btn text small class="mr-3" @click.prevent="setEditId()">Cancel</v-btn>
          <v-btn
            text
            small
            color="primary"
            width="80"
            class="font-weight-bold"
            @click.prevent="addNewSubtopic()"
          >Done</v-btn>
        </div>
      </v-form>
    </v-card>

    <v-btn
      medium
      outlined
      color="primary"
      class="mx-1"
      @click.prevent="() => {setEditId(); showDraft = true;}"
    >Add Subtopic</v-btn>
  </v-row>
</template>

<style lang="scss" scoped>
.drag-container {
  width: 100%;
  box-sizing: border-box;
}

.phrase-list-drag-container {
  width: auto;
  margin: 8px 36px 0 12px;
  padding-bottom: 36px;
  border: 1px dashed var(--v-primary-base);
  border-radius: 6px;
}

.phrase-list:empty {
  display: block;
  min-width: 100%;
  min-height: 10px;
  box-sizing: border-box;
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

.ghost {
  opacity: 0;
}
</style>
