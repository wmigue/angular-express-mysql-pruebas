import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin-component.component.html',
  styleUrls: ['./admin-component.component.css']
})
export class AdminComponentComponent implements OnInit {
  @HostBinding('class') classes = 'row'

  pass: boolean = false
  passfeedback: boolean = false
  entrada: string =''

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  loguearse() {
    const ent = this.entrada
    ent == "nerd" ?
      (
        console.log(ent),
        this.pass = true,
        this.router.navigate(['/usuarios'])

      ) :
      this.pass = false
      this.passfeedback=true
  }
}
