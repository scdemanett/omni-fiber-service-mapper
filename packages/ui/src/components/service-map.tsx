'use client';

import { useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { formatDistanceToNow, format } from 'date-fns';

/**
 * Slim UI-facing provider descriptor.
 * Contains only what the map component needs — no fetch/decode methods
 * so this stays safe to import in client components.
 */
export interface ServiceMapProvider {
  id: string;
  name: string;
  futureServiceUrl: string;
  referralUrl?: string;
}

interface AddressWithCheck {
  id: string;
  longitude: number;
  latitude: number;
  addressString: string;
  city: string | null;
  checks: {
    /** Provider id that produced this check, e.g. "omni-fiber". */
    provider: string;
    serviceable: boolean;
    serviceabilityType: string;
    salesType: string | null;
    status: string | null;
    cstatus: string | null;
    checkedAt: Date;
    apiCreateDate: Date | null;
    apiUpdateDate: Date | null;
  }[];
}

interface ServiceMapProps {
  addresses: AddressWithCheck[];
  /**
   * Ordered list of providers to display in popups.
   * Phase 1: single-element array (Omni Fiber).
   * Phase 2: one entry per provider once multi-provider checks are stored.
   */
  providers: ServiceMapProvider[];
  clusteringOptions?: {
    maxClusterRadius?: number;
    disableClusteringAtZoom?: number;
    showCoverageOnHover?: boolean;
    spiderfyOnMaxZoom?: boolean;
  };
}

// Component to fit map bounds to markers (only on initial load)
function FitBounds({ addresses }: { addresses: AddressWithCheck[] }) {
  const map = useMap();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (addresses.length > 0 && !hasInitialized.current) {
      const bounds = addresses.map((a) => [a.latitude, a.longitude] as [number, number]);
      map.fitBounds(bounds, { padding: [50, 50] });
      hasInitialized.current = true;
    }
  }, [addresses, map]);

  return null;
}

export default function ServiceMap({ addresses, providers, clusteringOptions }: ServiceMapProps) {
  const mapRef = useRef(null);

  // Primary provider drives the popup links for Phase 1 (single-provider).
  // Phase 2 will loop over providers per address check.
  const primaryProvider = providers[0];

  const clusterConfig = {
    maxClusterRadius: clusteringOptions?.maxClusterRadius ?? 80,
    disableClusteringAtZoom: clusteringOptions?.disableClusteringAtZoom ?? 18,
    showCoverageOnHover: clusteringOptions?.showCoverageOnHover ?? false,
    spiderfyOnMaxZoom: clusteringOptions?.spiderfyOnMaxZoom ?? true,
    spiderfyDistanceMultiplier: 1,
    chunkedLoading: true,
  };

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
        if (type === 'serviceable') serviceable.push(addr);
        else if (type === 'preorder') preorder.push(addr);
        else noService.push(addr);
      }
    }

    return { serviceable, preorder, noService, unchecked };
  }, [addresses]);

  const defaultCenter: [number, number] = [41.5, -81.5];
  const defaultZoom = 10;

  /** Render the date-stamp rows at the bottom of every popup. */
  const renderCheckMeta = (check: AddressWithCheck['checks'][0]) => (
    <div className="popup-meta">
      {check.apiCreateDate && (
        <div className="popup-meta-item">
          Created {format(new Date(check.apiCreateDate), 'MM/dd/yyyy')} (
          {formatDistanceToNow(new Date(check.apiCreateDate), { addSuffix: true })})
        </div>
      )}
      {check.apiUpdateDate && (
        <div className="popup-meta-item">
          Updated {format(new Date(check.apiUpdateDate), 'MM/dd/yyyy')} (
          {formatDistanceToNow(new Date(check.apiUpdateDate), { addSuffix: true })})
        </div>
      )}
      <div className="popup-meta-item">
        Checked {format(new Date(check.checkedAt), 'MM/dd/yyyy')} (
        {formatDistanceToNow(new Date(check.checkedAt), { addSuffix: true })})
      </div>
    </div>
  );

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
        iconCreateFunction={(cluster: any) => {
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
              <div className="popup-content">
                <div className="popup-title">{addr.addressString}</div>
                <div className="popup-badge popup-badge-gray">Not checked yet</div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MarkerClusterGroup>

      {/* No service addresses cluster - red */}
      <MarkerClusterGroup
        {...clusterConfig}
        iconCreateFunction={(cluster: any) => {
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
              <div className="popup-content">
                <div className="popup-title">{addr.addressString}</div>
                {primaryProvider && (
                  <div className="popup-provider-label">{primaryProvider.name}</div>
                )}
                <div className="popup-badge popup-badge-red">No Service Available</div>
                {primaryProvider && (
                  <a
                    href={primaryProvider.futureServiceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="popup-link"
                  >
                    Request Future Service
                  </a>
                )}
                {addr.checks[0] && renderCheckMeta(addr.checks[0])}
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MarkerClusterGroup>

      {/* Preorder addresses cluster - yellow */}
      <MarkerClusterGroup
        {...clusterConfig}
        iconCreateFunction={(cluster: any) => {
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
              <div className="popup-content">
                <div className="popup-title">{addr.addressString}</div>
                {primaryProvider && (
                  <div className="popup-provider-label">{primaryProvider.name}</div>
                )}
                <div className="popup-badge popup-badge-yellow">Preorder / Planned Service</div>
                {primaryProvider?.referralUrl && (
                  <>
                    <a
                      href={primaryProvider.referralUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="popup-link"
                    >
                      Order Service
                    </a>
                    <div className="popup-referral-note">
                      Referral link - We both get $50 gift cards!
                    </div>
                  </>
                )}
                {addr.checks[0] && renderCheckMeta(addr.checks[0])}
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MarkerClusterGroup>

      {/* Serviceable addresses cluster - green */}
      <MarkerClusterGroup
        {...clusterConfig}
        iconCreateFunction={(cluster: any) => {
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
              <div className="popup-content">
                <div className="popup-title">{addr.addressString}</div>
                {primaryProvider && (
                  <div className="popup-provider-label">{primaryProvider.name}</div>
                )}
                <div className="popup-badge popup-badge-green">Serviceable</div>
                {primaryProvider?.referralUrl && (
                  <>
                    <a
                      href={primaryProvider.referralUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="popup-link"
                    >
                      Order Service
                    </a>
                    <div className="popup-referral-note">
                      Referral link - We both get $50 gift cards!
                    </div>
                  </>
                )}
                {addr.checks[0] && renderCheckMeta(addr.checks[0])}
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
