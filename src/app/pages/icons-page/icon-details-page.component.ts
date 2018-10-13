import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'icon-details-page',
    template: `<title-page>Icon Details</title-page>
                <p>{{key}}</p>
                `,
})
export class PageIconDetailsComponent implements OnInit {
   
    key: string;

    constructor( private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.route.params.subscribe((params)=> {
           this.key = params['name']; //it is passed as name for now
        });
        
    }


}