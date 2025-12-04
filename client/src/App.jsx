import { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState(null);

  const API_URL = 'http://localhost:8000';

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_URL}/read`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateItem();
    } else {
      await createItem();
    }
    setName('');
    setDescription('');
    setEditId(null);
    fetchItems();
  };

  const createItem = async () => {
    try {
      await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  const updateItem = async () => {
    try {
      await fetch(`${API_URL}/update/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await fetch(`${API_URL}/delete/${id}`, { method: 'DELETE' });
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setName(item.name);
    setDescription(item.description);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans text-slate-900">
      {/* Header Section */}
      <header className="pt-12 pb-8 text-center">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-8 tracking-tight">
          Microservices CRUD App
        </h1>

        <div className="flex items-center justify-center gap-12 mb-12">
          {/* Docker Logo */}
          <div className="flex flex-col items-center gap-2">
            <img
              src="https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png"
              alt="Docker Logo"
              className="h-12 w-auto"
            />
            <span className="text-2xl font-bold text-[#2496ED] tracking-tighter">Docker</span>
          </div>


          {/* Nginx Logo */}
          <div className="flex flex-col items-center gap-2">
            <svg className="h-12 w-auto text-[#009639]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L1.604 6v12L12 24l10.396-6V6L12 0zm0 2.28l8.41 4.854v9.732L12 21.72 3.59 16.866V7.134L12 2.28zm-1.083 4.32L7.25 8.526l5.833 3.366v3.714L7.25 12.24v3.366l5.833 3.366 3.667-2.116-5.834-3.367v-3.714l5.834-3.366V3.234l-5.833 3.366z" />
            </svg>
            <span className="text-2xl font-bold text-[#009639] tracking-tighter">NGINX</span>
          </div>

          {/* Microservices Icon */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-16 h-16">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-indigo-500 w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-slate-500 whitespace-nowrap">Microservices</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">

          {/* Item Management Header */}
          <div className="p-8 border-b border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Item Management</h2>

            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <button
                onClick={() => {
                  setEditId(null);
                  setName('');
                  setDescription('');
                  // Ideally this would open a modal, but for now we'll just focus the form if we had one visible. 
                  // Since the design implies a separate create flow or modal, let's toggle a simple inline form for now.
                  // For this step, I'll just keep the state ready.
                  // Let's add a simple conditional render for the form below this header if needed, 
                  // or maybe the user wants a modal. The image shows a "Create New Item" button.
                  // I will implement a simple inline form toggle for "Create New Item" to keep it functional.
                  const form = document.getElementById('item-form');
                  if (form) form.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#1e40af] hover:bg-[#1e3a8a] text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2 w-fit"
              >
                Create New Item
              </button>

              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Inline Form for Create/Edit - Hidden by default unless active? 
                For now, let's keep it visible but styled nicely as a "drawer" or just below.
                Actually, to match the image exactly, the form isn't visible. 
                But I need to keep the app functional. 
                I'll put the form in a collapsible section or just below the button.
            */}
            <div id="item-form" className="mt-6 bg-slate-50 p-6 rounded-lg border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                {editId ? 'Edit Item' : 'New Item Details'}
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="flex-1 w-full">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex-[2] w-full">
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                  >
                    {editId ? 'Update' : 'Save'}
                  </button>
                  {editId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditId(null);
                        setName('');
                        setDescription('');
                      }}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-md font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#e0f2fe] border-b border-blue-100">
                  <th className="py-4 px-6 font-semibold text-slate-700 w-20">ID</th>
                  <th className="py-4 px-6 font-semibold text-slate-700 w-1/4">Name</th>
                  <th className="py-4 px-6 font-semibold text-slate-700">Description</th>
                  <th className="py-4 px-6 font-semibold text-slate-700 w-32 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-slate-500">
                      No items found. Create one to get started.
                    </td>
                  </tr>
                ) : (
                  items.map((item, index) => (
                    <tr key={item._id} className={index % 2 === 0 ? 'bg-[#f0f9ff]' : 'bg-white'}>
                      <td className="py-4 px-6 text-slate-600">{index + 1}</td>
                      <td className="py-4 px-6 font-medium text-slate-800">{item.name}</td>
                      <td className="py-4 px-6 text-slate-600">{item.description}</td>
                      <td className="py-4 px-6">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 bg-[#0ea5e9] hover:bg-[#0284c7] text-white rounded shadow-sm transition-colors"
                            title="Edit"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => deleteItem(item._id)}
                            className="p-2 bg-[#ef4444] hover:bg-[#dc2626] text-white rounded shadow-sm transition-colors"
                            title="Delete"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination / Footer (Decorative for now) */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center">
            <span className="text-sm text-slate-500">Showing {items.length} entries</span>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-slate-300 rounded bg-white text-slate-600 text-sm disabled:opacity-50" disabled>Prev</button>
              <button className="px-3 py-1 border border-slate-300 rounded bg-white text-slate-600 text-sm disabled:opacity-50" disabled>Next</button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;

