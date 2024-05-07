import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
    OnDestroy,
} from '@angular/core';
import { MapComponent } from '@maplibre/ngx-maplibre-gl';
import { Map, MapStyle, config, Marker } from '@maptiler/sdk';

import '@maptiler/sdk/dist/maptiler-sdk.css';

// model
import { navigationIcons } from '../../model/navigation-icons.model';

// constants
import { socialIcons } from '../../utils/constants/social-icons.constants';

// module
import { AngularSvgIconModule } from 'angular-svg-icon';
@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [MapComponent, AngularSvgIconModule],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit, AfterViewInit, OnDestroy {
    public map: Map | undefined;
    public icons: navigationIcons[] = socialIcons.SOCIAL_ICONS;

    @ViewChild('map')
    private mapContainer!: ElementRef<HTMLElement>;

    ngOnInit(): void {
        config.apiKey = 'mptz5NyzRvWutj6QLuI5';
    }

    ngAfterViewInit() {
        const initialState = { lng: 21.90333, lat: 43.32472, zoom: 12 };

        this.map = new Map({
            container: this.mapContainer.nativeElement,
            style: MapStyle.STREETS,
            center: [initialState.lng, initialState.lat],
            zoom: initialState.zoom,
        });

        new Marker({ color: '#FF0000' })
            .setLngLat([21.90333, 43.32472])
            .addTo(this.map);
    }

    ngOnDestroy() {
        this.map?.remove();
    }
}
