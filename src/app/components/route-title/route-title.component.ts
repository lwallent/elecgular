import { ActivatedRoute, Router, NavigationEnd, ResolveEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
    selector: 'route-title',
    template: `<h1>{{titleKey | translate }}</h1><hr/>`,
    styleUrls: ['route-title.component.scss'],
})
export class RouteTitleComponent implements OnInit {

    public titleKey: string;

    constructor( public router: Router,  private activatedRoute: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.router.events
            .pipe( filter(event => event instanceof NavigationEnd))
            .pipe( map(()=> this.activatedRoute) )
            .pipe( map((route:ActivatedRoute) => {
                while (route.firstChild) route = route.firstChild;
                return route;
            }))
            .pipe( filter((route:ActivatedRoute) => !!route.data ))
            .pipe( mergeMap((route:ActivatedRoute) => route.data ))
            .subscribe((data: any) => {
                //console.log(data);
                if (data.titleKey) {
                    this.titleKey = data.titleKey;
                }
            });
    }
}