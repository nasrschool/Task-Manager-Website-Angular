import { Component, Input, OnInit} from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  constructor(private router:Router){}

  ngOnInit():void{

  }

  @Input() userId:string="";
  changeUser(event:any){
    this.router.navigate(["users",event.target.value]);
  }

}
