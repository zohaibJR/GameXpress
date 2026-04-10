import { useEffect, useMemo, useState } from 'react';
import './App.css';
import FIFA25 from './assets/FIFA25.png';
import GTA5 from './assets/GTA5.png';
import RDR2 from './assets/RDR2.png';

const STORAGE_KEY = 'gamexpress-admin-games';

const starterGames = [
  {
    id: 1,
    title: 'EA Sports FC 25',
    platform: 'PS5',
    genre: 'Sports',
    price: 8999,
    stock: 14,
    status: 'Published',
    featured: true,
    description: 'Season launch edition with high-demand football content and premium cover art.',
    image: FIFA25,
    createdAt: '2026-04-10T09:00:00.000Z',
  },
  {
    id: 2,
    title: 'Grand Theft Auto V',
    platform: 'PC',
    genre: 'Action',
    price: 5499,
    stock: 21,
    status: 'Published',
    featured: false,
    description: 'Open-world bestseller with strong repeat demand and evergreen bundle appeal.',
    image: GTA5,
    createdAt: '2026-04-09T14:20:00.000Z',
  },
  {
    id: 3,
    title: 'Red Dead Redemption 2',
    platform: 'PS4',
    genre: 'Adventure',
    price: 6299,
    stock: 8,
    status: 'Draft',
    featured: true,
    description: 'Premium cinematic campaign title prepared for a featured weekend push.',
    image: RDR2,
    createdAt: '2026-04-08T11:45:00.000Z',
  },
];

const defaultForm = {
  title: '',
  platform: 'PC',
  genre: '',
  price: '',
  stock: '',
  status: 'Draft',
  featured: false,
  description: '',
  image: '',
};

