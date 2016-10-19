import { Component } from '@angular/core';
var Lealflet = require('leaflet');
declare var L: any;

@Component({
  selector: 'leaf-element',
  templateUrl: 'app/templates/leaflet.element.html',
  styleUrls: [],
})

export class LeafletElement {
  ngOnInit() {
    let map = L.map("map", {
      zoomControl: false,
      center: L.latLng(40.731253, -73.996139),
      zoom: 12,
      minZoom: 4,
      maxZoom: 19,
      layers: []
    });

    L.control.zoom({ position: "topright" }).addTo(map);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
    L.control.scale().addTo(map);
  }
}
