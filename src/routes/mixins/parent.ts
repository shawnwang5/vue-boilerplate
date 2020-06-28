import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ParentVue extends Vue {
    get query(): any {
        return this.$route.query
    }

    get params(): any {
        return this.$route.params
    }

    get refs(): any {
        return this.$refs
    }

    async mounted() {}
}
