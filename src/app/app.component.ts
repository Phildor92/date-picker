import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from "./menu/menu.component";

@Component({
  selector: 'dp-root',
  standalone: true,
  imports: [RouterModule, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
