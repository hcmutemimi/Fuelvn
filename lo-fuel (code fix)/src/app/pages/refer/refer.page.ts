import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-refer",
  templateUrl: "./refer.page.html",
  styleUrls: ["./refer.page.scss"],
})
export class ReferPage implements OnInit {
  contactList: any = [
    {
      name: "Albanian James",
      number: "+44 326 985 3695",
    },
    {
      name: "Array McDonald",
      number: "+44 326 985 3695",
    },
    {
      name: "Ancine Henderson",
      number: "+44 326 985 3695",
    },
    {
      name: "Amanda Jordan",
      number: "+44 326 985 3695",
    },
    {
      name: "Chris James",
      number: "+44 326 985 3695",
    },
  ];
  constructor() {}

  ngOnInit() {}
}
