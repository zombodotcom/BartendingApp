// src/components/CardGrid.jsx
import { h } from "preact";

/**
 * Generic grid of cards for an object whose shape is:
 *   { keyName: value }
 *
 * Props:
 *  - data: Record<string, any>  (like { Whiskey: [...], Vodka: [...], ... })
 *  - renderItem: (key: string, value: any) => JSX.Element
 *  - columns?: string  (default "col-md-4 col-sm-6 mb-4")
 */
export function CardGrid({
  data,
  renderItem,
  columns = "col-md-4 col-sm-6 mb-4",
}) {
  return (
    <div class="row">
      {Object.entries(data).map(([key, value]) => (
        <div class={columns} key={key}>
          {renderItem(key, value)}
        </div>
      ))}
    </div>
  );
}
