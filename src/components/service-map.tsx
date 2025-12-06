'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { formatDistanceToNow } from 'date-fns';

interface AddressWithCheck {
  id: string;
  longitude: number;
  latitude: number;
  addressString: string;
  city: string | null;
  checks: {
    serviceable: boolean;
    serviceabilityType: string;
    salesType: string | null;
    status: string | null;
    cstatus: string | null;
    checkedAt: Date;
  }[];
}

interface ServiceMapProps {
  addresses: AddressWithCheck[];
  clusteringOptions?: {
    maxClusterRadius?: number; // Max radius a cluster will cover (default: 80)
    disableClusteringAtZoom?: number; // Disable clustering at this zoom level (default: 18)
    showCoverageOnHover?: boolean; // Show area covered by cluster on hover
    spiderfyOnMaxZoom?: boolean; // Spiderfy markers at max zoom
  };
}

// Component to fit map bounds to markers (only on initial load)
function FitBounds({ addresses }: { addresses: AddressWithCheck[] }) {
  const map = useMap();
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Only fit bounds once when addresses first load, not on subsequent updates
    if (addresses.length > 0 && !hasInitialized.current) {
      const bounds = addresses.map((a) => [a.latitude, a.longitude] as [number, number]);
      map.fitBounds(bounds, { padding: [50, 50] });
      hasInitialized.current = true;
    }
  }, [addresses, map]);

  return null;
}

