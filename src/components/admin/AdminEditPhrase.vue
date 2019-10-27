<script>
import moment from 'moment';
import fb from '@/firebaseConfig';
import { mapState, mapGetters, mapActions } from 'vuex';
import AdminManageTranslations from '@/components/admin/AdminManageTranslations.vue';

export default {
  name: 'AdminEditPhrase',

  components: {
    AdminManageTranslations,
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
      text: '',
      topics: [],
      languages: [],
      visible: true,
      version: 0,
      lastUpdatedAt: null,
      createdAt: null,
      hasUnsavedChanges: false,
      topicSearch: null,
      topicNoData: true,
    };
  },

  computed: {
    disabled() {
      const { text, hasUnsavedChanges } = this;
      return !text || !hasUnsavedChanges;
    },

    unsavedDraft() {
      const { text, topics, visible } = this;
      return { text, topics, visible };
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
        text,
        topics,
        visible,
        languages,
        version,
        lastUpdatedAt,
        createdAt,
      } = doc;
      this.id = savedId || '';
      this.text = text || '';
      this.topics = topics || [];
      this.visible = visible || true;
      this.languages = languages || [];
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

    saveToDb() {
      let { id } = this;
      const { text, topics, visible, version, createdAt } = this;
      const { isNewDoc } = this;
      const newVersion = version + 1;
      const data = {
        text,
        topics,
        visible,
        version,
        version: newVersion,
        lastUpdatedAt: moment().format(),
      };

      if (!createdAt) {
        data.createdAt = moment().format();
      }

      if (isNewDoc) {
        fb.db
          .collection('phrases')
          .add(data)
          .then(docRef => {
            let { id } = docRef;
            this.setCurrentId(id);
            docRef.set({ id }, { merge: true });
          })
          .catch(error => {
            console.error('Error writing document: ', error);
          });
      } else {
        fb.db
          .collection('phrases')
          .doc(id)
          .set(data, { merge: true })
          .then(() => {
            this.setCurrentId(id);
            console.log('Doc updated');
          })
          .catch(error => {
            console.error('Error writing document: ', error);
          });
      }
    },
  },
};
</script>

<template>
  <div class="form-container">
    <v-form>
      <h2 class="display-3 mb-6">{{ (savedId) ? 'Edit Phrase' : 'New Phrase' }}</h2>
      <v-container>
        <v-row class="mb-3">
          <p class="caption">ID: {{id}}</p>
        </v-row>

        <v-row>
          <v-textarea
            outlined
            auto-grow
            name="text"
            label="Text"
            v-model.trim="text"
            @input="setHasUnsavedChanges"
          ></v-textarea>
        </v-row>

        <v-row>
          <v-select
            v-model="topics"
            :items="['dentistry']"
            chips
            label="Topics"
            multiple
            outlined
            color="primary"
          ></v-select>
        </v-row>

        <v-row>
          <v-switch
            v-model="visible"
            label="Visible"
            color="primary"
            class="pl-1"
            @input="setHasUnsavedChanges"
          ></v-switch>
        </v-row>

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
            >Save Source</v-btn>
          </div>
        </v-row>
      </v-container>
    </v-form>

    <AdminManageTranslations v-if="savedId" enId="savedId" />
  </div>
</template>

<style lang="scss" scoped>
.form-container {
  max-width: 600px;
}
</style>
