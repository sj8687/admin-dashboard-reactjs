import { useEffect, useState } from "react"
import { LOCATIONS } from "@/mockdata/data"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import MapControls from "./Mapcontroller"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

export default function LiveTracking() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  )

  // Watch for Tailwind dark mode changes dynamically
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"))
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [])

  // Delivery and Warehouse icons
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

  // Tile URLs and attribution based on theme
  const tileUrl = isDark
    ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

  const attribution = isDark
    ? '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    : "© OpenStreetMap contributors"

  return (
    <div className="h-screen w-full relative overflow-x-hidden">
      <MapContainer
        center={[18.5204, 73.8567]}
        zoom={12}
        scrollWheelZoom={false}
        doubleClickZoom={true}
        touchZoom={true}
        dragging={true}
        className="h-full w-full"
      >
        <TileLayer attribution={attribution} url={tileUrl} />

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