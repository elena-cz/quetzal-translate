<script>
import moment from 'moment';
import clonedeep from 'lodash.clonedeep';
import draggable from 'vuedraggable';
import fb from '@/firebaseConfig';
import { mapState, mapGetters, mapActions } from 'vuex';
import { sluggify } from '@/helpers/helpers';
import AdminManageSubtopics from '@/components/admin/AdminManageSubtopics.vue';

export default {
  name: 'AdminEditTopic',

  components: {
    draggable,
    AdminManageSubtopics,
  },

  props: {
    savedId: {
      type: String,
      default: '',
    },
    doc: {
      type: Object,
      required: true,
    },
    setCurrentId: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      isNewDoc: true,
      id: '',
      title: '',
      subtopicIds: [],
      subtopics: {},
      version: 0,
      lastUpdatedAt: null,
      createdAt: null,
      hasUnsavedChanges: false,
      phraseIds: [],
      phrases: {},
      drag: false,
    };
  },

  computed: {
    disabled() {
      const { title, hasUnsavedChanges } = this;
      return !title || !hasUnsavedChanges;
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

  watch: {
    savedId: {
      handler() {
        this.isNewDoc = !this.savedId;
        this.setUnsavedData();
      },
      immediate: true,
    },
    doc: {
      handler() {
        this.setUnsavedData();
      },
    },
  },

  methods: {
    setUnsavedData() {
      const { savedId, doc } = this;
      const {
        title,
        subtopicIds,
        subtopics,
        version,
        lastUpdatedAt,
        createdAt,
      } = doc;
      this.id = savedId || '';
      this.title = title || '';
      this.subtopicIds = subtopicIds ? [...subtopicIds] : [];
      this.subtopics = subtopics ? clonedeep(subtopics) : {};
      this.version = version || 0;
      this.lastUpdatedAt = lastUpdatedAt
        ? moment(lastUpdatedAt).format('MMM Do YYYY, h:mm')
        : null;
      this.createdAt = createdAt
        ? moment(createdAt).format('MMM Do YYYY')
        : null;
      this.hasUnsavedChanges = false;

      this.getPhrases();
    },

    setHasUnsavedChanges() {
      this.hasUnsavedChanges = true;
    },

    async getPhrases() {
      const { savedId, getUnsortedPhrasesIds } = this;
      try {
        const phrases = {};
        const phraseIds = [];
        const snapshot = await fb.phrasesCollection
          .where('topics', 'array-contains', savedId)
          .orderBy('text')
          .get();
        snapshot.forEach(doc => {
          const { id } = doc;
          phrases[id] = doc.data();
          phraseIds.push(id);
        });
        this.phrases = phrases;
        getUnsortedPhrasesIds(phraseIds);
      } catch (error) {
        console.error('Error getting phrases', error);
      }
    },

    // Get phraseIds that haven't been sorted into a subtopic yet
    getUnsortedPhrasesIds(allIds) {
      const { subtopics } = this;
      const sortedIds = {};
      Object.values(subtopics).forEach(subtopic => {
        const ids = subtopic.phraseIds || [];
        ids.forEach(id => {
          sortedIds[id] = true;
        });
      });
      const phraseIds = allIds.filter(id => !sortedIds[id]);
      this.phraseIds = phraseIds;
    },

    updateTitle(title) {
      this.title = title.trim();
      this.id = sluggify(title);
      this.hasUnsavedChanges = true;
    },

    updateId(id) {
      this.id = sluggify(id);
      this.hasUnsavedChanges = true;
    },

    updateSubtopicIds(subtopicIds) {
      this.subtopicIds = subtopicIds;
      this.hasUnsavedChanges = true;
    },

    updateSubtopic(id, data) {
      const subtopic = this.subtopics[id];
      this.subtopics[id] = { ...subtopic, ...data };
      this.hasUnsavedChanges = true;
    },

    saveToDb() {
      let { id } = this;
      const { title, subtopicIds, subtopics, version, createdAt } = this;
      const { isNewDoc } = this;
      const newVersion = version + 1;
      const data = {
        id,
        title,
        subtopicIds,
        subtopics,
        version: newVersion,
        lastUpdatedAt: moment().format(),
      };

      if (!createdAt) {
        data.createdAt = moment().format();
      }

      if (isNewDoc) {
        const draftId = sluggify(id);
        id = draftId;
        data.id = draftId;
      }

      fb.topicsCollection
        .doc(id)
        .set(data, { merge: true })
        .then(() => {
          this.setCurrentId(id);
          console.log('Doc updated');
        })
        .catch(error => {
          console.error('Error writing document: ', error);
        });
    },
  },
};
</script>

<template>
  <div class="admin-content-grid">
    <div class="content">
      <v-form autocomplete="off">
        <h2 class="display-3 mb-6">{{ (savedId) ? 'Edit Topic' : 'New Topic' }}</h2>
        <v-container>
          <v-row class="d-flex justify-space-between align-center mb-6">
            <v-text-field
              :value="title"
              label="Title"
              outlined
              hide-details
              class="mr-6 title-input"
              @input="updateTitle($event)"
            ></v-text-field>
            <span v-if="!isNewDoc">
              ID:
              <span class="caption">{{ savedId }}</span>
            </span>

            <v-text-field
              v-else
              :value="id"
              label="ID"
              outlined
              autocomplete="off"
              hide-details
              @input="updateId($event)"
            ></v-text-field>
          </v-row>

          <AdminManageSubtopics
            :subtopic-ids="subtopicIds"
            :subtopics="subtopics"
            :phrases="phrases"
            :set-has-unsaved-changes="setHasUnsavedChanges"
            :update-subtopic-ids="updateSubtopicIds"
            :update-subtopic="updateSubtopic"
          />

          <v-row>
            <v-col class="pa-0">
              <p class="grey--text">Version: {{ version }}</p>

              <p class="caption grey--text">
                Updated At: {{ lastUpdatedAt }}
                <br />
                Created At: {{ createdAt }}
              </p>
            </v-col>
          </v-row>

          <v-row class="save-container justify-space-between align-center">
            <span>
              <v-icon
                small
                :color="(hasUnsavedChanges || isNewDoc) ? 'grey' : 'primary'"
                class="mr-2"
              >lens</v-icon>
              {{ (hasUnsavedChanges || isNewDoc) ? 'Not Saved' : 'Saved' }}
            </span>

            <div class="save-buttons">
              <v-btn rounded class="mr-4" @click.prevent="setUnsavedData()">Cancel</v-btn>
              <v-btn
                rounded
                color="primary"
                type="submit"
                :disabled="disabled"
                @click.prevent="saveToDb"
              >Save Topic</v-btn>
            </div>
          </v-row>
        </v-container>
      </v-form>
    </div>

    <div class="right-sidebar">
      <div class="v-subheader text-uppercase theme--light">Unsorted Phrases</div>

      <draggable
        :list="phraseIds"
        group="phrases"
        class="drag-container"
        direction="vertical"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null" class="phrase-list">
          <v-list-item
            v-for="(id, index) in phraseIds"
            :key="id"
            dense
            class="flex flex-column align-stretch py-2"
          >
            <span class="pl-1">{{ phrases[id].text || id }}</span>
            <v-divider class="mt-2" />
          </v-list-item>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.admin-content-grid {
  display: grid;
  grid-template-columns: auto 300px;
  grid-template-rows: auto;
  grid-template-areas: 'content right-sidebar';
  grid-gap: 1rem;
  align-content: flex-start;
  min-height: 100%;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.right-sidebar {
  grid-area: right-sidebar;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: calc(300px + 1rem);
  height: 100%;
  max-height: 100%;
  padding: 1rem;
  box-sizing: border-box;
  overflow: hidden;
}

.content {
  grid-area: content;
  width: 100%;
}

.title-input {
  max-width: 400px;
}

.phrase-list:empty {
  display: block;
  min-width: 100%;
  min-height: 400px;
  box-sizing: border-box;
}
</style>