export default function ServiceMap({ addresses, clusteringOptions }: ServiceMapProps) {
  const mapRef = useRef(null);

  // Clustering configuration with defaults
  const clusterConfig = {
    maxClusterRadius: clusteringOptions?.maxClusterRadius ?? 80,
    disableClusteringAtZoom: clusteringOptions?.disableClusteringAtZoom ?? 18,
    showCoverageOnHover: clusteringOptions?.showCoverageOnHover ?? false,
    spiderfyOnMaxZoom: clusteringOptions?.spiderfyOnMaxZoom ?? true,
    spiderfyDistanceMultiplier: 1,
    chunkedLoading: true,
  };

  // Group addresses by serviceability type for better rendering
  const { serviceable, preorder, noService, unchecked } = useMemo(() => {
    const serviceable: AddressWithCheck[] = [];
    const preorder: AddressWithCheck[] = [];
    const noService: AddressWithCheck[] = [];
    const unchecked: AddressWithCheck[] = [];

    for (const addr of addresses) {
      const check = addr.checks[0];
      if (!check) {
        unchecked.push(addr);
      } else {
        const type = check.serviceabilityType;
        if (type === 'serviceable') {
          serviceable.push(addr);
        } else if (type === 'preorder') {
          preorder.push(addr);
        } else {
          noService.push(addr);
        }
      }
    }

    return { serviceable, preorder, noService, unchecked };
  }, [addresses]);

  // Default center (Ohio)
  const defaultCenter: [number, number] = [41.5, -81.5];
  const defaultZoom = 10;

  const getMarkerColor = (addr: AddressWithCheck) => {
    const check = addr.checks[0];
    if (!check) return 'hsl(240 5% 55%)'; // unchecked - gray
    const type = check.serviceabilityType;
    if (type === 'serviceable') return 'hsl(145 60% 45%)'; // serviceable - green
    if (type === 'preorder') return 'hsl(45 90% 55%)'; // preorder - yellow
    return 'hsl(0 70% 50%)'; // no service - red
  };

  return (
    <MapContainer
      ref={mapRef}
      center={defaultCenter}
      zoom={defaultZoom}
      className="h-full w-full"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      <FitBounds addresses={addresses} />

      {/* Unchecked addresses cluster - gray */}
      <MarkerClusterGroup
        {...clusterConfig}
        iconCreateFunction={(cluster) => {
          const count = cluster.getChildCount();
          return L.divIcon({
            html: `<div class="cluster-icon cluster-unchecked"><span>${count}</span></div>`,
            className: 'custom-marker-cluster',
            iconSize: L.point(40, 40, true),
          });
        }}
      >
        {unchecked.map((addr) => (
          <CircleMarker
            key={addr.id}
            center={[addr.latitude, addr.longitude]}
            radius={6}
            pathOptions={{
              color: 'hsl(240 5% 55%)',
              fillColor: 'hsl(240 5% 55%)',
              fillOpacity: 0.6,
              weight: 1,
            }}
          >
            <Popup>
              <div className="min-w-[200px] space-y-2">
                <div className="font-semibold">{addr.addressString}</div>
                <div className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-600">
                  Not checked yet
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MarkerClusterGroup>

      {/* No service addresses cluster - red */}
      <MarkerClusterGroup
        {...clusterConfig}
        iconCreateFunction={(cluster) => {
          const count = cluster.getChildCount();
          return L.divIcon({
            html: `<div class="cluster-icon cluster-noservice"><span>${count}</span></div>`,
            className: 'custom-marker-cluster',
            iconSize: L.point(40, 40, true),
          });
        }}
      >
        {noService.map((addr) => (
          <CircleMarker
            key={addr.id}
            center={[addr.latitude, addr.longitude]}
            radius={6}
            pathOptions={{
              color: 'hsl(0 70% 50%)',
              fillColor: 'hsl(0 70% 50%)',
              fillOpacity: 0.7,
              weight: 1,
            }}
          >
            <Popup>
              <div className="min-w-[200px] space-y-2">
                <div className="font-semibold">{addr.addressString}</div>
                <div className="rounded bg-red-100 px-2 py-1 text-sm text-red-800">
                  ❌ No Service Available
                </div>
                <a 
                  href="https://www.omnifiber.com/future-service/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-center text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Request Future Service
                </a>
                {addr.checks[0] && (
                  <div className="text-xs text-gray-500">
                    Checked {formatDistanceToNow(new Date(addr.checks[0].checkedAt), { addSuffix: true })}
                  </div>
                )}
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MarkerClusterGroup>

      {/* Preorder addresses cluster - yellow */}
      <MarkerClusterGroup
        {...clusterConfig}
        iconCreateFunction={(cluster) => {
          const count = cluster.getChildCount();
          return L.divIcon({
            html: `<div class="cluster-icon cluster-preorder"><span>${count}</span></div>`,
            className: 'custom-marker-cluster',
            iconSize: L.point(40, 40, true),
          });
        }}
      >
        {preorder.map((addr) => (
          <CircleMarker
            key={addr.id}
            center={[addr.latitude, addr.longitude]}
            radius={6}
            pathOptions={{
              color: 'hsl(45 90% 55%)',
              fillColor: 'hsl(45 90% 55%)',
              fillOpacity: 0.8,
              weight: 1,
            }}
          >
            <Popup>
              <div className="min-w-[200px] space-y-2">
                <div className="font-semibold">{addr.addressString}</div>
                <div className="rounded bg-yellow-100 px-2 py-1 text-sm text-yellow-800">
                  📅 Preorder / Planned Service
                </div>
                <a 
                  href="https://refer.omnifiber.com/stevendemanett" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-center text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Order Service
                </a>
                <div className="text-xs text-gray-500 text-center italic">
                  Referral link - We both get $50 gift cards!
                </div>
                {addr.checks[0] && (
                  <div className="text-xs text-gray-500">
                    Checked {formatDistanceToNow(new Date(addr.checks[0].checkedAt), { addSuffix: true })}
                  </div>
                )}
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MarkerClusterGroup>

      {/* Serviceable addresses cluster - green */}
      <MarkerClusterGroup
        {...clusterConfig}
        iconCreateFunction={(cluster) => {
          const count = cluster.getChildCount();
          return L.divIcon({
            html: `<div class="cluster-icon cluster-serviceable"><span>${count}</span></div>`,
            className: 'custom-marker-cluster',
            iconSize: L.point(40, 40, true),
          });
        }}
      >
        {serviceable.map((addr) => (
          <CircleMarker
            key={addr.id}
            center={[addr.latitude, addr.longitude]}
            radius={7}
            pathOptions={{
              color: 'hsl(145 60% 45%)',
              fillColor: 'hsl(145 60% 45%)',
              fillOpacity: 0.9,
              weight: 2,
            }}
          >
            <Popup>
              <div className="min-w-[200px] space-y-2">
                <div className="font-semibold">{addr.addressString}</div>
                <div className="rounded bg-green-100 px-2 py-1 text-sm text-green-800">
                  ✓ Serviceable
                </div>
                <a 
                  href="https://refer.omnifiber.com/stevendemanett" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-center text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Order Service
                </a>
                <div className="text-xs text-gray-500 text-center italic">
                  Referral link - We both get $50 gift cards!
                </div>
                {addr.checks[0] && (
                  <div className="text-xs text-gray-500">
                    Checked {formatDistanceToNow(new Date(addr.checks[0].checkedAt), { addSuffix: true })}
                  </div>
                )}
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

