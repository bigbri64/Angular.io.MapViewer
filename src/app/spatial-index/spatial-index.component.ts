import { Component, OnInit } from '@angular/core';
import { SpatialIndex } from 'app/spatial-index/model/spatial-index';
import { BoundingBox } from 'app/spatial-index/model/boundingbox';
import { Point } from 'app/spatial-index/model/point';

@Component({
  selector: 'app-spatial-index',
  templateUrl: './spatial-index.component.html',
  styleUrls: ['./spatial-index.component.css']
})
export class SpatialIndexComponent implements OnInit {
  population: number = 100;
  count: Array<number> = Array(this.population).fill(0, 0).map((x, i) => i);
  lat: Array<number> = this.randomArray(0, 10, this.population);
  lon: Array<number> = this.randomArray(0, 10, this.population);
  latlonColllection: Array<any> = [];
  polygonCollection: Array<any> = [];
  gravityColletion: Array<Point> = [];
  constructor() { }

  ngOnInit() {
    var points = [];
    this.count.forEach(element => {
      points.push(new Point(this.lat[element], this.lon[element]));
      this.latlonColllection.push({ lat: this.lat[element], lon: this.lon[element] });
    });

    var initialIndex = new SpatialIndex();
    initialIndex.bbox = new BoundingBox([
      Math.min(...this.lat),
      Math.max(...this.lat),
      Math.min(...this.lon),
      Math.max(...this.lon)
    ]);

    initialIndex.setDimensions();

    this.polygonCollection.push(initialIndex.bbox.getBBox());

    initialIndex.setCollection(3);
    initialIndex.setItems(points);

    this.createIndex(initialIndex);
    this.createObjectForRender(initialIndex);
    console.log(initialIndex);
    this.gravityColletion.push(...initialIndex.items);
    
  }

  createIndex(sp: SpatialIndex) {
    sp.collection.forEach(element => {
      element.setDimensions();
      element.setItems(sp.items);
      if (element.averageDistance > 0.1) {
        element.setCollection(3);
        this.createIndex(element);
      }
    });
  }

  createObjectForRender(sp: SpatialIndex) {
    sp.collection.forEach(element => {
      this.polygonCollection.push(element.bbox.getBBox());
      if (element.collection.length > 0) {
        this.createObjectForRender(element);
      }
    });
  }

  randomFromInterval(min, max) {
    let rand = Math.floor(Math.random() * (max * 1000 - min * 1000 + 1) + min * 1000);
    return rand / 1000;
  }

  randomArray(min, max, size) {
    let val: Array<number> = Array(size).fill(0, 0);
    val.forEach((element, index, arrayObject) => {
      arrayObject[index] = this.randomFromInterval(min, max);
    });
    return val;
  }

}
