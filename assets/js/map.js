function initMap() {
  
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: { lat:44.44452889316098, 
                    lng: 26.11806508509446},
    mapTypeId: "terrain",
  });
 
  for (const city in citymap) {
    const cityCircle = new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map,
      center: citymap[city].center,
      radius: 2000,
      
    });
  }
}
     const citymap = {
  blunchDelivery: {
    center: { lat:44.44452889316098, 
                    lng: 26.11806508509446},
  },
  
};

