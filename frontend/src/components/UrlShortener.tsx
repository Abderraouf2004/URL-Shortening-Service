import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";

import {
  createShortUrl,
  getAllShortUrls,
  updateShortUrl,
  deleteShortUrl,
  getStatistics,
} from "../services/api";

import type {
  UrlData,
  Statistics,
} from "../services/api";

export default function UrlShortener() {
  /* =========================
     STATES
  ========================= */

  const [url, setUrl] = useState("");

  const [shortUrls, setShortUrls] = useState<UrlData[]>([]);

  const [selectedUrl, setSelectedUrl] =
    useState<UrlData | null>(null);

  const [statistics, setStatistics] =
    useState<Statistics | null>(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [loadingList, setLoadingList] =
    useState(true);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [copied, setCopied] = useState(false);

  const [editing, setEditing] = useState(false);

  const [editUrl, setEditUrl] = useState("");

  /* =========================
     LOAD ALL URLS
  ========================= */

  const loadShortUrls = async () => {
    try {
      setLoadingList(true);
      setError("");

      const result = await getAllShortUrls();

      setShortUrls(result);

      // Keep selected URL synchronized
      if (selectedUrl) {
        const updatedSelected = result.find(
          (item) => item.id === selectedUrl.id
        );

        setSelectedUrl(updatedSelected ?? null);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load short URLs."
      );
    } finally {
      setLoadingList(false);
    }
  };

  /* =========================
     LOAD ON PAGE START
  ========================= */

  useEffect(() => {
    loadShortUrls();
  }, []);

  /* =========================
     FILTER URLS
  ========================= */

  const filteredUrls = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return shortUrls;
    }

    return shortUrls.filter((item) =>
      item.shortCode.toLowerCase().includes(value) ||
      item.url.toLowerCase().includes(value)
    );
  }, [shortUrls, search]);

  /* =========================
     SHORT LINK
  ========================= */

  const getShortLink = (shortCode: string) => {
    return `${import.meta.env.VITE_API_URL}/shorten/${shortCode}`;
  };

  /* =========================
     CREATE
  ========================= */

  const handleCreate = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setStatistics(null);

    if (!url.trim()) {
      setError("Please enter a URL.");
      return;
    }

    try {
      setLoading(true);

      const result = await createShortUrl(url.trim());

      setUrl("");

      setSuccess(
        "Short URL created successfully!"
      );

      // Refresh all URLs
      await loadShortUrls();

      // Select newly created URL
      setSelectedUrl(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     SELECT URL
  ========================= */

  const handleSelectUrl = (item: UrlData) => {
    setSelectedUrl(item);

    setStatistics(null);
    setEditing(false);
    setEditUrl("");

    setError("");
    setSuccess("");
  };

  /* =========================
     COPY
  ========================= */

  const handleCopy = async () => {
    if (!selectedUrl) return;

    const shortLink = getShortLink(
      selectedUrl.shortCode
    );

    try {
      await navigator.clipboard.writeText(
        shortLink
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setError(
        "Failed to copy the short URL."
      );
    }
  };

  /* =========================
     START EDIT
  ========================= */

  const handleStartEdit = () => {
    if (!selectedUrl) return;

    setEditing(true);
    setEditUrl(selectedUrl.url);

    setError("");
    setSuccess("");
  };

  /* =========================
     UPDATE
  ========================= */

  const handleUpdate = async () => {
    if (!selectedUrl) return;

    if (!editUrl.trim()) {
      setError("URL cannot be empty.");
      return;
    }

    try {
      setLoading(true);

      setError("");
      setSuccess("");

      const result = await updateShortUrl(
        selectedUrl.shortCode,
        editUrl.trim()
      );

      setSelectedUrl(result);

      setEditing(false);
      setEditUrl("");

      setSuccess(
        "URL updated successfully!"
      );

      // Refresh list
      await loadShortUrls();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update URL."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     CANCEL EDIT
  ========================= */

  const handleCancelEdit = () => {
    setEditing(false);
    setEditUrl("");
    setError("");
  };

  /* =========================
     DELETE
  ========================= */

  const handleDelete = async () => {
    if (!selectedUrl) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${selectedUrl.shortCode}"?`
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      setError("");
      setSuccess("");

      await deleteShortUrl(
        selectedUrl.shortCode
      );

      setSelectedUrl(null);
      setStatistics(null);

      setSuccess(
        "URL deleted successfully!"
      );

      // Refresh list
      await loadShortUrls();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete URL."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     STATISTICS
  ========================= */

  const handleStatistics = async () => {
    if (!selectedUrl) return;

    try {
      setLoading(true);

      setError("");
      setSuccess("");
      setStatistics(null);

      const result = await getStatistics(
        selectedUrl.shortCode
      );

      setStatistics(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to retrieve statistics."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     REFRESH
  ========================= */

  const handleRefresh = async () => {
    setError("");
    setSuccess("");

    await loadShortUrls();
  };

  /* =========================
     UI
  ========================= */

  return (
    <div className="min-h-screen w-full bg-slate-50">

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* =========================
            HEADER
        ========================= */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-sm font-medium text-slate-500">
              URL Shortener
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage all your short URLs from one place.
            </p>
          </div>

          <button
            onClick={handleRefresh}
            disabled={loadingList}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingList ? "Refreshing..." : "Refresh"}
          </button>

        </div>

        {/* =========================
            CREATE
        ========================= */}

        <section className="mb-8">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-950">
                Create Short URL
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Turn any long URL into a short link.
              </p>
            </div>

            <form onSubmit={handleCreate}>

              <div className="flex flex-col gap-3 sm:flex-row">

                <input
                  type="url"
                  value={url}
                  onChange={(e) =>
                    setUrl(e.target.value)
                  }
                  placeholder="https://example.com/your-long-url"
                  className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-900/10"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-slate-950 px-7 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Creating..."
                    : "Shorten URL"}
                </button>

              </div>

            </form>

          </div>

        </section>

        {/* =========================
            MESSAGES
        ========================= */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* =========================
            MAIN GRID
        ========================= */}

        <div className="grid gap-6 lg:grid-cols-5">

          {/* =========================
              URL LIST
          ========================= */}

          <section className="lg:col-span-3">

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

              {/* LIST HEADER */}

              <div className="border-b border-slate-100 p-5">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <h2 className="font-semibold text-slate-950">
                      Your Short URLs
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {shortUrls.length}{" "}
                      {shortUrls.length === 1
                        ? "URL"
                        : "URLs"}{" "}
                      created
                    </p>
                  </div>

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:bg-white sm:w-52"
                  />

                </div>

              </div>

              {/* LIST */}

              <div className="p-3">

                {loadingList ? (
                  <div className="flex min-h-60 items-center justify-center text-sm text-slate-500">
                    Loading your short URLs...
                  </div>
                ) : filteredUrls.length === 0 ? (
                  <div className="flex min-h-60 flex-col items-center justify-center px-6 text-center">

                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-xl">
                      🔗
                    </div>

                    <h3 className="font-semibold text-slate-900">
                      No short URLs found
                    </h3>

                    <p className="mt-1 max-w-sm text-sm text-slate-500">
                      Create your first short URL using
                      the form above.
                    </p>

                  </div>
                ) : (
                  <div className="space-y-2">

                    {filteredUrls.map((item) => {

                      const isSelected =
                        selectedUrl?.id === item.id;

                      return (
                        <button
                          key={item.id}
                          onClick={() =>
                            handleSelectUrl(item)
                          }
                          className={`w-full rounded-xl border p-4 text-left transition ${
                            isSelected
                              ? "border-slate-900 bg-slate-50"
                              : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                          }`}
                        >

                          <div className="flex items-start justify-between gap-4">

                            <div className="min-w-0">

                              <div className="flex items-center gap-2">

                                <span className="font-semibold text-slate-950">
                                  {item.shortCode}
                                </span>

                                {isSelected && (
                                  <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-medium text-white">
                                    Selected
                                  </span>
                                )}

                              </div>

                             

                            </div>

                            <span className="shrink-0 text-xs text-slate-400">
                              {new Date(
                                item.createdAt
                              ).toLocaleDateString()}
                            </span>

                          </div>

                        </button>
                      );
                    })}

                  </div>
                )}

              </div>

            </div>

          </section>

          {/* =========================
              DETAILS
          ========================= */}

          <section className="lg:col-span-2">

            <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

              {!selectedUrl ? (
                <div className="flex min-h-[450px] flex-col items-center justify-center p-8 text-center">

                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                    👆
                  </div>

                  <h2 className="font-semibold text-slate-950">
                    Select a short URL
                  </h2>

                  <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                    Click one of the URLs from the list
                    to see its details and available
                    actions.
                  </p>

                </div>
              ) : (
                <div className="p-6">

                  {/* DETAILS HEADER */}

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                        Short code
                      </p>

                      <h2 className="mt-1 text-2xl font-bold text-slate-950">
                        {selectedUrl.shortCode}
                      </h2>

                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                      🔗
                    </div>

                  </div>

            

                  {/* ORIGINAL URL */}

                  <div className="mt-6">

                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                      Original URL
                    </p>

                    <a
                      href={selectedUrl.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block break-all text-sm leading-6 text-slate-700 hover:text-slate-950 hover:underline"
                    >
                      {selectedUrl.url}
                    </a>

                  </div>

                  {/* DATES */}

                  <div className="mt-6 grid grid-cols-2 gap-3">

                    <div className="rounded-xl bg-slate-50 p-3">

                      <p className="text-xs text-slate-400">
                        Created
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {new Date(
                          selectedUrl.createdAt
                        ).toLocaleDateString()}
                      </p>

                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">

                      <p className="text-xs text-slate-400">
                        Updated
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {new Date(
                          selectedUrl.updatedAt
                        ).toLocaleDateString()}
                      </p>

                    </div>

                  </div>

                  {/* ACTIONS */}

                  <div className="mt-6 border-t border-slate-100 pt-5">

                    <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-400">
                      Actions
                    </p>

                    <div className="grid grid-cols-3 gap-2">

                      <button
                        onClick={handleStartEdit}
                        disabled={loading}
                        className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                      >
                        Edit
                      </button>

                      <button
                        onClick={handleStatistics}
                        disabled={loading}
                        className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                      >
                        Stats
                      </button>

                      <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="rounded-xl border border-red-200 px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                  {/* =========================
                      EDIT
                  ========================= */}

                  {editing && (
                    <div className="mt-5 rounded-2xl bg-slate-50 p-4">

                      <h3 className="font-semibold text-slate-900">
                        Update URL
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        The short code will stay the
                        same.
                      </p>

                      <input
                        type="url"
                        value={editUrl}
                        onChange={(e) =>
                          setEditUrl(e.target.value)
                        }
                        className="mt-4 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-900/10"
                      />

                      <div className="mt-3 flex gap-2">

                        <button
                          onClick={handleUpdate}
                          disabled={loading}
                          className="flex-1 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
                        >
                          {loading
                            ? "Saving..."
                            : "Save changes"}
                        </button>

                        <button
                          onClick={handleCancelEdit}
                          disabled={loading}
                          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
                        >
                          Cancel
                        </button>

                      </div>

                    </div>
                  )}

                  {/* =========================
                      STATISTICS
                  ========================= */}

                  {statistics && (
                    <div className="mt-5 rounded-2xl bg-slate-950 p-5 text-white">

                      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                        Statistics
                      </p>

                      <div className="mt-3 flex items-end justify-between">

                        <div>

                          <p className="text-4xl font-bold">
                            {statistics.accessCount}
                          </p>

                          <p className="mt-1 text-sm text-slate-400">
                            Total accesses
                          </p>

                        </div>

                        <div className="text-3xl">
                          📊
                        </div>

                      </div>

                    </div>
                  )}

                </div>
              )}

            </div>

          </section>

        </div>

      </div>

    </div>
  );
}