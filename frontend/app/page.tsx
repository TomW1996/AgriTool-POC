"use client";

import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Search } from "lucide-react";

export default function SearchEngine() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Search failed", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">AgriTool Search Engine</h1>
      <div className="flex w-full gap-2">
        <Input
          type="text"
          placeholder="Ask us a question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : <Search size={20} />}
        </Button>
      </div>
      {results.length > 0 && (
        <div className="w-full space-y-4">
          {results.map((result, index) => (
            <Card key={index} className="p-4 border border-gray-300">
              <CardContent>
                <h2 className="text-xl font-semibold">{result.title}</h2>
                <p className="text-gray-600">{result.description}</p>
                <a
                  href={result.link}
                  className="text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
