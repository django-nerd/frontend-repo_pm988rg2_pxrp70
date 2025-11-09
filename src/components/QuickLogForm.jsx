import { useState, useRef } from 'react';
import { Camera, Upload } from 'lucide-react';

const PRIMARY_HEX = '#A8D5BA';

function compressImage(file, quality = 0.7, maxWidth = 1200) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error('Compression failed'));
          resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' }));
        },
        'image/jpeg',
        quality
      );
      URL.revokeObjectURL(url);
    };
    img.onerror = reject;
    img.src = url;
  });
}

export default function QuickLogForm({ onPreview }) {
  const [category, setCategory] = useState('transport');
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState('Biked to work');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return alert('Please select an image');
    if (file.size > 8 * 1024 * 1024) return alert('Image is too large (8MB max)');
    setUploading(true);
    try {
      const compressed = await compressImage(file, 0.72, 1400);
      setImage(compressed);
      setImageUrl(URL.createObjectURL(compressed));
    } catch (err) {
      console.error(err);
      alert('Failed to process image');
    } finally {
      setUploading(false);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    onPreview?.({ category, quantity: Number(quantity) || 0, date, description });
    // In a real app we'd POST to backend here.
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          >
            <option value="transport">Transport</option>
            <option value="energy">Energy</option>
            <option value="waste">Waste</option>
            <option value="food">Food</option>
            <option value="water">Water</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-1">Quantity</label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          />
        </div>
        <div>
          <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-1">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What did you do?"
          className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-300"
        />
      </div>

      <div className="border border-dashed rounded-xl p-4 flex flex-col sm:flex-row items-center gap-3 border-emerald-300/70 dark:border-emerald-400/30 bg-emerald-50/50 dark:bg-emerald-400/10">
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
          <Camera size={20} />
          <p className="text-sm font-medium">Proof image (optional)</p>
        </div>
        <div className="flex-1" />
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 text-sm shadow"
        >
          <Upload size={16} />
          Upload
        </button>
      </div>

      {imageUrl && (
        <div className="relative">
          <img src={imageUrl} alt="Preview" className="rounded-lg border border-neutral-200 dark:border-neutral-800 w-full object-cover max-h-64" />
          {uploading && (
            <div className="absolute inset-0 grid place-items-center bg-white/60 dark:bg-black/40 rounded-lg">
              <span className="animate-pulse text-neutral-700 dark:text-neutral-200">Processing…</span>
            </div>
          )}
        </div>
      )}

      <button
        type="submit"
        className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 shadow"
        style={{ boxShadow: `0 10px 30px -12px ${PRIMARY_HEX}66` }}
      >
        Log action & preview impact
      </button>
    </form>
  );
}