function App() {
  const [games, setGames] = useState(starterGames);
  const [form, setForm] = useState(defaultForm);
  const [imageMode, setImageMode] = useState('upload');
  const [previewImage, setPreviewImage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [message, setMessage] = useState('Your changes are stored only in this browser.');

  useEffect(() => {
    const savedGames = window.localStorage.getItem(STORAGE_KEY);

    if (savedGames) {
      try {
        setGames(JSON.parse(savedGames));
      } catch (error) {
        console.error('Failed to parse saved games', error);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
  }, [games]);

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSearch =
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.platform.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'All' || game.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [games, searchTerm, statusFilter]);

  const stats = useMemo(() => {
    const publishedCount = games.filter((game) => game.status === 'Published').length;
    const featuredCount = games.filter((game) => game.featured).length;
    const inventoryValue = games.reduce(
      (total, game) => total + Number(game.price) * Number(game.stock),
      0
    );

    return [
      {
        label: 'Total titles',
        value: String(games.length).padStart(2, '0'),
        hint: 'Games currently in your admin catalog',
      },
      {
        label: 'Published',
        value: String(publishedCount).padStart(2, '0'),
        hint: 'Visible-ready entries in your storefront feed',
      },
      {
        label: 'Featured picks',
        value: String(featuredCount).padStart(2, '0'),
        hint: 'Priority titles highlighted for promo slots',
      },
      {
        label: 'Inventory value',
        value: `PKR ${inventoryValue.toLocaleString()}`,
        hint: 'Estimated stock value from price x units',
      },
    ];
  }, [games]);

  const recentUploads = useMemo(() => {
    return [...games]
      .sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt))
      .slice(0, 3);
  }, [games]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageResult = reader.result;
      setPreviewImage(imageResult);
      setForm((current) => ({
        ...current,
        image: imageResult,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const finalImage = imageMode === 'url' ? form.image.trim() : form.image;

    if (!form.title.trim() || !form.genre.trim() || !form.price || !form.stock || !finalImage) {
      setMessage('Add title, genre, price, stock, and an image before saving.');
      return;
    }

    const nextGame = {
      id: Date.now(),
      title: form.title.trim(),
      platform: form.platform,
      genre: form.genre.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
      status: form.status,
      featured: form.featured,
      description: form.description.trim(),
      image: finalImage,
      createdAt: new Date().toISOString(),
    };

    setGames((current) => [nextGame, ...current]);
    setForm(defaultForm);
    setPreviewImage('');
    setImageMode('upload');
    setMessage(`"${nextGame.title}" was added to your local admin list.`);
  };

  const handleDelete = (gameId) => {
    setGames((current) => current.filter((game) => game.id !== gameId));
    setMessage('Game removed from this browser session and local storage.');
  };

  const exportCatalog = () => {
    const data = JSON.stringify(games, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'gamexpress-catalog.json';
    link.click();
    URL.revokeObjectURL(url);
    setMessage('Catalog exported as JSON for backup or manual reuse.');
  };

  return (
    <main className="dashboard-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">GameXpress Admin Console</span>
          <h1>Upload games, track pricing, and manage a live-ready catalog without a backend.</h1>
          <p>
            This panel is built for deployment on static hosting. Everything stays in the browser,
            including uploaded images, stock data, pricing, and game notes.
          </p>
        </div>

        <div className="hero-actions">
          <button type="button" className="primary-btn" onClick={exportCatalog}>
            Export catalog
          </button>
          <div className="status-note">{message}</div>
        </div>
      </section>

      <section className="stats-grid">
        {stats.map((item) => (
          <article className="stat-card" key={item.label}>
            <span className="stat-label">{item.label}</span>
            <strong className="stat-value">{item.value}</strong>
            <p>{item.hint}</p>
          </article>
        ))}
      </section>

      <section className="workspace-grid">
        <article className="panel form-panel">
          <div className="panel-heading">
            <div>
              <span className="section-tag">New Upload</span>
              <h2>Add game data</h2>
            </div>
            <span className="panel-badge">Static deployment friendly</span>
          </div>

          <form className="game-form" onSubmit={handleSubmit}>
            <div className="field-grid">
              <label>
                Title
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Marvel's Spider-Man 2"
                />
              </label>

              <label>
                Platform
                <select name="platform" value={form.platform} onChange={handleChange}>
                  <option>PC</option>
                  <option>PS4</option>
                  <option>PS5</option>
                  <option>Xbox</option>
                  <option>Nintendo Switch</option>
                </select>
              </label>

              <label>
                Genre
                <input
                  name="genre"
                  value={form.genre}
                  onChange={handleChange}
                  placeholder="Action RPG"
                />
              </label>

              <label>
                Status
                <select name="status" value={form.status} onChange={handleChange}>
                  <option>Draft</option>
                  <option>Published</option>
                  <option>Archived</option>
                </select>
              </label>

              <label>
                Price (PKR)
                <input
                  name="price"
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="6999"
                />
              </label>

              <label>
                Stock
                <input
                  name="stock"
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="12"
                />
              </label>
            </div>

            <label className="textarea-field">
              Description
              <textarea
                name="description"
                rows="4"
                value={form.description}
                onChange={handleChange}
                placeholder="Short admin note about condition, edition, demand, or bundle details."
              />
            </label>

            <div className="image-mode-switch">
              <button
                type="button"
                className={imageMode === 'upload' ? 'switch-btn active' : 'switch-btn'}
                onClick={() => {
                  setImageMode('upload');
                  setForm((current) => ({ ...current, image: previewImage }));
                }}
              >
                Upload image
              </button>
              <button
                type="button"
                className={imageMode === 'url' ? 'switch-btn active' : 'switch-btn'}
                onClick={() => {
                  setImageMode('url');
                  setPreviewImage('');
                  setForm((current) => ({ ...current, image: '' }));
                }}
              >
                Use image URL
              </button>
            </div>

            {imageMode === 'upload' ? (
              <label className="upload-field upload-box">
                Cover image
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <span>Choose JPG, PNG, or WebP artwork from your device</span>
              </label>
            ) : (
              <label className="upload-field">
                Image URL
                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://example.com/cover.jpg"
                />
              </label>
            )}

            <label className="checkbox-row">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
              />
              Mark as featured title
            </label>

            <div className="form-footer">
              <button type="submit" className="primary-btn">
                Save game
              </button>
              <span className="form-hint">No backend needed. Data persists in this browser only.</span>
            </div>
          </form>
        </article>

        <aside className="panel preview-panel">
          <div className="panel-heading">
            <div>
              <span className="section-tag">Live Preview</span>
              <h2>Card appearance</h2>
            </div>
          </div>

          <div className="preview-card">
            <div className="preview-media">
              {form.image || previewImage ? (
                <img src={form.image || previewImage} alt={form.title || 'Game preview'} />
              ) : (
                <div className="preview-placeholder">Artwork preview</div>
              )}
            </div>

            <div className="preview-content">
              <div className="preview-topline">
                <span>{form.platform}</span>
                <span>{form.status}</span>
              </div>
              <h3>{form.title || 'Your next game title'}</h3>
              <p>{form.description || 'Your game description will appear here once you start typing.'}</p>
              <div className="preview-meta">
                <strong>PKR {Number(form.price || 0).toLocaleString()}</strong>
                <span>{form.stock || 0} units</span>
              </div>
            </div>
          </div>

          <div className="recent-list">
            <div className="mini-heading">
              <h3>Recent uploads</h3>
              <span>{recentUploads.length} tracked</span>
            </div>
            {recentUploads.map((game) => (
              <div className="recent-item" key={game.id}>
                <img src={game.image} alt={game.title} />
                <div>
                  <strong>{game.title}</strong>
                  <span>
                    {game.platform} • PKR {Number(game.price).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="panel catalog-panel">
        <div className="catalog-toolbar">
          <div>
            <span className="section-tag">Catalog Overview</span>
            <h2>Manage uploaded games</h2>
          </div>

          <div className="toolbar-controls">
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search title, genre, or platform"
            />
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option>All</option>
              <option>Published</option>
              <option>Draft</option>
              <option>Archived</option>
            </select>
          </div>
        </div>

        <div className="catalog-grid">
          {filteredGames.map((game) => (
            <article className="catalog-card" key={game.id}>
              <img src={game.image} alt={game.title} />
              <div className="catalog-content">
                <div className="catalog-header">
                  <div>
                    <h3>{game.title}</h3>
                    <p>
                      {game.platform} • {game.genre}
                    </p>
                  </div>
                  <span className={`status-pill status-${game.status.toLowerCase()}`}>
                    {game.status}
                  </span>
                </div>

                <p className="catalog-description">{game.description}</p>

                <div className="catalog-meta">
                  <span>PKR {Number(game.price).toLocaleString()}</span>
                  <span>{game.stock} in stock</span>
                  <span>{game.featured ? 'Featured' : 'Standard'}</span>
                </div>

                <button
                  type="button"
                  className="ghost-btn"
                  onClick={() => handleDelete(game.id)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
