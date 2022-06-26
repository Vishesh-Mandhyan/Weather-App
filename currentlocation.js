export default class CurrentLocation {
    constructor() {
      this._name = "Current Location";
      this._lat = null;
      this._lon = null;
    }
  
    get Name() {
      return this._name;
    }
  
    set Name(name) {
      this._name = name;
    }
  
    get Lat() {
      return this._lat;
    }
  
    set Lat(lat) {
      this._lat = lat;
    }
  
    get Lon() {
      return this._lon;
    }
  
    set Lon(lon) {
      this._lon = lon;
    }
  }