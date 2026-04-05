"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { initialInventory, InventoryItem } from "@/data/inventory";

const STORAGE_KEY = "bath-theory-inventory";

function loadInventory(): InventoryItem[] {
  if (typeof window === "undefined") return initialInventory;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return initialInventory;
    }
  }
  return initialInventory;
}

function saveInventory(inventory: InventoryItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inventory));
}

function getStatus(item: InventoryItem): InventoryItem["status"] {
  if (item.stockLevel === 0) return "out_of_stock";
  if (item.stockLevel <= item.reorderThreshold) return "low_stock";
  return "in_stock";
}

export default function AdminDashboard() {
  const [inventory, setInventory] = useState<InventoryItem[]>(loadInventory);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStock, setEditStock] = useState("");
  const [activeTab, setActiveTab] = useState<"inventory" | "orders">("inventory");

  useEffect(() => {
    saveInventory(inventory);
  }, [inventory]);

  const updateStock = (productId: string, newStock: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? {
              ...item,
              stockLevel: Math.max(0, newStock),
              status: getStatus({ ...item, stockLevel: Math.max(0, newStock) }),
              lastRestocked: newStock > item.stockLevel ? new Date().toISOString().split("T")[0] : item.lastRestocked,
            }
          : item
      )
    );
    setEditingId(null);
    setEditStock("");
  };

  const totalItems = inventory.reduce((sum, item) => sum + item.stockLevel, 0);
  const lowStockItems = inventory.filter((item) => item.status === "low_stock" || item.status === "out_of_stock");
  const totalValue = inventory.reduce((sum, item) => sum + item.stockLevel * item.costPerUnit, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-2xl font-bold text-gray-900">Bath Theory Admin</h1>
            <Link
              href="/"
              className="text-sm text-primary hover:underline"
            >
              ← Back to Website
            </Link>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("inventory")}
            className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "inventory"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Inventory
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "orders"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Orders
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {activeTab === "inventory" && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-sm text-gray-500">Total Stock</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{totalItems}</p>
                <p className="text-xs text-gray-400 mt-1">units across all SKUs</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-sm text-gray-500">Inventory Value</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">₹{totalValue.toLocaleString()}</p>
                <p className="text-xs text-gray-400 mt-1">at cost price</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-sm text-gray-500">Alerts</p>
                <p className={`text-3xl font-bold mt-1 ${lowStockItems.length > 0 ? "text-red-600" : "text-green-600"}`}>
                  {lowStockItems.length}
                </p>
                <p className="text-xs text-gray-400 mt-1">items need attention</p>
              </div>
            </div>

            {/* Low Stock Alerts */}
            {lowStockItems.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <h3 className="font-medium text-amber-800">Stock Alerts</h3>
                </div>
                <ul className="space-y-1">
                  {lowStockItems.map((item) => (
                    <li key={item.productId} className="text-sm text-amber-700">
                      <span className="font-medium">{item.productName}</span> — {item.stockLevel === 0 ? "Out of stock" : `Only ${item.stockLevel} left`}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Inventory Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Last Restocked</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {inventory.map((item) => (
                      <tr key={item.productId} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.productName}</td>
                        <td className="px-4 py-3 text-sm text-gray-500 font-mono">{item.sku}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {editingId === item.productId ? (
                            <input
                              type="number"
                              min="0"
                              value={editStock}
                              onChange={(e) => setEditStock(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") updateStock(item.productId, parseInt(editStock) || 0);
                                if (e.key === "Escape") {
                                  setEditingId(null);
                                  setEditStock("");
                                }
                              }}
                              className="w-20 px-2 py-1 border border-primary rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                              autoFocus
                            />
                          ) : (
                            item.stockLevel
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">₹{item.costPerUnit}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              item.status === "in_stock"
                                ? "bg-green-100 text-green-800"
                                : item.status === "low_stock"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {item.status === "in_stock" ? "In Stock" : item.status === "low_stock" ? "Low Stock" : "Out of Stock"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">{item.lastRestocked}</td>
                        <td className="px-4 py-3">
                          {editingId === item.productId ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() => updateStock(item.productId, parseInt(editStock) || 0)}
                                className="text-xs text-green-600 hover:underline"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => {
                                  setEditingId(null);
                                  setEditStock("");
                                }}
                                className="text-xs text-gray-500 hover:underline"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingId(item.productId);
                                setEditStock(item.stockLevel.toString());
                              }}
                              className="text-xs text-primary hover:underline"
                            >
                              Update
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === "orders" && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Order Management</h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Orders are currently managed through WhatsApp. A full order dashboard will be available in Phase 2 with database integration.
            </p>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 bg-whatsapp text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-whatsapp/90 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Open WhatsApp for Orders
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
