'use client'

import { useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Rectangle, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { MapPOI } from '@/data/map-data'
import { POI_TYPE_CONFIG, REGIONS } from '@/data/map-data'

function createColoredIcon(color: string, icon: string): L.DivIcon {
  return L.divIcon({
    html: `<div style="
      width:28px;height:28px;border-radius:50%;
      background:${color};border:2px solid #fff;
      box-shadow:0 2px 6px rgba(0,0,0,0.4);
      display:flex;align-items:center;justify-content:center;
      font-size:14px;line-height:1;
    ">${icon}</div>`,
    className: '',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
  })
}

function FitBounds({ pois }: { pois: MapPOI[] }) {
  const map = useMap()
  useEffect(() => {
    if (pois.length === 0) return
    const bounds = L.latLngBounds(pois.map((p) => [p.lat, p.lng]))
    map.fitBounds(bounds, { padding: [30, 30] })
  }, [pois, map])
  return null
}

interface MapViewProps {
  pois: MapPOI[]
  activeRegion: string | null
  onToggleFound: (id: string) => void
  foundIds: Set<string>
}

export default function MapView({ pois, activeRegion, onToggleFound, foundIds }: MapViewProps) {
  const markers = useMemo(() => {
    return pois.map((poi) => {
      const cfg = POI_TYPE_CONFIG[poi.type]
      const isFound = foundIds.has(poi.id)
      const color = isFound ? '#6b7280' : cfg.color
      const icon = createColoredIcon(color, cfg.icon)
      return { poi, icon, isFound }
    })
  }, [pois, foundIds])

  const activeRegionData = activeRegion ? REGIONS.find((r) => r.id === activeRegion) : null

  return (
    <MapContainer
      center={[35.7, 138.9]}
      zoom={9}
      style={{ width: '100%', height: '100%' }}
      zoomControl={true}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FitBounds pois={pois} />

      {/* Region boundaries */}
      {REGIONS.map((region) => {
        const isActive = activeRegion === region.id
        return (
          <Rectangle
            key={region.id}
            bounds={region.bounds}
            pathOptions={{
              color: region.color,
              weight: isActive ? 3 : 1,
              fillColor: region.color,
              fillOpacity: isActive ? 0.12 : 0.03,
              dashArray: isActive ? '' : '5 5',
            }}
          >
            <Popup>
              <div style={{ minWidth: 180, fontSize: 14 }}>
                <h3 style={{ fontWeight: 'bold', color: region.color, margin: 0 }}>
                  {region.name} <span style={{ fontSize: 12, opacity: 0.6 }}>{region.nameJa}</span>
                </h3>
                <p style={{ fontSize: 12, marginTop: 4, lineHeight: 1.4 }}>{region.description}</p>
              </div>
            </Popup>
          </Rectangle>
        )
      })}

      {/* Focused region highlight */}
      {activeRegionData && (
        <Rectangle
          bounds={activeRegionData.bounds}
          pathOptions={{
            color: activeRegionData.color,
            weight: 4,
            fillColor: activeRegionData.color,
            fillOpacity: 0.08,
          }}
        />
      )}

      {/* POI Markers */}
      {markers.map(({ poi, icon, isFound }) => (
        <Marker
          key={poi.id}
          position={[poi.lat, poi.lng]}
          icon={icon}
          opacity={isFound ? 0.5 : 1}
        >
          <Popup>
            <div style={{ minWidth: 200, maxWidth: 280, fontSize: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span>{POI_TYPE_CONFIG[poi.type].icon}</span>
                <strong style={{ fontSize: 13 }}>{poi.name}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span style={{
                  fontSize: 11, padding: '1px 6px', borderRadius: 99, fontWeight: 500,
                  backgroundColor: POI_TYPE_CONFIG[poi.type].color + '20',
                  color: POI_TYPE_CONFIG[poi.type].color,
                }}>
                  {POI_TYPE_CONFIG[poi.type].label}
                </span>
                <span style={{ fontSize: 11, opacity: 0.6 }}>{poi.region}</span>
              </div>
              <p style={{ fontSize: 11, opacity: 0.7, lineHeight: 1.4, marginTop: 4 }}>{poi.description}</p>
              {poi.reward && (
                <p style={{ fontSize: 11, marginTop: 6, fontWeight: 500, color: '#f59e0b' }}>Reward: {poi.reward}</p>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleFound(poi.id)
                }}
                style={{
                  marginTop: 8, width: '100%', padding: '4px 8px', fontSize: 11,
                  borderRadius: 6, border: isFound ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(255,255,255,0.1)',
                  backgroundColor: isFound ? 'rgba(34,197,94,0.1)' : 'transparent',
                  color: isFound ? '#4ade80' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                }}
              >
                {isFound ? '✓ Found' : 'Mark as Found'}
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
