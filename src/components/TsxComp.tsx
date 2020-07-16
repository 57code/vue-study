import { Component, Prop, Vue } from 'vue-property-decorator';
import { CreateElement } from 'vue';

// class-style
@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  onclick(){
    console.log(this.msg);
    
  }
  
  render(h: CreateElement) {
    return <div onClick={this.onclick}>{this.msg}</div>
  }
}