<script>
export default {
  name: 'About-View',

  methods: {
    showSnack() {
      this.$store.dispatch('ui/updateSnack', {
        text: 'Test snack',
        actionText: 'Test',
        handler: () => {
          console.log('test handler');
        },
        keepOpen: true,
      });
    },
  },
};
</script>

<template>
  <div class="scroll-container mx-n4">
    <div class="main-content px-4 pt-md-6 pb-6 text-content">
      <h2>Quetzal Translate</h2>

      <p>
        Our mission is to help care providers compassionately communicate with
        clients in their local language, focusing on smaller languages that are
        underserved by traditional translation services.
      </p>

      <p>
        Email us at
        <a href="mailto:hello@quetzal.app" target="_blank">hello@quetzal.app</a>
      </p>

      <h2>Our story</h2>

      <p>
        Imagine going to the dentist, possibly for the first time in your life,
        and not being able to communicate or understand. In 2018, we joined the
        <a
          href="http://www.internationalhealthemissaries.org/"
          target="_blank"
        >International Health Emissaries</a>
        on their annual trip to Guatemala to provide dental care to children in
        the Río Dulce area. We learned that many of the Q’eqchi’-speaking children
        we were serving were in just this position. Guatemala is home to 24 local
        languages that are spoken by millions of people.
      </p>

      <p>
        With our skills in languages (Mindy) and design and programming (Elena) we
        knew we had the tools to do something. The next year, we built an app with
        dental phrases in Spanish and Q’eqchi’. For the translations and audio
        recordings, we were lucky to connect with René Corado, an ambassador for
        Peace in Guatemala and founder of the
        <a
          href="https://www.ellustradorfoundation.org/"
          target="_blank"
        >El Lustrador Foundation</a>, and Manuel Tiul, a teacher in Punta Arenas, Río Dulce.
      </p>

      <p>
        Our project is ready to grow to other languages and subject areas with
        help from volunteers. If you have any comments, suggestions, or want to
        get involved, write to us at
        <a
          href="mailto:hello@quetzal.app"
          target="_blank"
        >hello@quetzal.app</a>.
      </p>

      <p>B'anyox!</p>

      <p>- Mindy & Elena Czubiak</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
