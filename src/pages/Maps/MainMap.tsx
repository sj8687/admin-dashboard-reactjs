import { LOCATIONS } from "@/mockdata/data"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import MapControls from "./Mapcontroller"
import L from "leaflet"
import "leaflet/dist/leaflet.css"


export default function LiveTracking() {
  const deliveryIcon = new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  })
  
  const warehouseIcon = new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  })
  
  return (
    <div className="h-screen w-full relative overflow-x-hidden">
      <MapContainer
        center={[18.5204, 73.8567]}
        zoom={12}
        scrollWheelZoom={false}
        doubleClickZoom={true}
        dragging={true}
        touchZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {LOCATIONS.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            icon={loc.type === "delivery" ? deliveryIcon : warehouseIcon}
          >
            <Popup>
              <strong>{loc.name}</strong>
              <br />
              Type: {loc.type}
            </Popup>
          </Marker>
        ))}

        <MapControls />
      </MapContainer>
    </div>
  )
}