/**
 * Franchise Portal Service
 * Manages shop locations (Sucursales) and routing logic.
 */

export interface Sucursal {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

const sucursales: Sucursal[] = [
  { id: "suc-001", name: "BioNatural Polanco", address: "Av. Horacio 123", lat: 19.4336, lng: -99.1919 },
  { id: "suc-002", name: "BioNatural Condesa", address: "Calle Amsterdam 45", lat: 19.4124, lng: -99.1696 },
  { id: "suc-003", name: "BioNatural Santa Fe", address: "Vasco de Quiroga 3800", lat: 19.3629, lng: -99.2687 },
];

export const franchiseService = {
  getSucursales: () => sucursales,

  /**
   * Finds the nearest Sucursal using the Haversine formula.
   */
  findNearestSucursal(customerLat: number, customerLng: number): Sucursal {
    let nearest = sucursales[0];
    let minDistance = Infinity;

    sucursales.forEach((sucursal) => {
      const distance = this.calculateDistance(customerLat, customerLng, sucursal.lat, sucursal.lng);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = sucursal;
      }
    });

    return nearest;
  },

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  },

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
};
