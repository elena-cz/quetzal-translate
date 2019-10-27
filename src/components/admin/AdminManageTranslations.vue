<script>
import moment, { lang } from 'moment';
import { mapState } from 'vuex';
import fb from '@/firebaseConfig';
import AdminEditTranslation from '@/components/admin/AdminEditTranslation.vue';

export default {
  name: 'AdminManageTranslations',

  components: {
    AdminEditTranslation,
  },

  props: {
    enId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      translations: {},
      newLang: '',
    };
  },

  computed: {
    ...mapState('languages', ['langNames']),

    existingLangs() {
      const { translations } = this;
      return Object.keys(translations).map(doc => doc.lang);
    },

    availableLangs() {
      const { existingLangs, langNames } = this;
      const langSet = new Set(Object.keys(langNames));
      existingLangs.forEach(lang => {
        langSet.delete(lang);
      });
      return Array.from(langSet).map(lang => ({
        value: lang,
        text: `${lang} - ${langNames[lang]}`,
      }));
    },
  },

  watch: {
    enId: {
      handler() {
        this.getTranslations();
      },
      immediate: true,
    },
  },

  methods: {
    getTranslations() {
      const { enId } = this;
      fb.db
        .collection('phrases')
        .doc(enId)
        .collection('translations')
        .onSnapshot(
          snapshot => {
            const translations = {};
            snapshot.forEach(doc => {
              translations[doc.id] = doc.data();
            });
            this.translations = translations;
            console.log('Done getting translations');
          },
          error => {
            console.error('Error getting translations', error);
          }
        );
    },
  },
};
</script>

<template>
  <div>
    <h3 class="display-2 mt-4 mb-5">Translations</h3>
    <v-container v-if="availableLangs.length > 0">
      <v-row class="justify-stretch align-stretch">
        <v-select
          v-model="newLang"
          :items="availableLangs"
          label="Add Language"
          outlined
          color="secondary"
        ></v-select>

        <v-btn color="secondary" height="56" class="ml-5" :disabled="!newLang">Add</v-btn>
      </v-row>
    </v-container>
    <AdminEditTranslation v-for="doc in translations" :enId="enId" :doc="doc" />
  </div>
</template>

<style lang="scss" scoped>
// @import '@/design/colors.scss';
</style>
