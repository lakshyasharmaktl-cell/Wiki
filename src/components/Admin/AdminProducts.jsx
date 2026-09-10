import React from "react";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";

export default function AdminProducts({
  products,
  productSearch,
  setProductSearch,
  productCategoryFilter,
  setProductCategoryFilter,
  handleOpenAddProduct,
  handleOpenEditProduct,
  handleDeleteProduct
}) {
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name?.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.subCategory?.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCat = productCategoryFilter === "all" || p.category === productCategoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-[#0a1128] p-4 rounded-2xl border border-white/10">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search spirits by name or type..."
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#111c44] rounded-xl text-xs text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={productCategoryFilter}
            onChange={(e) => setProductCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-[#111c44] rounded-xl text-xs text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All Categories</option>
            <option value="whisky">Whiskies</option>
            <option value="mocktails">Mocktails</option>
            <option value="beers">Beers</option>
            <option value="spirits">Spirits</option>
          </select>

          <button
            onClick={handleOpenAddProduct}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      </div>

      <div className="bg-[#0a1128] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111c44] text-gray-400 font-bold uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="px-6 py-4">Product Details</th>
                <th className="px-4 py-4">Category</th>
                <th className="px-4 py-4">Price / MSRP</th>
                <th className="px-4 py-4">Stock</th>
                <th className="px-4 py-4">Rating</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map((prod) => (
                <tr key={prod._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-12 h-12 rounded-xl object-contain bg-white/5 p-1 border border-white/10"
                      />
                      <div>
                        <p className="font-bold text-white text-sm">{prod.name}</p>
                        <p className="text-[10px] text-gray-400">{prod.origin} • {prod.abv}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      {prod.category}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-extrabold text-white text-sm">₹{prod.price?.toLocaleString()}</p>
                    {prod.originalPrice && (
                      <p className="text-[10px] text-gray-500 line-through">₹{prod.originalPrice?.toLocaleString()}</p>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`font-bold ${prod.stock < 10 ? "text-red-400" : "text-emerald-400"}`}>
                      {prod.stock || 50} units
                    </span>
                  </td>
                  <td className="px-4 py-4 text-amber-400 font-bold">
                    ★ {prod.rating || 4.8}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEditProduct(prod)}
                      className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-xl transition-all"
                      title="Edit Product"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(prod._id)}
                      className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-all"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
