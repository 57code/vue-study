import { Component, Prop, Vue } from 'vue-property-decorator';
import { CreateElement } from 'vue';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  title = 'abc'
  
  onclick() {
    console.log('click', this);
    
  }
  
  render(h: CreateElement) {
    // jsx
    return <div class="hello">
      <h1 onClick={this.onclick}>{ this.msg }</h1>
      <input type="text" v-model={this.title}/>
    </div>
  }
}