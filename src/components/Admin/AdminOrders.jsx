import React from "react";

export default function AdminOrders({ ordersList, handleUpdateOrderStatus }) {
  return (
    <div className="space-y-6">
      <div className="bg-[#0a1128] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111c44] text-gray-400 font-bold uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-4 py-4">Ordered Items</th>
                <th className="px-4 py-4">Total Amount</th>
                <th className="px-4 py-4">Payment</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-6 py-4 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {ordersList.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                    No orders recorded yet. As members place orders through the Cart, they will appear here live.
                  </td>
                </tr>
              ) : (
                ordersList.map((ord) => (
                  <tr key={ord._id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-white text-sm">{ord.customerName}</p>
                      <p className="text-[10px] text-gray-400">{ord.customerEmail}</p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        {ord.items?.map((it, i) => (
                          <p key={i} className="text-gray-300">
                            {it.name} <span className="text-amber-400 font-bold">x{it.quantity}</span>
                          </p>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4 font-black text-white text-sm">
                      ₹{ord.totalAmount?.toLocaleString()}
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300">
                        {ord.paymentMethod} • {ord.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                        ord.orderStatus === 'Delivered'
                          ? "bg-emerald-500/20 text-emerald-400"
                          : ord.orderStatus === 'Shipped'
                          ? "bg-blue-500/20 text-blue-300"
                          : "bg-amber-500/20 text-amber-400"
                      }`}>
                        {ord.orderStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => handleUpdateOrderStatus(ord._id, e.target.value)}
                        className="px-2.5 py-1.5 bg-[#111c44] text-white text-xs rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
