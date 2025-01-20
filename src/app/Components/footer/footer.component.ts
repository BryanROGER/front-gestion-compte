import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {

  actualYear !: number;

  ngOnInit() {
    this.actualYear = new Date().getFullYear();
  }


}
