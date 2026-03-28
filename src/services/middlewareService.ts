/**
 * API Middleware Service
 * Architects the connection between Odoo, Rappi, Mercado Libre and the Franchise Portal.
 */
import { franchiseService } from "./franchiseService.ts";

export const middlewareService = {
  /**
   * Automatically routes orders from external platforms to the nearest Sucursal.
   */
  async processAndRouteOrder(orderData: any) {
    const { platform, customerLocation, items } = orderData;
    
    console.log(`[Middleware] Processing order from ${platform}`);

    // 1. Identify nearest Sucursal from Franchise Portal
    const nearestSucursal = franchiseService.findNearestSucursal(
      customerLocation.lat,
      customerLocation.lng
    );

    console.log(`[Middleware] Routing order to: ${nearestSucursal.name}`);

    // 2. Prepare payload for Odoo/Sucursal ERP
    const routedOrder = {
      orderId: `BN-${Date.now()}`,
      platform,
      assignedSucursal: nearestSucursal,
      items,
      status: "ROUTED_TO_SHOP",
      timestamp: new Date().toISOString()
    };

    // 3. In a real scenario, push to Odoo API
    // await this.pushToOdoo(routedOrder);

    return routedOrder;
  },

  async pushToOdoo(order: any) {
    // Implementation for Odoo XML-RPC or JSON-RPC
    console.log("[Middleware] Pushing to Odoo...");
  }
};
