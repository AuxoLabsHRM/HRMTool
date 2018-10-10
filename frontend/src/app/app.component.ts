import { Component, ViewChild } from '@angular/core';
import { TechDetailsComponent } from './components/tech-details/tech-details.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'practice';
  @ViewChild(TechDetailsComponent) private techDetail: TechDetailsComponent;

  // test1(data) {
  //   console.log(data, '--data1');
  // }
}
