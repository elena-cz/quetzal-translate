<script>
import fb from '@/firebaseConfig';
import AdminEditPhrase from '@/components/admin/AdminEditPhrase.vue';
import AdminEditTopic from '@/components/admin/AdminEditTopic.vue';

export default {
  name: 'AdminView',

  components: {
    AdminEditPhrase,
    AdminEditTopic,
  },

  data() {
    return {
      currentId: '',
      docs: {},
      currentIndex: null,
    };
  },

  computed: {
    page() {
      return this.$route.params.page || 'phrases';
    },

    collection() {
      return this.page;
    },

    currentDoc() {
      const { currentId, docs } = this;
      return currentId ? docs[currentId] || {} : {};
    },

    newButtonText() {
      const { page } = this;
      const nouns = {
        phrases: 'Phrase',
        topics: 'Topic',
      };
      const noun = nouns[page] || 'Phrase';
      return `New ${noun}`;
    },
  },

  watch: {
    page: {
      handler() {
        this.currentId = '';
        this.docs = {};
        this.getDocs();
      },
      immediate: true,
    },
  },

  methods: {
    getDocs() {
      const { docs, collection } = this;
      const updatedDocs = {};

      fb.db.collection(collection).onSnapshot(
        snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type !== 'removed') {
              const { id } = change.doc;
              updatedDocs[id] = change.doc.data();
            }
          });
          this.docs = { ...docs, ...updatedDocs };
        },
        error => {
          console.log('Error getting docs', error);
        }
      );
    },

    setCurrentId(id) {
      this.currentId = id || '';
    },
  },
};
</script>

<template>
  <div class="app-container">
    <v-app-bar app flat color="transparent">
      <v-toolbar-title class="headline white--text">Quetzal Admin</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="page === 'phrases'"
        text
        color="white"
        @click="$router.push('/admin/topics')"
      >Topics</v-btn>
      <v-btn v-else text color="white" @click="$router.push('/admin/phrases')">Phrases</v-btn>
    </v-app-bar>

    <v-content>
      <v-container class="admin-grid">
        <aside class="sidebar">
          <v-btn color="primary" rounded @click="setCurrentId('')">{{ newButtonText }}</v-btn>

          <v-list shaped dense>
            <v-subheader class="text-uppercase">{{ collection }}</v-subheader>
            <v-list-item-group v-model="currentIndex" color="primary">
              <v-list-item v-for="doc in docs" :key="doc.id" @click="setCurrentId(doc.id)">
                <v-list-item-content>
                  <v-list-item-title v-text="page === 'phrases' ? doc.text : doc.id"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </aside>
        <div class="main">
          <AdminEditTopic
            v-if="page === 'topics'"
            :saved-id="currentId"
            :doc="currentDoc"
            :set-current-id="setCurrentId"
          />
          <AdminEditPhrase
            v-else
            :saved-id="currentId"
            :doc="currentDoc"
            :set-current-id="setCurrentId"
          />
        </div>
      </v-container>
    </v-content>
  </div>
</template>

<style lang="scss" scoped>
.admin-grid {
  display: grid;
  grid-template-columns: 250px auto;
  grid-template-rows: auto;
  grid-template-areas: 'sidebar main';
  grid-gap: 1rem;
  align-content: flex-start;
  min-height: 100%;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 1rem;
}

.sidebar {
  grid-area: sidebar;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: calc(250px + 1rem);
  height: 100%;
  max-height: 100%;
  padding: 1rem;
  box-sizing: border-box;
  overflow: hidden;
}

.main {
  grid-area: main;
  width: 100%;
}
</style>