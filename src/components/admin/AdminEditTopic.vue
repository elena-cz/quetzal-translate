<script>
import moment from 'moment';
import fb from '@/firebaseConfig';
import { mapState, mapGetters, mapActions } from 'vuex';
import { sluggify } from '@/helpers/helpers';
import AdminManageSubtopics from '@/components/admin/AdminManageSubtopics.vue';

export default {
  name: 'AdminEditTopic',

  components: {
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
      phrases: [],
    };
  },

  computed: {
    disabled() {
      const { text, hasUnsavedChanges } = this;
      return !title || !hasUnsavedChanges;
    },
  },

  watch: {
    savedId: {
      handler() {
        this.isNewDoc = !this.savedId;
        this.setUnsavedData();
        this.getPhrases();
      },
      immediate: true,
    },
    doc: {
      handler() {
        this.setUnsavedData();
        this.getPhrases();
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
      this.subtopicIds = subtopicIds || [];
      this.subtopics = subtopics || {};
      this.version = version || 0;
      this.lastUpdatedAt = lastUpdatedAt
        ? moment(lastUpdatedAt).format('MMM Do YYYY, h:mm')
        : null;
      this.createdAt = createdAt
        ? moment(createdAt).format('MMM Do YYYY')
        : null;
      this.hasUnsavedChanges = false;
    },

    setHasUnsavedChanges() {
      this.hasUnsavedChanges = true;
    },

    async getPhrases() {
      const { savedId } = this;
      try {
        const phrases = [];
        const snapshot = await fb.phrasesCollection
          .where('topics', 'array-contains', savedId)
          .orderBy('text')
          .get();
        snapshot.forEach(doc => {
          phrases.push(doc.data());
        });
        console.log(phrases);
        this.phrases = phrases;
      } catch (error) {
        console.error('Error getting phrases', error);
      }
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
  <div class="form-container">
    <v-form autocomplete="off">
      <h2 class="display-3 mb-6">{{ (savedId) ? 'Edit Topic' : 'New Topic' }}</h2>
      <v-container>
        <v-row class="mb-6">
          <v-text-field
            :value="title"
            label="Title"
            outlined
            @input="updateTitle($event.target.value)"
          ></v-text-field>
        </v-row>

        <v-row class="mb-6">
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
            @input="updateId($event.target.value)"
          ></v-text-field>
        </v-row>
        <AdminManageSubtopics
          :subtopic-ids="subtopicIds"
          :subtopics="subtopics"
          :update-subtopic-ids="updateSubtopicIds"
          :update-subtopic="updateSubtopic"
        />
      </v-container>
    </v-form>
  </div>
</template>

<style lang="scss" scoped>
// @import '@/design/colors.scss';
</style>
