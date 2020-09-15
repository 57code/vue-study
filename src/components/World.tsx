import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class World extends Vue {
  @Prop() private msg!: string;

  render() {
    return <div>{this.msg}</div>
  }
}